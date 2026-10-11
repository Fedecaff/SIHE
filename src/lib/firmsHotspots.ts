import {
  FIRMS_COLOR_HIGH,
  FIRMS_COLOR_LOW,
  FIRMS_COLOR_NOMINAL,
  FIRMS_SOURCES,
  MODIS_CONFIDENCE_HIGH_MIN,
  MODIS_CONFIDENCE_NOMINAL_MIN,
} from "@/lib/mapConstants";
import { acqUtcMillis, addCalendarDays, utcDateString } from "@/lib/fireDates";

export type FirmsSource = (typeof FIRMS_SOURCES)[number];
export type FirmsSourceChoice = FirmsSource | "viirs_all";
export type FirmsWindow = "24h" | "48h" | "7d" | "dia";
export type FirmsConfidence = "baja" | "nominal" | "alta";
export type FirmsConfidenceFilter = "todas" | "nominal_alta" | "alta";

export type FirmsHotspot = {
  lat: number;
  lng: number;
  acqDate: string;
  acqTime: string;
  satellite: string;
  source: FirmsSource;
  confidence: FirmsConfidence;
  frp: number | null;
  brightnessK: number | null;
  dayNight: string;
};

export type FirmsCall = {
  source: FirmsSource;
  days: number;
  date?: string;
};

const VIIRS_SOURCES: FirmsSource[] = [
  "VIIRS_SNPP_NRT",
  "VIIRS_NOAA20_NRT",
  "VIIRS_NOAA21_NRT",
];

export function firmsSourcesFor(choice: FirmsSourceChoice): FirmsSource[] {
  return choice === "viirs_all" ? VIIRS_SOURCES : [choice];
}

/** Ventanas relativas: FIRMS pide días UTC enteros (máx. 5 por llamada).
 *  24 h → 2 días y el cliente deja solo lo de las últimas 24 h.
 *  48 h → 3 días, mismo recorte.
 *  7 días → última llamada de 5 días más otra de 2 que termina 5 días antes
 *  (cubre 7 fechas UTC: hoy y los seis anteriores) y el cliente recorta a 7×24 h.
 *  Día elegido → DAY_RANGE 1 con esa fecha.
 */
export function firmsCallsFor(
  choice: FirmsSourceChoice,
  window: FirmsWindow,
  selectedDate: string,
  now = new Date(),
): FirmsCall[] {
  const sources = firmsSourcesFor(choice);
  const ranges =
    window === "24h"
      ? [{ days: 2 }]
      : window === "48h"
        ? [{ days: 3 }]
        : window === "7d"
          ? [
              { days: 5 },
              { days: 2, date: addCalendarDays(utcDateString(now), -5) },
            ]
          : [{ days: 1, date: selectedDate }];

  return sources.flatMap((source) =>
    ranges.map((range) => ({ source, ...range })),
  );
}

export function confidenceColor(level: FirmsConfidence): string {
  if (level === "alta") return FIRMS_COLOR_HIGH;
  if (level === "nominal") return FIRMS_COLOR_NOMINAL;
  return FIRMS_COLOR_LOW;
}

export function normalizeConfidence(
  raw: string,
  source: FirmsSource,
): FirmsConfidence {
  const value = raw.trim().toLowerCase();
  if (source === "MODIS_NRT") {
    const score = Number(value);
    if (!Number.isFinite(score)) return "baja";
    if (score >= MODIS_CONFIDENCE_HIGH_MIN) return "alta";
    if (score >= MODIS_CONFIDENCE_NOMINAL_MIN) return "nominal";
    return "baja";
  }
  if (value === "h") return "alta";
  if (value === "n") return "nominal";
  return "baja";
}

export function parseFirmsCsv(csv: string, source: FirmsSource): FirmsHotspot[] {
  const lines = csv
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  if (lines.length === 0) return [];

  const header = splitCsv(lines[0]).map((cell) => cell.toLowerCase());
  if (!header.includes("latitude") || !header.includes("longitude")) {
    throw new Error("FIRMS no devolvió un CSV de focos.");
  }

  const col = (name: string) => header.indexOf(name);
  const latCol = col("latitude");
  const lngCol = col("longitude");
  const dateCol = col("acq_date");
  const timeCol = col("acq_time");
  const satCol = col("satellite");
  const confCol = col("confidence");
  const frpCol = col("frp");
  const dayCol = col("daynight");
  const brightViirs = col("bright_ti4");
  const brightModis = col("brightness");

  const points: FirmsHotspot[] = [];
  for (const line of lines.slice(1)) {
    const cells = splitCsv(line);
    const lat = Number(cells[latCol]);
    const lng = Number(cells[lngCol]);
    const acqDate = cells[dateCol] ?? "";
    const acqTime = (cells[timeCol] ?? "").padStart(4, "0");
    if (!Number.isFinite(lat) || !Number.isFinite(lng) || !acqDate) continue;
    const brightRaw =
      brightViirs >= 0 ? cells[brightViirs] : cells[brightModis];
    const bright = Number(brightRaw);
    const frp = Number(cells[frpCol]);
    points.push({
      lat,
      lng,
      acqDate,
      acqTime,
      satellite: satCol >= 0 ? (cells[satCol] ?? "") : "",
      source,
      confidence: normalizeConfidence(cells[confCol] ?? "", source),
      frp: Number.isFinite(frp) ? frp : null,
      brightnessK: Number.isFinite(bright) ? bright : null,
      dayNight: dayCol >= 0 ? (cells[dayCol] ?? "") : "",
    });
  }
  return points;
}

export function hotspotKey(point: FirmsHotspot): string {
  return [
    point.lat.toFixed(5),
    point.lng.toFixed(5),
    point.acqDate,
    point.acqTime,
    point.satellite,
  ].join("|");
}

export function dedupeHotspots(points: FirmsHotspot[]): FirmsHotspot[] {
  const seen = new Set<string>();
  const unique: FirmsHotspot[] = [];
  for (const point of points) {
    const key = hotspotKey(point);
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(point);
  }
  return unique;
}

export function filterHotspots(
  points: FirmsHotspot[],
  options: {
    window: FirmsWindow;
    selectedDate: string;
    confidence: FirmsConfidenceFilter;
    minFrp: number | null;
    now?: Date;
  },
): FirmsHotspot[] {
  const now = options.now ?? new Date();
  const minTime =
    options.window === "24h"
      ? now.getTime() - 24 * 60 * 60 * 1000
      : options.window === "48h"
        ? now.getTime() - 48 * 60 * 60 * 1000
        : options.window === "7d"
          ? now.getTime() - 7 * 24 * 60 * 60 * 1000
          : null;

  return points.filter((point) => {
    if (options.window === "dia" && point.acqDate !== options.selectedDate) {
      return false;
    }
    if (minTime != null && acqUtcMillis(point.acqDate, point.acqTime) < minTime) {
      return false;
    }
    if (options.confidence === "alta" && point.confidence !== "alta") {
      return false;
    }
    if (
      options.confidence === "nominal_alta" &&
      point.confidence === "baja"
    ) {
      return false;
    }
    if (options.minFrp != null && (point.frp == null || point.frp < options.minFrp)) {
      return false;
    }
    return true;
  });
}

export function firmsCountLabel(
  count: number,
  window: FirmsWindow,
  selectedDate: string,
): string {
  if (count === 0 && window === "dia") return `Sin focos el ${selectedDate}`;
  if (count === 0) return "Sin focos en la ventana elegida";
  if (window === "24h") return `${count} focos en las últimas 24 h`;
  if (window === "48h") return `${count} focos en las últimas 48 h`;
  if (window === "7d") return `${count} focos en los últimos 7 días`;
  return `${count} focos el ${selectedDate}`;
}

export function publicFirmsError(status: number | null, body: string): string {
  const scrubbed = body.replace(/[A-Za-z0-9_-]{16,}/g, "");
  if (status === 503 || /no está configurada|not configured/i.test(scrubbed)) {
    return "Falta configurar la clave de FIRMS en el servidor.";
  }
  if (status === 401) {
    return "Tenés que iniciar sesión para ver los focos satelitales.";
  }
  if (status === 400 && /map_key|no es válida/i.test(body)) {
    return "La clave de FIRMS no es válida.";
  }
  if (status === 429 || /l[ií]mite|limit exceeded/i.test(scrubbed)) {
    return "Se superó el límite de consultas a FIRMS. Probá de nuevo en unos minutos.";
  }
  if (status === 504 || /timeout|tardó/i.test(scrubbed)) {
    return "La consulta a FIRMS tardó demasiado.";
  }
  return "No se pudieron cargar los focos satelitales.";
}

export function sourceLabel(source: FirmsSource): string {
  switch (source) {
    case "VIIRS_SNPP_NRT":
      return "VIIRS S-NPP";
    case "VIIRS_NOAA20_NRT":
      return "VIIRS NOAA-20";
    case "VIIRS_NOAA21_NRT":
      return "VIIRS NOAA-21";
    case "MODIS_NRT":
      return "MODIS";
  }
}

function splitCsv(line: string): string[] {
  return line.split(",").map((cell) => cell.trim());
}
