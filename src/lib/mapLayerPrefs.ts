import {
  BASE_LAYER_ESRI_SAT,
  BASE_LAYER_ESRI_TOPO,
  BASE_LAYER_IGN,
  BASE_LAYER_OPENTOPO,
  BASE_LAYER_OSM,
  OVERLAY_FIRMS,
  OVERLAY_MODIS,
  OVERLAY_VIIRS,
  OVERLAY_WMS,
} from "@/lib/mapConstants";

const STORAGE_KEY = "sihe-map-layers";

const BASES = new Set([
  BASE_LAYER_OSM,
  BASE_LAYER_ESRI_SAT,
  BASE_LAYER_IGN,
  BASE_LAYER_ESRI_TOPO,
  BASE_LAYER_OPENTOPO,
]);

const OVERLAYS = new Set([
  OVERLAY_MODIS,
  OVERLAY_VIIRS,
  OVERLAY_WMS,
  OVERLAY_FIRMS,
]);

export type MapLayerPrefs = {
  base: string;
  overlays: string[];
};

export function loadMapLayerPrefs(): MapLayerPrefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { base: BASE_LAYER_OSM, overlays: [] };
    const parsed = JSON.parse(raw) as { base?: unknown; overlays?: unknown };
    const base =
      typeof parsed.base === "string" && BASES.has(parsed.base)
        ? parsed.base
        : BASE_LAYER_OSM;
    const overlays = Array.isArray(parsed.overlays)
      ? parsed.overlays.filter(
          (name): name is string => typeof name === "string" && OVERLAYS.has(name),
        )
      : [];
    return { base, overlays };
  } catch {
    return { base: BASE_LAYER_OSM, overlays: [] };
  }
}

export function saveMapLayerPrefs(prefs: MapLayerPrefs): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}
