const FIRMS_SOURCES = [
  "VIIRS_SNPP_NRT",
  "VIIRS_NOAA20_NRT",
  "VIIRS_NOAA21_NRT",
  "MODIS_NRT",
] as const;

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const ARGENTINA = {
  west: -73.6,
  south: -55.2,
  east: -53.5,
  north: -21.7,
};

Deno.serve(async (req) => {
  const origin = req.headers.get("Origin");
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }
  if (req.method !== "POST") {
    return json(405, "Método no permitido.", origin);
  }
  if (origin && !isAllowedOrigin(origin)) {
    return json(403, "Origen no permitido.", null);
  }

  const user = await currentUser(req);
  if (!user) return json(401, "Tenés que iniciar sesión.", origin);

  const key = Deno.env.get("FIRMS_MAP_KEY")?.trim();
  if (!key) return json(503, "La clave de FIRMS no está configurada.", origin);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json(400, "Pedido inválido.", origin);
  }

  const parsed = parseBody(body);
  if (!parsed.ok) return json(400, parsed.message, origin);

  const bbox = parsed.bbox.join(",");
  const datePath = parsed.date ? `/${parsed.date}` : "";
  const url =
    `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${key}/${parsed.source}/${bbox}/${parsed.days}${datePath}`;

  const timeout = AbortSignal.timeout(15_000);
  let response: Response;
  try {
    response = await fetch(url, { signal: timeout });
  } catch {
    return json(504, "La consulta a FIRMS tardó demasiado.", origin);
  }

  const text = await response.text();
  const hidden = text.split(key).join("");
  if (!response.ok) {
    if (response.status === 400 && /invalid map_key/i.test(hidden)) {
      return json(400, "La clave de FIRMS no es válida.", origin);
    }
    if (response.status === 429 || /limit/i.test(hidden)) {
      return json(429, "Se superó el límite de consultas a FIRMS.", origin);
    }
    return json(502, "FIRMS no respondió.", origin);
  }

  return new Response(hidden, {
    status: 200,
    headers: {
      ...corsHeaders(origin),
      "Content-Type": "text/csv; charset=utf-8",
      "Cache-Control": "max-age=300",
    },
  });
});

function parseBody(
  body: unknown,
):
  | {
      ok: true;
      source: (typeof FIRMS_SOURCES)[number];
      days: number;
      date: string | null;
      bbox: [number, number, number, number];
    }
  | { ok: false; message: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, message: "Pedido inválido." };
  }
  const record = body as Record<string, unknown>;
  const source = record.source;
  if (typeof source !== "string" || !isSource(source)) {
    return { ok: false, message: "Fuente no permitida." };
  }
  const days = record.days;
  if (typeof days !== "number" || !Number.isInteger(days) || days < 1 || days > 5) {
    return { ok: false, message: "El rango de días debe ser un entero de 1 a 5." };
  }
  let date: string | null = null;
  if (record.date != null && record.date !== "") {
    if (typeof record.date !== "string" || !DATE_RE.test(record.date) || !isRealDate(record.date)) {
      return { ok: false, message: "La fecha tiene que tener formato AAAA-MM-DD." };
    }
    date = record.date;
  }
  if (!Array.isArray(record.bbox) || record.bbox.length !== 4) {
    return { ok: false, message: "El recuadro es inválido." };
  }
  const numbers = record.bbox.map((value) =>
    typeof value === "number" ? value : Number.NaN,
  );
  if (numbers.some((value) => !Number.isFinite(value))) {
    return { ok: false, message: "El recuadro es inválido." };
  }
  const [west, south, east, north] = numbers as [number, number, number, number];
  if (
    west >= east ||
    south >= north ||
    west < ARGENTINA.west ||
    east > ARGENTINA.east ||
    south < ARGENTINA.south ||
    north > ARGENTINA.north
  ) {
    return { ok: false, message: "El recuadro queda fuera de Argentina." };
  }
  return { ok: true, source, days, date, bbox: [west, south, east, north] };
}

function isSource(value: string): value is (typeof FIRMS_SOURCES)[number] {
  return (FIRMS_SOURCES as readonly string[]).includes(value);
}

function isRealDate(value: string): boolean {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

async function currentUser(req: Request): Promise<boolean> {
  const authorization = req.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) return false;
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  if (!supabaseUrl || !anonKey) return false;
  const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: { Authorization: authorization, apikey: anonKey },
  });
  return response.ok;
}

function isAllowedOrigin(origin: string): boolean {
  if (/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) return true;
  const extra = (Deno.env.get("FIRMS_ALLOWED_ORIGINS") ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
  return extra.includes(origin);
}

function corsHeaders(origin: string | null): Record<string, string> {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
  };
  if (origin && isAllowedOrigin(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return headers;
}

function json(status: number, message: string, origin: string | null): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: {
      ...corsHeaders(origin),
      "Content-Type": "application/json",
    },
  });
}
