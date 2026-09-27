import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatDateTime } from "@/lib/incidentLabels";
import { fireTypeLabel, fetchFireEventsMap } from "@/services/fires";
import type { FireEventMapItem } from "@/services/fires";

export function FireDetailPage() {
  const { id = "" } = useParams();
  const [item, setItem] = useState<FireEventMapItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    void fetchFireEventsMap("all")
      .then((list) => {
        if (cancelled) return;
        const found = list.find((f) => f.id === id) ?? null;
        setItem(found);
        if (!found) setError("Evento no encontrado");
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Error al cargar");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="page-panel">
        <p>Cargando…</p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="page-panel">
        <p className="form-error">{error ?? "No encontrado"}</p>
        <Link to="/mapa" className="btn-toolbar">
          Volver al mapa
        </Link>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <p className="detail-kicker">Incendio histórico</p>
      <h1>{fireTypeLabel(item.event_type)}</h1>
      <section className="detail-card">
        <dl className="detail-grid">
          <div>
            <dt>Fecha</dt>
            <dd>{formatDateTime(item.occurred_at)}</dd>
          </div>
          <div>
            <dt>Descripción</dt>
            <dd>{item.description || "—"}</dd>
          </div>
        </dl>
      </section>
      <div className="detail-actions">
        <Link to={`/mapa?fire=${item.id}`} className="btn-toolbar">
          Ver en mapa
        </Link>
        {item.linked_resource_id ? (
          <Link
            to={`/recursos/${item.linked_resource_id}`}
            className="btn-toolbar"
          >
            Recurso vinculado
          </Link>
        ) : null}
      </div>
    </div>
  );
}
