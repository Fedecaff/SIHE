import { useEffect, useState } from "react";
import type {
  ResourceMapItem,
  ResourceStatus,
  ResourceType,
} from "@/types/sihe";
import { MapLegend } from "@/components/map/MapLegend";
import { MapView } from "@/components/map/MapView";
import { fetchResourcesMap } from "@/services/resources";

export function MapPage() {
  const [items, setItems] = useState<ResourceMapItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState<ResourceType | "">("");
  const [status, setStatus] = useState<ResourceStatus | "">("");
  const [locateToken, setLocateToken] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    void fetchResourcesMap({
      type: type || undefined,
      status: status || undefined,
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
  }, [type, status]);

  return (
    <div className="map-page">
      <div className="map-toolbar">
        <label>
          Tipo
          <select
            value={type}
            onChange={(e) => setType(e.target.value as ResourceType | "")}
          >
            <option value="">Todos</option>
            <option value="hidrante">Hidrante</option>
            <option value="espejo">Espejo</option>
            <option value="tanque">Tanque</option>
          </select>
        </label>
        <label>
          Estado
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as ResourceStatus | "")
            }
          >
            <option value="">Todos</option>
            <option value="operativo">Operativo</option>
            <option value="observaciones">Observaciones</option>
            <option value="no_utilizable">No utilizable</option>
          </select>
        </label>
        <button
          type="button"
          className="btn-toolbar"
          onClick={() => setLocateToken((n) => n + 1)}
        >
          Mi ubicación
        </button>
        <span className="map-count">
          {loading ? "Cargando…" : `${items.length} recursos`}
        </span>
      </div>
      {error ? (
        <p className="map-error" role="alert">
          {error}
        </p>
      ) : null}
      <div className="map-body">
        <MapView items={items} locateToken={locateToken} />
        <MapLegend />
      </div>
    </div>
  );
}
