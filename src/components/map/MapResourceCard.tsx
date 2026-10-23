import { Link } from "react-router-dom";
import { formatDateTime } from "@/lib/incidentLabels";
import { statusLabel, typeLabel } from "@/lib/resourceLabels";
import type { ResourceMapItem } from "@/types/sihe";

type Props = {
  resource: ResourceMapItem;
  isAdmin: boolean;
  peek?: boolean;
  onRoute: () => void;
};

export function MapResourceCard({ resource, isAdmin, peek, onRoute }: Props) {
  return (
    <div className="map-panel-body map-resource-card">
      <p className="muted">
        {typeLabel(resource.type)} · {statusLabel(resource.status)}
      </p>
      {peek ? null : (
        <p className="muted">Verificación: {formatDateTime(resource.last_verified_at)}</p>
      )}
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
