import { Link } from "react-router-dom";
import { resourceGlyphSvg } from "@/lib/mapIcons";
import { statusColor, statusLabel, typeColor, typeLabel } from "@/lib/resourceLabels";
import type { ResourceMapItem } from "@/types/sihe";

type Props = {
  resource: ResourceMapItem;
  isAdmin: boolean;
  peek?: boolean;
  distanceM?: number | null;
  onRoute: () => void;
};

function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1).replace(".", ",")} km`;
}

export function MapResourceCard({
  resource,
  isAdmin,
  peek,
  distanceM,
  onRoute,
}: Props) {
  return (
    <div className="map-panel-body map-resource-card">
      <div className="map-resource-meta">
        <span
          className="map-resource-type"
          style={{
            background: typeColor(resource.type),
            borderColor: statusColor(resource.status),
          }}
          dangerouslySetInnerHTML={{
            __html: resourceGlyphSvg(resource.type, "#fff", 16),
          }}
          aria-hidden="true"
        />
        <div>
          <p className="map-resource-type-label">{typeLabel(resource.type)}</p>
          <p
            className={`map-resource-status-chip status-${resource.status}`}
          >
            {statusLabel(resource.status)}
          </p>
        </div>
      </div>
      <p className="map-resource-address">{resource.address || "Sin dirección"}</p>
      {distanceM != null && Number.isFinite(distanceM) ? (
        <p className="map-resource-distance">A {formatDistance(distanceM)}</p>
      ) : null}
      <div className="map-sheet-actions map-resource-actions">
        {peek ? null : (
          <>
            <Link to={`/recursos/${resource.id}`} className="btn-secondary">
              Ver ficha
            </Link>
            <Link
              to={`/recursos/${resource.id}/incidencia`}
              className="btn-secondary"
            >
              Reportar
            </Link>
            {isAdmin ? (
              <Link to={`/recursos/${resource.id}/editar`} className="btn-secondary">
                Actualizar
              </Link>
            ) : null}
          </>
        )}
        <button type="button" className="btn-primary map-cta-route" onClick={onRoute}>
          Cómo llegar
        </button>
      </div>
    </div>
  );
}
