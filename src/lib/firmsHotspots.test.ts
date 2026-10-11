import { describe, expect, it } from "vitest";
import {
  dedupeHotspots,
  filterHotspots,
  firmsCallsFor,
  firmsCountLabel,
  normalizeConfidence,
  parseFirmsCsv,
  publicFirmsError,
} from "@/lib/firmsHotspots";

const VIIRS_CSV = [
  "latitude,longitude,bright_ti4,acq_date,acq_time,satellite,confidence,frp,daynight",
  "-28.100, -65.200, 330.5, 2026-10-11, 0300, N, h, 12.4, N",
  "-28.100, -65.200, 330.5, 2026-10-11, 0300, N, n, 4, D",
].join("\n");

describe("focos FIRMS", () => {
  it("arma 24 h, 7 días y el día elegido sin pasar de 5 días por llamada", () => {
    const now = new Date("2026-10-11T15:00:00Z");
    expect(firmsCallsFor("VIIRS_SNPP_NRT", "24h", "2026-10-10", now)).toEqual([
      { source: "VIIRS_SNPP_NRT", days: 2 },
    ]);
    expect(firmsCallsFor("VIIRS_SNPP_NRT", "7d", "2026-10-10", now)).toEqual([
      { source: "VIIRS_SNPP_NRT", days: 5 },
      { source: "VIIRS_SNPP_NRT", days: 2, date: "2026-10-06" },
    ]);
    expect(firmsCallsFor("viirs_all", "dia", "2026-08-01", now)).toHaveLength(3);
  });

  it("lee el CSV por encabezado y descarta duplicados", () => {
    const points = parseFirmsCsv(VIIRS_CSV, "VIIRS_SNPP_NRT");
    expect(points).toHaveLength(2);
    expect(points[0]?.brightnessK).toBe(330.5);
    expect(points[0]?.confidence).toBe("alta");
    expect(dedupeHotspots(points)).toHaveLength(1);
  });

  it("normaliza la confianza MODIS con los umbrales de FIRMS", () => {
    expect(normalizeConfidence("29", "MODIS_NRT")).toBe("baja");
    expect(normalizeConfidence("30", "MODIS_NRT")).toBe("nominal");
    expect(normalizeConfidence("80", "MODIS_NRT")).toBe("alta");
    expect(normalizeConfidence("l", "VIIRS_SNPP_NRT")).toBe("baja");
  });

  it("recorta 24 h y el día elegido en el cliente", () => {
    const points = parseFirmsCsv(VIIRS_CSV, "VIIRS_SNPP_NRT");
    const now = new Date("2026-10-11T04:00:00Z");
    expect(
      filterHotspots(points, {
        window: "24h",
        selectedDate: "2026-10-10",
        confidence: "alta",
        minFrp: null,
        now,
      }),
    ).toHaveLength(1);
    expect(
      filterHotspots(points, {
        window: "dia",
        selectedDate: "2026-10-10",
        confidence: "todas",
        minFrp: null,
        now,
      }),
    ).toHaveLength(0);
  });

  it("no deja pasar una clave larga en el mensaje", () => {
    const message = publicFirmsError(
      400,
      "Invalid MAP_KEY abcdefghijklmnopqrstuvwxyz123456",
    );
    expect(message).toBe("La clave de FIRMS no es válida.");
    expect(message).not.toContain("abcdefghijklmnopqrstuvwxyz123456");
    expect(firmsCountLabel(0, "dia", "2026-10-10")).toBe(
      "Sin focos el 2026-10-10",
    );
    expect(firmsCountLabel(3, "24h", "2026-10-10")).toBe(
      "3 focos en las últimas 24 h",
    );
  });
});
