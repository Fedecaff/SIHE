"""Geocodificación inversa de hidrantes masivos (Photon) → SQL UPDATE."""

from __future__ import annotations

import json
import re
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC_SQL = ROOT / "supabase" / "03_datos_demo.sql"
OUT_SQL = ROOT / "supabase" / "06_direcciones_hidrantes.sql"
CACHE = Path(__file__).with_name("hidrantes_direcciones.json")

BLOCK = re.compile(
    r"\(\s*'hidrante'::public\.resource_type,\s*"
    r"'(Hidrante \d+)',\s*"
    r"'(Hidrante \d+ - Catamarca)',\s*"
    r"ST_SetSRID\(ST_MakePoint\(([-\d.]+),\s*([-\d.]+)\), 4326\)::geography",
    re.MULTILINE,
)


def parse_hidrantes() -> list[dict]:
    text = SRC_SQL.read_text(encoding="utf-8")
    rows = []
    for name, _addr, lng, lat in BLOCK.findall(text):
        rows.append(
            {
                "name": name,
                "lng": float(lng),
                "lat": float(lat),
            }
        )
    return rows


def address_from_feature(props: dict) -> str | None:
    street = props.get("street") or props.get("name")
    number = props.get("housenumber")
    city = props.get("city") or "Catamarca"
    parts = [p for p in (street, number) if p]
    if parts:
        return f"{' '.join(parts)}, {city}"
    if props.get("name"):
        return f"{props['name']}, {city}"
    return None


def reverse_geocode(lat: float, lng: float) -> str:
    coords = f"{lat:.6f}, {lng:.6f}"
    qs = urllib.parse.urlencode({"lat": lat, "lon": lng, "limit": 1})
    url = f"https://photon.komoot.io/reverse?{qs}"
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "SIHE-academic/1.0 (hidrantes Catamarca)"},
    )
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=20) as res:
                data = json.loads(res.read().decode("utf-8"))
            features = data.get("features") or []
            if not features:
                return coords
            label = address_from_feature(features[0].get("properties") or {})
            return label or coords
        except urllib.error.HTTPError as err:
            if err.code in (429, 500, 502, 503, 504) and attempt < 3:
                time.sleep(1.5 * (attempt + 1))
                continue
            return coords
        except Exception:
            if attempt < 3:
                time.sleep(1.0 * (attempt + 1))
                continue
            return coords
    return coords


def sql_escape(value: str) -> str:
    return value.replace("'", "''")


def write_sql(rows: list[dict]) -> None:
    lines = [
        "-- =============================================================================",
        "-- SIHE — 06 direcciones de hidrantes masivos",
        "-- Solo actualiza filas que todavía tienen 'Hidrante N - Catamarca'.",
        "-- =============================================================================",
        "",
    ]
    for row in rows:
        if not row.get("address"):
            continue
        name = sql_escape(row["name"])
        address = sql_escape(row["address"])
        lines.append(
            "update public.resources\n"
            f"set address = '{address}'\n"
            f"where name = '{name}'\n"
            f"  and address = '{name} - Catamarca';"
        )
        lines.append("")
    OUT_SQL.write_text("\n".join(lines), encoding="utf-8")


def main() -> None:
    hydrants = parse_hidrantes()
    if not hydrants:
        raise SystemExit("No se leyeron hidrantes de 03_datos_demo.sql")

    cache: dict[str, str] = {}
    if CACHE.exists():
        cache = json.loads(CACHE.read_text(encoding="utf-8"))

    done = 0
    for i, row in enumerate(hydrants, start=1):
        key = row["name"]
        if key in cache and cache[key]:
            row["address"] = cache[key]
        else:
            row["address"] = reverse_geocode(row["lat"], row["lng"])
            cache[key] = row["address"]
            done += 1
            if done % 25 == 0:
                CACHE.write_text(
                    json.dumps(cache, ensure_ascii=False, indent=2),
                    encoding="utf-8",
                )
                write_sql(hydrants)
                print(f"{i}/{len(hydrants)} ultimo: {key} = {row['address']}")
            time.sleep(0.25)

    CACHE.write_text(json.dumps(cache, ensure_ascii=False, indent=2), encoding="utf-8")
    write_sql(hydrants)
    print(f"Listo: {len(hydrants)} hidrantes -> {OUT_SQL}")


if __name__ == "__main__":
    main()
