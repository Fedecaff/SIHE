import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ROUTE_DEVIATION_M } from "@/lib/mapConstants";
import {
  distanceMeters,
  getBrowserLocation,
  watchBrowserLocation,
  type LatLng,
} from "@/lib/userLocation";
import { geocodeCityAddress } from "@/services/geocode";
import {
  RoutingError,
  defaultRoutingProvider,
  type RouteResult,
  type RouteTarget,
  type RoutingProvider,
} from "@/services/routing";
import { RouteContext, type RouteState } from "@/hooks/useRoute";

function isCancelled(err: unknown): boolean {
  return err instanceof RoutingError && err.code === "Cancelled";
}

export function RouteProvider({
  children,
  provider = defaultRoutingProvider,
}: {
  children: ReactNode;
  provider?: RoutingProvider;
}) {
  const [destination, setDestination] = useState<RouteTarget | null>(null);
  const [origin, setOrigin] = useState<LatLng | null>(null);
  const [route, setRoute] = useState<RouteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsOrigin, setNeedsOrigin] = useState(false);
  const [pickingOriginOnMap, setPickingOriginOnMap] = useState(false);
  const [pickingDestinationOnMap, setPickingDestinationOnMap] = useState(false);
  const [markedPoint, setMarkedPoint] = useState<LatLng | null>(null);
  const [followLive, setFollowLiveState] = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  const routedOriginRef = useRef<LatLng | null>(null);
  const destinationRef = useRef<RouteTarget | null>(null);

  useEffect(() => {
    destinationRef.current = destination;
  }, [destination]);

  const cancelInFlight = useCallback(() => {
    abortRef.current?.abort("cancelled");
    abortRef.current = null;
  }, []);

  const fetchRoute = useCallback(
    async (from: LatLng, to: RouteTarget) => {
      cancelInFlight();
      const controller = new AbortController();
      abortRef.current = controller;
      setLoading(true);
      setError(null);
      try {
        const next = await provider.getRoute(from, to, controller.signal);
        if (abortRef.current !== controller) return;
        routedOriginRef.current = from;
        setOrigin(from);
        setRoute(next);
        setNeedsOrigin(false);
        setPickingOriginOnMap(false);
      } catch (err: unknown) {
        if (isCancelled(err) || abortRef.current !== controller) return;
        setRoute(null);
        setError(
          err instanceof Error ? err.message : "No se pudo calcular la ruta.",
        );
      } finally {
        if (abortRef.current === controller) {
          abortRef.current = null;
          setLoading(false);
        }
      }
    },
    [cancelInFlight, provider],
  );

  const startTo = useCallback(
    async (target: RouteTarget) => {
      setDestination(target);
      setRoute(null);
      setFollowLiveState(false);
      setPickingOriginOnMap(false);
      setNeedsOrigin(false);
      setError(null);
      try {
        const pos = await getBrowserLocation();
        await fetchRoute(pos, target);
      } catch (err: unknown) {
        setOrigin(null);
        setNeedsOrigin(true);
        setError(
          err instanceof Error
            ? err.message
            : "No se pudo obtener tu ubicación.",
        );
      }
    },
    [fetchRoute],
  );

  const setOriginFromAddress = useCallback(
    async (query: string) => {
      const dest = destinationRef.current;
      if (!dest) return;
      setError(null);
      try {
        const hit = await geocodeCityAddress(query);
        await fetchRoute({ lat: hit.lat, lng: hit.lng }, dest);
      } catch (err: unknown) {
        if (isCancelled(err)) return;
        setError(
          err instanceof Error
            ? err.message
            : "No se pudo ubicar el origen.",
        );
      }
    },
    [fetchRoute],
  );

  const beginPickOriginOnMap = useCallback(() => {
    setPickingOriginOnMap(true);
    setError("Tocá el mapa para marcar el origen.");
  }, []);

  const setOriginFromMap = useCallback(
    (point: LatLng) => {
      const dest = destinationRef.current;
      if (!dest) return;
      void fetchRoute(point, dest);
    },
    [fetchRoute],
  );

  const beginPickDestinationOnMap = useCallback(() => {
    setPickingDestinationOnMap(true);
    setDestination(null);
    setRoute(null);
    setMarkedPoint(null);
    setError(null);
  }, []);

  const setDestinationFromMap = useCallback((point: LatLng) => {
    setMarkedPoint(point);
    setPickingDestinationOnMap(false);
    setError(null);
  }, []);

  const startRouteToMarkedPoint = useCallback(async () => {
    if (!markedPoint) return;
    const target: RouteTarget = {
      lat: markedPoint.lat,
      lng: markedPoint.lng,
      label: "Punto marcado",
      kind: "punto",
    };
    setMarkedPoint(null);
    await startTo(target);
  }, [markedPoint, startTo]);

  const clearMarkedPoint = useCallback(() => {
    setMarkedPoint(null);
    setPickingDestinationOnMap(false);
    setError(null);
  }, []);

  const cancelPickDestination = useCallback(() => {
    setPickingDestinationOnMap(false);
    setError(null);
  }, []);

  const closeRoute = useCallback(() => {
    cancelInFlight();
    setFollowLiveState(false);
    setDestination(null);
    setOrigin(null);
    setRoute(null);
    setLoading(false);
    setError(null);
    setNeedsOrigin(false);
    setPickingOriginOnMap(false);
    setPickingDestinationOnMap(false);
    setMarkedPoint(null);
    routedOriginRef.current = null;
  }, [cancelInFlight]);

  const setFollowLive = useCallback((value: boolean) => {
    setFollowLiveState(value);
  }, []);

  useEffect(() => {
    if (!followLive || !destination) return;
    const watchId = watchBrowserLocation((pos) => {
      setOrigin(pos);
      const last = routedOriginRef.current;
      if (!last || distanceMeters(last, pos) >= ROUTE_DEVIATION_M) {
        const dest = destinationRef.current;
        if (dest) void fetchRoute(pos, dest);
      }
    });
    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [followLive, destination, fetchRoute]);

  useEffect(() => () => cancelInFlight(), [cancelInFlight]);

  const value = useMemo<RouteState>(
    () => ({
      destination,
      origin,
      route,
      loading,
      error,
      needsOrigin,
      pickingOriginOnMap,
      pickingDestinationOnMap,
      markedPoint,
      followLive,
      startTo,
      setOriginFromAddress,
      beginPickOriginOnMap,
      setOriginFromMap,
      beginPickDestinationOnMap,
      setDestinationFromMap,
      startRouteToMarkedPoint,
      clearMarkedPoint,
      cancelPickDestination,
      closeRoute,
      setFollowLive,
    }),
    [
      destination,
      origin,
      route,
      loading,
      error,
      needsOrigin,
      pickingOriginOnMap,
      pickingDestinationOnMap,
      markedPoint,
      followLive,
      startTo,
      setOriginFromAddress,
      beginPickOriginOnMap,
      setOriginFromMap,
      beginPickDestinationOnMap,
      setDestinationFromMap,
      startRouteToMarkedPoint,
      clearMarkedPoint,
      cancelPickDestination,
      closeRoute,
      setFollowLive,
    ],
  );

  return (
    <RouteContext.Provider value={value}>{children}</RouteContext.Provider>
  );
}
