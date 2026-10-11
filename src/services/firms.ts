import { supabase } from "@/lib/supabase";
import { CATAMARCA_BBOX, FIRMS_API_BASE, FIRMS_TIMEOUT_MS } from "@/lib/mapConstants";
import {
  dedupeHotspots,
  filterHotspots,
  firmsCallsFor,
  parseFirmsCsv,
  publicFirmsError,
  type FirmsConfidenceFilter,
  type FirmsHotspot,
  type FirmsSource,
  type FirmsSourceChoice,
  type FirmsWindow,
} from "@/lib/firmsHotspots";

export type FirmsQuery = {
  source: FirmsSourceChoice;
  window: FirmsWindow;
  date: string;
  confidence: FirmsConfidenceFilter;
  minFrp: number | null;
};

function devFirmsKey(): string | undefined {
  if (!import.meta.env.DEV) return undefined;
  const key = import.meta.env.VITE_FIRMS_MAP_KEY?.trim();
  return key ? key : undefined;
}

export async function fetchFirmsHotspots(
  query: FirmsQuery,
  signal: AbortSignal,
): Promise<FirmsHotspot[]> {
  const calls = firmsCallsFor(query.source, query.window, query.date);
  const batches = await Promise.all(
    calls.map(async (call) => {
      const csv = await fetchFirmsCsv(call.source, call.days, call.date, signal);
      return parseFirmsCsv(csv, call.source);
    }),
  );
  return filterHotspots(dedupeHotspots(batches.flat()), {
    window: query.window,
    selectedDate: query.date,
    confidence: query.confidence,
    minFrp: query.minFrp,
  });
}

async function fetchFirmsCsv(
  source: FirmsSource,
  days: number,
  date: string | undefined,
  signal: AbortSignal,
): Promise<string> {
  const key = devFirmsKey();
  if (key) return fetchFirmsDirect(key, source, days, date, signal);
  return fetchFirmsProxy(source, days, date, signal);
}

async function fetchFirmsDirect(
  key: string,
  source: string,
  days: number,
  date: string | undefined,
  signal: AbortSignal,
): Promise<string> {
  const bbox = `${CATAMARCA_BBOX.west},${CATAMARCA_BBOX.south},${CATAMARCA_BBOX.east},${CATAMARCA_BBOX.north}`;
  const path = `${FIRMS_API_BASE}/${key}/${source}/${bbox}/${days}${date ? `/${date}` : ""}`;
  const timeout = AbortSignal.timeout(FIRMS_TIMEOUT_MS);
  let response: Response;
  try {
    response = await fetch(path, { signal: AbortSignal.any([signal, timeout]) });
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === "AbortError") throw err;
    throw new Error(publicFirmsError(504, "timeout"));
  }
  const body = await response.text();
  if (!response.ok) {
    throw new Error(publicFirmsError(response.status, body));
  }
  return body;
}

async function fetchFirmsProxy(
  source: string,
  days: number,
  date: string | undefined,
  signal: AbortSignal,
): Promise<string> {
  const timeout = new Promise<never>((_, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(publicFirmsError(504, "timeout")));
    }, FIRMS_TIMEOUT_MS);
    signal.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new DOMException("aborted", "AbortError"));
    });
  });

  const invoke = supabase.functions.invoke("firms-proxy", {
    body: {
      source,
      days,
      date: date ?? null,
      bbox: [
        CATAMARCA_BBOX.west,
        CATAMARCA_BBOX.south,
        CATAMARCA_BBOX.east,
        CATAMARCA_BBOX.north,
      ],
    },
  });

  const result = await Promise.race([invoke, timeout]);
  if (result.error) {
    const status = statusFromInvokeError(result.error);
    const body = await messageFromInvokeError(result.error);
    throw new Error(publicFirmsError(status, body));
  }
  if (typeof result.data !== "string") {
    throw new Error(publicFirmsError(null, ""));
  }
  return result.data;
}

function statusFromInvokeError(error: { context?: unknown; message?: string }): number | null {
  const context = error.context;
  if (context && typeof context === "object" && "status" in context) {
    const status = (context as { status?: unknown }).status;
    if (typeof status === "number") return status;
  }
  return null;
}

async function messageFromInvokeError(error: {
  context?: unknown;
  message?: string;
}): Promise<string> {
  const context = error.context;
  if (context instanceof Response) {
    try {
      const payload = (await context.clone().json()) as { error?: unknown };
      if (typeof payload.error === "string") return payload.error;
    } catch {
      return "";
    }
  }
  return "";
}
