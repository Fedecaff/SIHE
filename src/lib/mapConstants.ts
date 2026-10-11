export const CATAMARCA_CENTER = {
  lat: -28.4696,
  lng: -65.7795,
} as const;

export const MAP_DEFAULT_ZOOM = 13;

const routingBase = import.meta.env.VITE_ROUTING_BASE_URL?.trim();

export const ROUTING_BASE_URL = (
  routingBase ? routingBase.replace(/\/$/, "") : "https://router.project-osrm.org"
);

export const ROUTING_TIMEOUT_MS = 10_000;

export const ROUTE_DEVIATION_M = 50;
