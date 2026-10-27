import { createContext, useContext } from "react";
import type { LatLng } from "@/lib/userLocation";
import type { RouteResult, RouteTarget } from "@/services/routing";

export type RouteState = {
  destination: RouteTarget | null;
  origin: LatLng | null;
  route: RouteResult | null;
  loading: boolean;
  error: string | null;
  needsOrigin: boolean;
  pickingOriginOnMap: boolean;
  pickingDestinationOnMap: boolean;
  markedPoint: LatLng | null;
  followLive: boolean;
  startTo: (target: RouteTarget) => Promise<void>;
  setOriginFromAddress: (query: string) => Promise<void>;
  beginPickOriginOnMap: () => void;
  setOriginFromMap: (point: LatLng) => void;
  beginPickDestinationOnMap: () => void;
  setDestinationFromMap: (point: LatLng) => void;
  startRouteToMarkedPoint: () => Promise<void>;
  clearMarkedPoint: () => void;
  cancelPickDestination: () => void;
  closeRoute: () => void;
  setFollowLive: (value: boolean) => void;
};

export const RouteContext = createContext<RouteState | null>(null);

export function useRoute(): RouteState {
  const ctx = useContext(RouteContext);
  if (!ctx) {
    throw new Error("useRoute debe usarse dentro de RouteProvider");
  }
  return ctx;
}
