import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "@/app/providers";
import type { ResourceMapItem } from "@/types/sihe";
import { MapActionRail } from "@/components/map/MapActionRail";
import { MapBottomSheet } from "@/components/map/MapBottomSheet";
import { MapFiltersPanel } from "@/components/map/MapFiltersPanel";
import { MapLegend } from "@/components/map/MapLegend";
import { MapResourceCard } from "@/components/map/MapResourceCard";
import { MapSearchBar } from "@/components/map/MapSearchBar";
import { MapToasts, type MapToast } from "@/components/map/MapToasts";
import { MapView } from "@/components/map/MapView";
import { RoutePanel } from "@/components/map/RoutePanel";
import { useMapChrome } from "@/hooks/useMapChrome";
import { useResourceFilters } from "@/hooks/useResourceFilters";
import { useRoute } from "@/hooks/useRoute";
import { useSatelliteLayers } from "@/hooks/useSatelliteLayers";
import {
  OVERLAY_FIRMS,
  OVERLAY_MODIS,
  OVERLAY_VIIRS,
  OVERLAY_WMS,
} from "@/lib/mapConstants";
import {
  initialMapPanel,
  mapPanelReducer,
  resolveSheet,
  type SheetHeight,
} from "@/lib/mapPanel";
import { geocodeCityAddress } from "@/services/geocode";
import {
  fetchFireEventsMap,
  type FireEventMapItem,
  type FirePeriod,
} from "@/services/fires";
import { fetchResourcesMap } from "@/services/resources";

export function MapPage() {
  const { user } = useAuth();
  const { filters, patchFilters, clearFilters } = useResourceFilters();
  const {
    destination,
    origin,
    route,
    pickingOriginOnMap,
    startTo,
    setOriginFromMap,
  } = useRoute();
  const satellite = useSatelliteLayers();
  const { chrome, wide, zoom } = useMapChrome();
  const [panel, dispatch] = useReducer(mapPanelReducer, initialMapPanel);
  const [searchParams] = useSearchParams();
  const focusId = searchParams.get("focus");
  const focusFireId = searchParams.get("fire");
  const [items, setItems] = useState<ResourceMapItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locateToken, setLocateToken] = useState(0);
  const [homeToken, setHomeToken] = useState(0);
  const [zoomInToken, setZoomInToken] = useState(0);
  const [zoomOutToken, setZoomOutToken] = useState(0);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selected, setSelected] = useState<ResourceMapItem | null>(null);
  const [addressQuery, setAddressQuery] = useState("");
  const [addressSearching, setAddressSearching] = useState(false);
  const [addressTarget, setAddressTarget] = useState<{
    lat: number;
    lng: number;
    token: number;
    label: string;
  } | null>(null);
  const [showFireHeat, setShowFireHeat] = useState(false);
  const [showFirePoints, setShowFirePoints] = useState(Boolean(focusFireId));
  const [firePeriod, setFirePeriod] = useState<FirePeriod>("12m");
  const [fireEvents, setFireEvents] = useState<FireEventMapItem[]>([]);
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [desktopOpen, setDesktopOpen] = useState(wide);
  const [toolTab, setToolTab] = useState<"filtros" | "capas" | "leyenda">("filtros");

  const view = resolveSheet(panel, {
    routeActive: Boolean(destination),
    pickingOrigin: pickingOriginOnMap,
  });

  const handleUserLocation = useCallback((pos: { lat: number; lng: number }) => {
    setUserLocation(pos);
    setError(null);
  }, []);

  const handleLocateError = useCallback((message: string) => {
    setError(message);
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") dispatch({ type: "escape" });
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    if (filters.type === "ninguno") {
      setItems([]);
      setLoading(false);
      return () => {
        cancelled = true;
      };
    }
    void fetchResourcesMap({
      type: filters.type || undefined,
      status: filters.status || undefined,
    })
      .then((data) => {
        if (!cancelled) setItems(data);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "No se pudo cargar el mapa");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [filters.type, filters.status]);

  useEffect(() => {
    if (!showFireHeat && !showFirePoints) {
      setFireEvents([]);
      return;
    }
    let cancelled = false;
    void fetchFireEventsMap(firePeriod)
      .then((data) => {
        if (!cancelled) setFireEvents(data);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "No se pudieron cargar incendios",
          );
        }
      });
    return () => {
      cancelled = true;
    };
  }, [showFireHeat, showFirePoints, firePeriod]);

  async function handleAddressSearch() {
    const q = addressQuery.trim();
    if (!q) return;
    setAddressSearching(true);
    setError(null);
    try {
      const result = await geocodeCityAddress(q);
      setAddressTarget((prev) => ({
        lat: result.lat,
        lng: result.lng,
        token: (prev?.token ?? 0) + 1,
        label: result.label,
      }));
      dispatch({ type: "select-address" });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "No se pudo ubicar la dirección");
    } finally {
      setAddressSearching(false);
    }
  }

  function clearFiltersAndFires() {
    setShowFireHeat(false);
    setShowFirePoints(false);
    clearFilters();
  }

  const toasts = useMemo(() => {
    const raw: MapToast[] = [];
    if (error) raw.push({ id: "error", text: error, tone: "alert" });
    if (satellite.tileWarning) {
      raw.push({ id: "tile", text: satellite.tileWarning, tone: "status" });
    }
    if (satellite.firmsError) {
      raw.push({ id: "firms", text: satellite.firmsError, tone: "alert" });
    }
    return raw.filter((item) => !dismissed.includes(item.text));
  }, [dismissed, error, satellite.firmsError, satellite.tileWarning]);

  const activeFilters = (filters.type ? 1 : 0) + (filters.status ? 1 : 0);
  const activeOverlays =
    satellite.overlays.length + (showFireHeat ? 1 : 0) + (showFirePoints ? 1 : 0);
  const sheetHeight: SheetHeight = view.height;
  const bottomInset =
    chrome === "desktop" || chrome === "landscape" || view.kind === null
      ? 16
      : sheetHeight === "peek"
        ? 120
        : sheetHeight === "media"
          ? 280
          : 420;

  const sheetTitle =
    view.kind === "picking"
      ? "Tocá el mapa para marcar el origen"
      : view.kind === "filtros"
        ? "Filtros"
        : view.kind === "capas"
          ? "Capas"
          : view.kind === "leyenda"
            ? "Leyenda"
            : view.kind === "recurso"
              ? (selected?.name ?? "Recurso")
              : view.kind === "direccion"
                ? "Dirección encontrada"
                : view.kind === "ruta"
                  ? "Cómo llegar"
                  : "";

  const sheetBody = renderSheetBody();
  const showSheet = chrome !== "desktop" && view.kind !== null && sheetBody;

  function renderSheetBody() {
    if (view.kind === "picking") {
      return <p>Elegí un punto en el mapa. La ruta sigue abierta.</p>;
    }
    if (view.kind === "filtros") {
      return (
        <MapFiltersPanel
          filters={filters}
          resultCount={items.length}
          loading={loading}
          onChange={patchFilters}
          onClear={clearFiltersAndFires}
        />
      );
    }
    if (view.kind === "capas") {
      return (
        <div className="map-panel-body">
          <p className="muted">
            Las capas del mapa se eligen en el control de arriba a la derecha.
          </p>
          <fieldset className="map-chip-set">
            <legend>Incendios registrados</legend>
            <label className="map-chip">
              <input
                type="checkbox"
                checked={showFireHeat}
                onChange={(event) => setShowFireHeat(event.target.checked)}
              />
              Calor
            </label>
            <label className="map-chip">
              <input
                type="checkbox"
                checked={showFirePoints}
                onChange={(event) => setShowFirePoints(event.target.checked)}
              />
              Puntos
            </label>
            <label>
              Período
              <select
                value={firePeriod}
                onChange={(event) => setFirePeriod(event.target.value as FirePeriod)}
              >
                <option value="12m">12 meses</option>
                <option value="5y">5 años</option>
                <option value="all">Todo</option>
              </select>
            </label>
          </fieldset>
        </div>
      );
    }
    if (view.kind === "leyenda") {
      return (
        <MapLegend
          embedded
          typeFilter={filters.type}
          showFire={showFireHeat || showFirePoints}
          showModis={satellite.overlays.includes(OVERLAY_MODIS)}
          showViirs={satellite.overlays.includes(OVERLAY_VIIRS)}
          showWms={satellite.overlays.includes(OVERLAY_WMS)}
          showFirms={satellite.overlays.includes(OVERLAY_FIRMS)}
          imageDate={satellite.date}
          firmsLabel={satellite.firmsLabel}
        />
      );
    }
    if (view.kind === "recurso" && selected) {
      return (
        <MapResourceCard
          resource={selected}
          isAdmin={user?.role === "administrador"}
          peek={chrome !== "desktop" && sheetHeight === "peek"}
          onRoute={() => {
            dispatch({ type: "show-route" });
            void startTo({
              lat: selected.lat,
              lng: selected.lng,
              label: selected.name,
              kind: "recurso",
              tipoRecurso: selected.type,
            });
          }}
        />
      );
    }
    if (view.kind === "direccion" && addressTarget) {
      return (
        <div className="map-panel-body">
          <p>{addressTarget.label}</p>
          <div className="map-sheet-actions">
            <button
              type="button"
              className="btn-primary btn-inline"
              onClick={() => {
                dispatch({ type: "show-route" });
                void startTo({
                  lat: addressTarget.lat,
                  lng: addressTarget.lng,
                  label: addressTarget.label,
                  kind: "direccion",
                });
              }}
            >
              Cómo llegar
            </button>
            <button
              type="button"
              className="btn-toolbar"
              onClick={() => {
                setAddressTarget(null);
                dispatch({ type: "escape" });
              }}
            >
              Quitar marcador
            </button>
          </div>
        </div>
      );
    }
    if (view.kind === "ruta") return <RoutePanel />;
    return null;
  }

  const leftTool = panel.tool ?? toolTab;

  function renderDetail() {
    if (pickingOriginOnMap) {
      return <p>Elegí un punto en el mapa. La ruta sigue abierta.</p>;
    }
    if (destination) return <RoutePanel />;
    if (panel.detail === "recurso" && selected) {
      return (
        <MapResourceCard
          resource={selected}
          isAdmin={user?.role === "administrador"}
          peek={false}
          onRoute={() => {
            dispatch({ type: "show-route" });
            void startTo({
              lat: selected.lat,
              lng: selected.lng,
              label: selected.name,
              kind: "recurso",
              tipoRecurso: selected.type,
            });
          }}
        />
      );
    }
    if (panel.detail === "direccion" && addressTarget) {
      return (
        <div className="map-panel-body">
          <p>{addressTarget.label}</p>
          <div className="map-sheet-actions">
            <button
              type="button"
              className="btn-primary btn-inline"
              onClick={() => {
                dispatch({ type: "show-route" });
                void startTo({
                  lat: addressTarget.lat,
                  lng: addressTarget.lng,
                  label: addressTarget.label,
                  kind: "direccion",
                });
              }}
            >
              Cómo llegar
            </button>
            <button
              type="button"
              className="btn-toolbar"
              onClick={() => {
                setAddressTarget(null);
                dispatch({ type: "escape" });
              }}
            >
              Quitar marcador
            </button>
          </div>
        </div>
      );
    }
    return null;
  }

  const detail = renderDetail();

  return (
    <div
      className={`map-page is-${chrome}${desktopOpen ? " is-tools-open" : ""}`}
      style={{
        ["--map-inset-top" as string]: "64px",
        ["--map-inset-right" as string]: "72px",
        ["--map-inset-bottom" as string]: `${bottomInset}px`,
      }}
    >
      <div className="map-stage">
        {chrome === "desktop" && desktopOpen ? (
          <aside className="map-dock map-dock-left" aria-label="Herramientas del mapa">
            <div className="map-dock-tabs">
              {(["filtros", "capas", "leyenda"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={leftTool === tab ? "is-on" : ""}
                  aria-pressed={leftTool === tab}
                  onClick={() => {
                    setToolTab(tab);
                    if (panel.tool !== tab) dispatch({ type: "toggle-tool", panel: tab });
                  }}
                >
                  {tab === "filtros" ? "Filtros" : tab === "capas" ? "Capas" : "Leyenda"}
                </button>
              ))}
            </div>
            {leftTool === "filtros" ? (
              <MapFiltersPanel
                filters={filters}
                resultCount={items.length}
                loading={loading}
                onChange={patchFilters}
                onClear={clearFiltersAndFires}
              />
            ) : leftTool === "leyenda" ? (
              <MapLegend
                embedded
                typeFilter={filters.type}
                showFire={showFireHeat || showFirePoints}
                showModis={satellite.overlays.includes(OVERLAY_MODIS)}
                showViirs={satellite.overlays.includes(OVERLAY_VIIRS)}
                showWms={satellite.overlays.includes(OVERLAY_WMS)}
                showFirms={satellite.overlays.includes(OVERLAY_FIRMS)}
                imageDate={satellite.date}
                firmsLabel={satellite.firmsLabel}
              />
            ) : (
              <p className="muted">Control de capas del mapa, arriba a la derecha.</p>
            )}
          </aside>
        ) : null}
        <div className="map-body">
          <MapSearchBar
            query={addressQuery}
            searching={addressSearching}
            resultCount={items.length}
            loading={loading}
            onQueryChange={setAddressQuery}
            onSearch={() => void handleAddressSearch()}
            onClear={() => {
              setAddressQuery("");
              setAddressTarget(null);
            }}
          />
          <MapToasts
            items={toasts}
            onDismiss={(item) => setDismissed((current) => [...current, item.text])}
          />
          <MapView
            items={items}
            locateToken={locateToken}
            homeToken={homeToken}
            zoomInToken={zoomInToken}
            zoomOutToken={zoomOutToken}
            viewPadding={{ top: 72, right: 80, bottom: bottomInset, left: 16 }}
            focusId={focusId}
            addressTarget={addressTarget}
            userLocation={userLocation}
            onUserLocation={handleUserLocation}
            onLocateError={handleLocateError}
            onSelectResource={(item) => {
              setSelected(item);
              dispatch({ type: "select-resource" });
            }}
            onMapClick={() => dispatch({ type: "map-tap" })}
            fireEvents={fireEvents}
            showFireHeat={showFireHeat}
            showFirePoints={showFirePoints}
            focusFireId={focusFireId}
            routeGeometry={route?.geometry ?? []}
            routeOrigin={origin}
            routeDestination={destination}
            pickingOrigin={pickingOriginOnMap}
            onPickOrigin={setOriginFromMap}
            addressLabel={addressTarget?.label}
            baseLayer={satellite.baseLayer}
            overlays={satellite.overlays}
            satelliteDate={satellite.date}
            satelliteOpacity={satellite.opacity}
            firmsHotspots={satellite.hotspots}
            onBaseLayerChange={satellite.changeBase}
            onOverlayChange={satellite.changeOverlay}
            onTileError={satellite.reportTileError}
          />
          <MapActionRail
            filtersOpen={view.kind === "filtros"}
            layersOpen={view.kind === "capas"}
            legendOpen={view.kind === "leyenda"}
            activeFilters={activeFilters}
            activeOverlays={activeOverlays}
            showZoom={zoom}
            dimmed={pickingOriginOnMap}
            onToggleFilters={() => dispatch({ type: "toggle-tool", panel: "filtros" })}
            onToggleLayers={() => dispatch({ type: "toggle-tool", panel: "capas" })}
            onToggleLegend={() => dispatch({ type: "toggle-tool", panel: "leyenda" })}
            onLocate={() => setLocateToken((n) => n + 1)}
            onHome={() => {
              setAddressTarget(null);
              setHomeToken((n) => n + 1);
            }}
            onZoomIn={() => setZoomInToken((n) => n + 1)}
            onZoomOut={() => setZoomOutToken((n) => n + 1)}
          />
          {chrome === "desktop" ? (
            <button
              type="button"
              className="map-dock-toggle"
              aria-expanded={desktopOpen}
              onClick={() => setDesktopOpen((open) => !open)}
            >
              {desktopOpen ? "Ocultar panel" : "Mostrar panel"}
            </button>
          ) : null}
        </div>
        {chrome === "desktop" && detail ? (
          <aside className="map-dock map-dock-right" aria-label={destination ? "Cómo llegar" : sheetTitle}>
            <h2>{destination ? "Cómo llegar" : sheetTitle}</h2>
            {detail}
          </aside>
        ) : null}
      </div>
      {showSheet ? (
        <MapBottomSheet
          title={sheetTitle}
          label={sheetTitle}
          height={sheetHeight}
          side={chrome === "landscape"}
          backLabel={view.backToRoute ? "← Volver a la ruta" : undefined}
          onBack={view.backToRoute ? () => dispatch({ type: "escape" }) : undefined}
          onHeight={(height) => dispatch({ type: "set-height", height })}
          onClose={() => {
            if (view.kind === "ruta") dispatch({ type: "set-height", height: "peek" });
            else dispatch({ type: "escape" });
          }}
        >
          {sheetBody}
        </MapBottomSheet>
      ) : null}
    </div>
  );
}
