import { useState, type FormEvent } from "react";
import { typeLabel } from "@/lib/resourceLabels";
import { formatRouteDistance, formatRouteDuration } from "@/lib/routeFormat";
import { useRoute } from "@/hooks/useRoute";

export function RoutePanel() {
  const {
    destination,
    route,
    loading,
    error,
    needsOrigin,
    pickingOriginOnMap,
    followLive,
    setOriginFromAddress,
    beginPickOriginOnMap,
    closeRoute,
    setFollowLive,
  } = useRoute();
  const [originQuery, setOriginQuery] = useState("");
  const [originSearching, setOriginSearching] = useState(false);

  if (!destination) return null;

  const title =
    destination.kind === "recurso" && destination.tipoRecurso
      ? `${typeLabel(destination.tipoRecurso)} · ${destination.label}`
      : destination.label;

  async function onOriginSubmit(e: FormEvent) {
    e.preventDefault();
    const q = originQuery.trim();
    if (!q) return;
    setOriginSearching(true);
    try {
      await setOriginFromAddress(q);
    } finally {
      setOriginSearching(false);
    }
  }

  return (
    <section
      className="route-panel"
      aria-label="Cómo llegar"
      aria-live="polite"
    >
      <div className="route-panel-head">
        <div>
          <p className="route-panel-kicker">Cómo llegar</p>
          <h2>{title}</h2>
          {route ? (
            <p className="muted">
              {formatRouteDistance(route.distanceM)} ·{" "}
              {formatRouteDuration(route.durationS)}
            </p>
          ) : loading ? (
            <p className="muted">Calculando ruta…</p>
          ) : null}
        </div>
        <button
          type="button"
          className="btn-toolbar"
          aria-label="Cerrar ruta"
          onClick={closeRoute}
        >
          Cerrar ruta
        </button>
      </div>

      {error ? (
        <p className="map-error route-panel-error" role="alert">
          {error}
        </p>
      ) : null}

      {needsOrigin || pickingOriginOnMap ? (
        <div className="route-origin-fallback">
          <p className="muted">
            Elegí el origen: buscá una dirección o marcá un punto en el mapa.
          </p>
          <form className="route-origin-form" onSubmit={onOriginSubmit}>
            <label className="filter-field filter-field-address">
              <span>Origen</span>
              <input
                type="search"
                value={originQuery}
                onChange={(e) => setOriginQuery(e.target.value)}
                placeholder="Ej. San Martín y Junín"
                autoComplete="street-address"
                disabled={originSearching || loading}
                aria-label="Dirección de origen"
              />
            </label>
            <button
              type="submit"
              className="btn-toolbar"
              disabled={originSearching || loading}
            >
              {originSearching ? "Buscando…" : "Usar dirección"}
            </button>
            <button
              type="button"
              className="btn-toolbar"
              onClick={beginPickOriginOnMap}
              aria-pressed={pickingOriginOnMap}
            >
              Marcar en el mapa
            </button>
          </form>
        </div>
      ) : null}

      {route ? (
        <>
          <label className="filter-check route-follow">
            <input
              type="checkbox"
              checked={followLive}
              onChange={(e) => setFollowLive(e.target.checked)}
            />
            <span>Seguir mi ubicación</span>
          </label>
          <details className="route-steps">
            <summary>Indicaciones paso a paso</summary>
            <ol>
              {route.steps.map((step, index) => (
                <li key={`${index}-${step.instruction}`}>
                  <span>{step.instruction}</span>
                  <span className="muted">
                    {formatRouteDistance(step.distanceM)}
                  </span>
                </li>
              ))}
            </ol>
          </details>
        </>
      ) : null}
    </section>
  );
}
