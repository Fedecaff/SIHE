import {
  ROUTING_BASE_URL,
  ROUTING_TIMEOUT_MS,
} from "@/lib/mapConstants";
import { osrmStepInstruction } from "@/lib/osrmManeuvers";
import type { LatLng } from "@/lib/userLocation";
import type { ResourceType } from "@/types/sihe";

type RouteTargetKind = "recurso" | "direccion" | "punto";

export type RouteTarget = {
  lat: number;
  lng: number;
  label: string;
  kind: RouteTargetKind;
  tipoRecurso?: ResourceType;
};

type RouteStep = {
  instruction: string;
  distanceM: number;
  durationS: number;
};

export type RouteResult = {
  geometry: LatLng[];
  distanceM: number;
  durationS: number;
  steps: RouteStep[];
};

export interface RoutingProvider {
  getRoute(
    origin: LatLng,
    destination: LatLng,
    signal?: AbortSignal,
  ): Promise<RouteResult>;
}

export class RoutingError extends Error {
  readonly code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = "RoutingError";
    this.code = code;
  }
}

type OsrmStep = {
  name?: string;
  distance: number;
  duration: number;
  maneuver?: {
    type?: string;
    modifier?: string;
    exit?: number;
  };
};

type OsrmRouteResponse = {
  code?: string;
  message?: string;
  routes?: Array<{
    distance: number;
    duration: number;
    geometry?: { coordinates?: [number, number][] };
    legs?: Array<{ steps?: OsrmStep[] }>;
  }>;
};

function userMessageForOsrm(code: string, status?: number): string {
  if (status === 429 || code === "TooManyRequests") {
    return "El servidor de rutas está ocupado. Probá en unos segundos.";
  }
  if (code === "NoRoute" || code === "NoSegment") {
    return "No hay una ruta por calle hasta ese punto.";
  }
  if (code === "InvalidUrl" || code === "InvalidValue") {
    return "No se pudo armar la ruta con esos puntos.";
  }
  return "No se pudo calcular la ruta.";
}

class OSRMProvider implements RoutingProvider {
  private readonly baseUrl: string;

  constructor(baseUrl: string = ROUTING_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async getRoute(
    origin: LatLng,
    destination: LatLng,
    signal?: AbortSignal,
  ): Promise<RouteResult> {
    const path = `${this.baseUrl}/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}`;
    const url = `${path}?overview=full&geometries=geojson&steps=true`;

    const controller = new AbortController();
    const timer = window.setTimeout(
      () => controller.abort("timeout"),
      ROUTING_TIMEOUT_MS,
    );
    const onExternalAbort = () => controller.abort("cancelled");
    signal?.addEventListener("abort", onExternalAbort);

    let response: Response;
    try {
      response = await fetch(url, { signal: controller.signal });
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") {
        if (controller.signal.reason === "timeout") {
          throw new RoutingError(
            "La ruta tardó demasiado. Probá de nuevo.",
            "Timeout",
          );
        }
        throw new RoutingError("Ruta cancelada.", "Cancelled");
      }
      if (err instanceof TypeError) {
        throw new RoutingError(
          "Sin conexión. No se pudo calcular la ruta.",
          "Offline",
        );
      }
      throw new RoutingError("No se pudo calcular la ruta.", "Network");
    } finally {
      window.clearTimeout(timer);
      signal?.removeEventListener("abort", onExternalAbort);
    }

    let body: OsrmRouteResponse = {};
    try {
      body = (await response.json()) as OsrmRouteResponse;
    } catch {
      body = {};
    }

    const code = body.code ?? (response.ok ? "Ok" : "Error");
    if (!response.ok || code !== "Ok") {
      throw new RoutingError(
        userMessageForOsrm(code, response.status),
        code,
      );
    }

    const route = body.routes?.[0];
    const coords = route?.geometry?.coordinates;
    if (!route || !coords?.length) {
      throw new RoutingError("No hay una ruta por calle hasta ese punto.", "NoRoute");
    }

    const steps = (route.legs ?? []).flatMap((leg) =>
      (leg.steps ?? []).map((step) => ({
        instruction: osrmStepInstruction(step.maneuver ?? {}, step.name),
        distanceM: step.distance,
        durationS: step.duration,
      })),
    );

    return {
      geometry: coords.map(([lng, lat]) => ({ lat, lng })),
      distanceM: route.distance,
      durationS: route.duration,
      steps,
    };
  }
}

export const defaultRoutingProvider: RoutingProvider = new OSRMProvider();
