import { CATAMARCA_CENTER } from "@/lib/mapConstants";



export type GeocodeResult = {

  lat: number;

  lng: number;

  label: string;

};



/** Photon extent: [minLon, maxLat, maxLon, minLat] */

type Extent = [number, number, number, number];



type PhotonFeature = {

  geometry: { coordinates: [number, number] };

  properties: {

    name?: string;

    street?: string;

    housenumber?: string;

    city?: string;

    state?: string;

    type?: string;

    osm_key?: string;

    extent?: Extent;

  };

};



type PhotonResponse = { features?: PhotonFeature[] };



type StreetSample = {

  lat: number;

  lng: number;

  orientation: "ew" | "ns";

  name: string;

};



const CITY_SUFFIX = "Catamarca Argentina";



function parseIntersection(raw: string): { a: string; b: string } | null {

  const q = raw.trim();

  const match = q.match(/^(?:esquina\s+)?(.+?)\s+(?:y|&|\/|e)\s+(.+)$/i);

  if (!match) return null;

  const a = match[1].trim();

  const b = match[2].trim();

  if (!a || !b || a.length < 2 || b.length < 2) return null;

  return { a, b };

}



function normalizeName(s: string): string {

  return s

    .normalize("NFD")

    .replace(/[\u0300-\u036f]/g, "")

    .toLowerCase()

    .trim();

}



function nameMatches(featureName: string | undefined, query: string): boolean {

  if (!featureName) return false;

  const f = normalizeName(featureName);

  const q = normalizeName(query);

  return f.includes(q) || q.includes(f);

}



function labelFromFeature(f: PhotonFeature): string {

  const p = f.properties;

  const parts = [

    [p.name, p.housenumber].filter(Boolean).join(" "),

    p.street,

    p.city,

    p.state,

  ].filter(Boolean);

  return parts.join(", ") || "Ubicación encontrada";

}



async function photonRaw(search: string, limit = 10): Promise<PhotonFeature[]> {

  const url = new URL("https://photon.komoot.io/api/");

  url.searchParams.set("q", search);

  url.searchParams.set("limit", String(limit));

  url.searchParams.set("lat", String(CATAMARCA_CENTER.lat));

  url.searchParams.set("lon", String(CATAMARCA_CENTER.lng));

  url.searchParams.set(

    "bbox",

    `${CATAMARCA_CENTER.lng - 0.15},${CATAMARCA_CENTER.lat - 0.15},${CATAMARCA_CENTER.lng + 0.15},${CATAMARCA_CENTER.lat + 0.15}`,

  );



  const res = await fetch(url.toString());

  if (!res.ok) {

    throw new Error("No se pudo consultar el mapa de direcciones");

  }

  const data = (await res.json()) as PhotonResponse;

  return data.features ?? [];

}



function streetSamples(

  features: PhotonFeature[],

  streetName: string,

): StreetSample[] {

  const out: StreetSample[] = [];

  for (const f of features) {

    const isStreet =

      f.properties.osm_key === "highway" || f.properties.type === "street";

    if (!isStreet || !nameMatches(f.properties.name, streetName)) continue;



    const [lng, lat] = f.geometry.coordinates;

    const extent = f.properties.extent;

    let orientation: "ew" | "ns" = "ew";

    let sampleLat = lat;

    let sampleLng = lng;



    if (extent) {

      const dLon = Math.abs(extent[2] - extent[0]);

      const dLat = Math.abs(extent[1] - extent[3]);

      orientation = dLon >= dLat ? "ew" : "ns";

      // Centro del tramo (más estable que un extremo)

      sampleLng = (extent[0] + extent[2]) / 2;

      sampleLat = (extent[1] + extent[3]) / 2;

    }



    out.push({

      lat: sampleLat,

      lng: sampleLng,

      orientation,

      name: f.properties.name ?? streetName,

    });

  }

  return out;

}



function median(values: number[]): number {

  const sorted = [...values].sort((a, b) => a - b);

  const mid = Math.floor(sorted.length / 2);

  return sorted.length % 2 === 0

    ? (sorted[mid - 1] + sorted[mid]) / 2

    : sorted[mid];

}



/**

 * En damero (Catamarca): calle E-O aporta latitud, N-S aporta longitud.

 * Corrige el desfase típico de usar el centro de una sola calle.

 */

function gridCrossing(

  samplesA: StreetSample[],

  samplesB: StreetSample[],

  labelA: string,

  labelB: string,

): GeocodeResult | null {

  const all = [...samplesA, ...samplesB];

  if (!all.length) return null;



  const ew = all.filter((s) => s.orientation === "ew");

  const ns = all.filter((s) => s.orientation === "ns");



  if (ew.length && ns.length) {

    return {

      lat: median(ew.map((s) => s.lat)),

      lng: median(ns.map((s) => s.lng)),

      label: `${labelA} y ${labelB}, Catamarca`,

    };

  }



  // Sin orientación clara: promedio de ambos grupos

  if (samplesA.length && samplesB.length) {

    return {

      lat: (median(samplesA.map((s) => s.lat)) + median(samplesB.map((s) => s.lat))) / 2,

      lng: (median(samplesA.map((s) => s.lng)) + median(samplesB.map((s) => s.lng))) / 2,

      label: `${labelA} y ${labelB}, Catamarca`,

    };

  }



  return null;

}



async function geocodeIntersection(

  streetA: string,

  streetB: string,

): Promise<GeocodeResult | null> {

  const [featsA, featsB] = await Promise.all([

    photonRaw(`${streetA} ${CITY_SUFFIX}`, 10),

    photonRaw(`${streetB} ${CITY_SUFFIX}`, 10),

  ]);



  const samplesA = streetSamples(featsA, streetA);

  const samplesB = streetSamples(featsB, streetB);

  return gridCrossing(samplesA, samplesB, streetA, streetB);

}



async function geocodeAddressPhoton(

  query: string,

): Promise<GeocodeResult | null> {

  const variants = [

    `${query} ${CITY_SUFFIX}`,

    `${query} San Fernando del Valle de Catamarca`,

  ];



  for (const search of variants) {

    const features = await photonRaw(search, 5);

    if (!features.length) continue;



    const preferred =

      features.find(

        (f) =>

          Boolean(f.properties.housenumber) ||

          f.properties.type === "house" ||

          f.properties.osm_key === "place",

      ) ??

      features.find((f) => f.properties.osm_key !== "highway") ??

      features[0];



    const [lng, lat] = preferred.geometry.coordinates;

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;



    return {

      lat,

      lng,

      label: labelFromFeature(preferred),

    };

  }

  return null;

}



/** Dirección (Photon) o intersección en damero (lat E-O + lng N-S). */

export async function geocodeCityAddress(

  query: string,

): Promise<GeocodeResult> {

  const q = query.trim();

  if (!q) {

    throw new Error("Escribí una dirección o intersección");

  }



  try {

    const cross = parseIntersection(q);

    if (cross) {

      const hit = await geocodeIntersection(cross.a, cross.b);

      if (hit) return hit;

      const fallback = await geocodeAddressPhoton(`${cross.a} y ${cross.b}`);

      if (fallback) return fallback;

    } else {

      const hit = await geocodeAddressPhoton(q);

      if (hit) return hit;

    }

  } catch (err: unknown) {

    if (err instanceof TypeError) {

      throw new Error(

        "Sin conexión al servicio de direcciones. Revisá internet o bloqueadores.",

      );

    }

    throw err;

  }



  throw new Error(

    'No se encontró. Probá "San Martín y Junín" o "Rivadavia 500".',

  );

}

export function formatMapCoords(lat: number, lng: number): string {
  return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
}

function addressFromFeature(f: PhotonFeature): string | null {
  const p = f.properties;
  const streetLine = [p.street || p.name, p.housenumber]
    .filter(Boolean)
    .join(" ")
    .trim();
  const city = p.city || "Catamarca";
  if (streetLine) return `${streetLine}, ${city}`;
  if (p.name) return `${p.name}, ${city}`;
  return null;
}

/** Dirección de un clic en el mapa. Si no hay calle, devuelve coordenadas. */
export async function reverseGeocodeCity(
  lat: number,
  lng: number,
): Promise<string> {
  const coords = formatMapCoords(lat, lng);
  try {
    const url = new URL("https://photon.komoot.io/reverse");
    url.searchParams.set("lat", String(lat));
    url.searchParams.set("lon", String(lng));
    url.searchParams.set("limit", "1");

    const res = await fetch(url.toString());
    if (!res.ok) return coords;

    const data = (await res.json()) as PhotonResponse;
    const feature = data.features?.[0];
    if (!feature) return coords;

    return addressFromFeature(feature) ?? coords;
  } catch {
    return coords;
  }
}


