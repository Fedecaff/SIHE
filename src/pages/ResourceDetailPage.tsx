import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import { useAuth } from "@/app/providers";

import {

  formatDateTime,

  historyActionLabel,

  incidentStatusLabel,

  incidentTypeLabel,

} from "@/lib/incidentLabels";

import { statusLabel, typeLabel } from "@/lib/resourceLabels";

import {

  fetchResourceDetail,

  fetchResourceHistory,

  fetchResourcePendingIncidents,

} from "@/services/resources";

import type {

  ResourceDetail,

  ResourceHistoryItem,

  ResourceIncidentItem,

} from "@/types/sihe";



export function ResourceDetailPage() {

  const { id = "" } = useParams();

  const { user } = useAuth();

  const [resource, setResource] = useState<ResourceDetail | null>(null);

  const [history, setHistory] = useState<ResourceHistoryItem[]>([]);

  const [pending, setPending] = useState<ResourceIncidentItem[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);



  useEffect(() => {

    if (!id) return;

    let cancelled = false;

    setLoading(true);

    setError(null);

    void Promise.all([

      fetchResourceDetail(id),

      fetchResourceHistory(id),

      fetchResourcePendingIncidents(id),

    ])

      .then(([detail, hist, incs]) => {

        if (cancelled) return;

        setResource(detail);

        setHistory(hist);

        setPending(incs);

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

        <p>Cargando ficha…</p>

      </div>

    );

  }



  if (error || !resource) {

    return (

      <div className="page-panel">

        <p className="form-error" role="alert">

          {error || "Recurso no encontrado"}

        </p>

        <Link to="/listado" className="btn-toolbar">

          Volver al listado

        </Link>

      </div>

    );

  }



  const mapHref = `/mapa?focus=${resource.id}`;



  return (

    <div className="detail-page">

      <div className="detail-header">

        <div>

          <p className="detail-kicker">{typeLabel(resource.type)}</p>

          <h1>{resource.name}</h1>

          <p className="detail-address">{resource.address}</p>

        </div>

        <span className={`status-pill status-${resource.status}`}>

          {statusLabel(resource.status)}

        </span>

      </div>



      <section className="detail-card">

        <h2>Datos técnicos</h2>

        <dl className="detail-grid">

          <div>

            <dt>Accesibilidad</dt>

            <dd>{resource.accessibility || "—"}</dd>

          </div>

          <div>

            <dt>Capacidad / caudal</dt>

            <dd>{resource.capacity || "—"}</dd>

          </div>

          <div>

            <dt>Observaciones</dt>

            <dd>{resource.observations || "—"}</dd>

          </div>

          <div>

            <dt>Última verificación</dt>

            <dd>{formatDateTime(resource.last_verified_at)}</dd>

          </div>

          <div>

            <dt>Verificado por</dt>

            <dd>{resource.verifier_name || "—"}</dd>

          </div>

        </dl>

      </section>



      <div className="detail-actions">

        <Link to={mapHref} className="btn-toolbar">

          Ver en mapa

        </Link>

        <Link
          to={`/recursos/${resource.id}/incidencia`}
          className="btn-primary btn-inline"
        >
          Reportar incidencia
        </Link>
        {user?.role === "administrador" ? (
          <Link
            to={`/recursos/${resource.id}/editar`}
            className="btn-toolbar"
          >
            Actualizar ficha
          </Link>
        ) : null}

        {user?.role === "administrador" ? (

          <Link to="/admin" className="btn-toolbar">

            Panel admin

          </Link>

        ) : null}

      </div>



      {pending.length > 0 ? (

        <section className="detail-card">

          <h2>Incidencias pendientes</h2>

          <ul className="detail-list">

            {pending.map((inc) => (

              <li key={inc.id}>

                <strong>{incidentTypeLabel(inc.type)}</strong>

                <span className="status-pill status-observaciones">

                  {incidentStatusLabel(inc.status)}

                </span>

                <p>{inc.description}</p>

                <small>

                  {formatDateTime(inc.created_at)}

                  {inc.reporter_name ? ` · ${inc.reporter_name}` : ""}

                </small>

              </li>

            ))}

          </ul>

        </section>

      ) : null}



      <section className="detail-card">

        <h2>Historial</h2>

        {history.length === 0 ? (

          <p className="muted">Sin cambios registrados.</p>

        ) : (

          <ul className="detail-list">

            {history.map((h) => (

              <li key={h.id}>

                <strong>{historyActionLabel(h.action)}</strong>

                <small>

                  {formatDateTime(h.created_at)}

                  {h.user_name ? ` · ${h.user_name}` : ""}

                </small>

              </li>

            ))}

          </ul>

        )}

      </section>



      <p className="detail-back">

        <Link to="/listado">← Volver al listado</Link>

      </p>

    </div>

  );

}


