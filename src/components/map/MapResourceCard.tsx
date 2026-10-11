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
    <div className="map-panel-body">
      <p className="muted">
        {typeLabel(resource.type)} · {statusLabel(resource.status)}
      </p>
      {peek ? null : (
        <p className="muted">Verificación: {formatDateTime(resource.last_verified_at)}</p>
      )}
      <div className="map-sheet-actions">
        <button type="button" className="btn-primary btn-inline" onClick={onRoute}>
          Cómo llegar
        </button>
        {peek ? null : (
          <>
            <Link to={`/recursos/${resource.id}`} className="btn-toolbar">
              Ver ficha
            </Link>
            <Link
              to={`/recursos/${resource.id}/incidencia`}
              className="btn-toolbar"
            >
              Reportar
            </Link>
            {isAdmin ? (
              <Link to={`/recursos/${resource.id}/editar`} className="btn-toolbar">
                Actualizar
              </Link>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
