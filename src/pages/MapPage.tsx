import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "@/app/providers";
import type { ResourceMapItem } from "@/types/sihe";

import { FilterPanel } from "@/components/resources/FilterPanel";

import { MapLegend } from "@/components/map/MapLegend";

import { MapView } from "@/components/map/MapView";

import { useResourceFilters } from "@/hooks/useResourceFilters";

import { formatDateTime } from "@/lib/incidentLabels";

import { statusLabel, typeLabel } from "@/lib/resourceLabels";

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

  const [searchParams] = useSearchParams();

  const focusId = searchParams.get("focus");

  const focusFireId = searchParams.get("fire");

  const [items, setItems] = useState<ResourceMapItem[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [locateToken, setLocateToken] = useState(0);

  const [homeToken, setHomeToken] = useState(0);

  const [userLocation, setUserLocation] = useState<{

    lat: number;

    lng: number;

  } | null>(null);

  const [selected, setSelected] = useState<ResourceMapItem | null>(null);



  const [addressQuery, setAddressQuery] = useState("");

  const [addressSearching, setAddressSearching] = useState(false);

  const [addressTarget, setAddressTarget] = useState<{

    lat: number;

    lng: number;

    token: number;

  } | null>(null);



  const [showFireHeat, setShowFireHeat] = useState(false);

  const [showFirePoints, setShowFirePoints] = useState(Boolean(focusFireId));

  const [firePeriod, setFirePeriod] = useState<FirePeriod>("12m");

  const [fireEvents, setFireEvents] = useState<FireEventMapItem[]>([]);



  const handleUserLocation = useCallback((pos: { lat: number; lng: number }) => {

    setUserLocation(pos);

    setError(null);

  }, []);



  const handleLocateError = useCallback((message: string) => {

    setError(message);

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

          setError(

            err instanceof Error ? err.message : "No se pudo cargar el mapa",

          );

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

            err instanceof Error

              ? err.message

              : "No se pudieron cargar incendios",

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

      }));

    } catch (err: unknown) {

      setError(

        err instanceof Error ? err.message : "No se pudo ubicar la dirección",

      );

    } finally {

      setAddressSearching(false);

    }

  }



  return (

    <div className="map-page">

      <FilterPanel

        filters={filters}

        onChange={patchFilters}

        onClear={() => {

          setAddressQuery("");

          setAddressTarget(null);

          setShowFireHeat(false);

          setShowFirePoints(false);

          clearFilters();

        }}

        addressQuery={addressQuery}

        onAddressChange={setAddressQuery}

        onAddressSearch={() => void handleAddressSearch()}

        addressSearching={addressSearching}

        fireLayers={{

          showHeat: showFireHeat,

          showPoints: showFirePoints,

          period: firePeriod,

          onShowHeatChange: setShowFireHeat,

          onShowPointsChange: setShowFirePoints,

          onPeriodChange: setFirePeriod,

        }}

        resultCount={items.length}

        loading={loading}

        extraActions={

          <>

            <button

              type="button"

              className="btn-toolbar"

              onClick={() => {

                setAddressTarget(null);

                setHomeToken((n) => n + 1);

              }}

            >

              Centrar

            </button>

            <button

              type="button"

              className="btn-toolbar"

              onClick={() => setLocateToken((n) => n + 1)}

            >

              Mi ubicación

            </button>

          </>

        }

      />

      {error ? (

        <p className="map-error" role="alert">

          {error}

        </p>

      ) : null}

      <div className="map-body">

        <MapView

          items={items}

          locateToken={locateToken}

          homeToken={homeToken}

          focusId={focusId}

          addressTarget={addressTarget}

          userLocation={userLocation}

          onUserLocation={handleUserLocation}

          onLocateError={handleLocateError}

          onSelectResource={setSelected}

          fireEvents={fireEvents}

          showFireHeat={showFireHeat}

          showFirePoints={showFirePoints}

          focusFireId={focusFireId}

        />

        <MapLegend showFire={showFireHeat || showFirePoints} />

      </div>



      {selected ? (

        <div className="map-sheet" role="dialog" aria-label="Resumen del recurso">

          <div className="map-sheet-handle" />

          <div className="map-sheet-head">

            <div>

              <strong>{selected.name}</strong>

              <p className="muted">

                {typeLabel(selected.type)} · {statusLabel(selected.status)}

              </p>

              <p className="muted">

                Verificación: {formatDateTime(selected.last_verified_at)}

              </p>

            </div>

            <button

              type="button"

              className="btn-toolbar"

              onClick={() => setSelected(null)}

            >

              Cerrar

            </button>

          </div>

          <div className="map-sheet-actions">

            <Link to={`/recursos/${selected.id}`} className="btn-primary btn-inline">

              Ver ficha

            </Link>

            <Link
              to={`/recursos/${selected.id}/incidencia`}
              className="btn-toolbar"
            >
              Reportar
            </Link>
            {user?.role === "administrador" ? (
              <Link
                to={`/recursos/${selected.id}/editar`}
                className="btn-toolbar"
              >
                Actualizar
              </Link>
            ) : null}

          </div>

        </div>

      ) : null}

    </div>

  );

}


