import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { useAuth } from "@/app/providers";
import { notifyPendingIncidentsChanged } from "@/hooks/usePendingIncidentCount";

import {

  formatDateTime,

  incidentStatusLabel,

  incidentTypeLabel,

} from "@/lib/incidentLabels";

import { statusLabel } from "@/lib/resourceLabels";

import {

  getIncidentPhotoUrl,

  listIncidentsForAdmin,

  resolveIncident,

  type AdminIncidentRow,

} from "@/services/admin";

import type { IncidentStatus } from "@/types/sihe";



export function AdminIncidentsPage() {

  const { user } = useAuth();

  const [filter, setFilter] = useState<IncidentStatus | "todas">("pendiente");

  const [items, setItems] = useState<AdminIncidentRow[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [message, setMessage] = useState<string | null>(null);

  const [busyId, setBusyId] = useState<string | null>(null);

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);



  async function reload(status: IncidentStatus | "todas") {

    setLoading(true);

    setError(null);

    try {

      const data = await listIncidentsForAdmin(status);

      setItems(data);

    } catch (err: unknown) {

      setError(err instanceof Error ? err.message : "Error al cargar");

    } finally {

      setLoading(false);

    }

  }



  useEffect(() => {

    void reload(filter);

  }, [filter]);



  async function handleResolve(row: AdminIncidentRow, approve: boolean) {

    if (!user) return;

    setBusyId(row.id);

    setError(null);

    setMessage(null);

    try {

      await resolveIncident({

        incidentId: row.id,

        resourceId: row.resource_id,

        reviewerId: user.id,

        approve,

        suggestedStatus: row.suggested_status,

        description: row.description,

        type: row.type,

      });

      setMessage(

        approve

          ? "Incidencia aprobada. La ficha se actualizó si había estado sugerido."

          : "Incidencia rechazada. La ficha no cambió.",

      );

      await reload(filter);
      notifyPendingIncidentsChanged();

    } catch (err: unknown) {

      setError(err instanceof Error ? err.message : "No se pudo resolver");

    } finally {

      setBusyId(null);

    }

  }



  async function openPhoto(path: string) {

    const url = await getIncidentPhotoUrl(path);

    setPhotoUrl(url);

  }



  return (

    <div className="admin-page">

      <div className="list-header" style={{ paddingLeft: 0, paddingRight: 0 }}>

        <div>

          <h1>Revisión de incidencias</h1>

          <p className="list-subtitle">

            Aprobar aplica el estado sugerido a la ficha. Rechazar cierra sin

            cambiarla.

          </p>

        </div>

        <Link to="/admin" className="btn-toolbar">

          Volver al panel

        </Link>

      </div>



      <div className="filter-panel" style={{ border: "none", paddingLeft: 0 }}>

        <label className="filter-field">

          <span>Estado</span>

          <select

            value={filter}

            onChange={(e) =>

              setFilter(e.target.value as IncidentStatus | "todas")

            }

          >

            <option value="pendiente">Pendientes</option>

            <option value="aprobada">Aprobadas</option>

            <option value="rechazada">Rechazadas</option>

            <option value="todas">Todas</option>

          </select>

        </label>

      </div>



      {error ? (

        <p className="form-error" role="alert">

          {error}

        </p>

      ) : null}

      {message ? <p className="form-ok">{message}</p> : null}



      {loading ? <p>Cargando…</p> : null}



      <ul className="incident-list">

        {!loading && items.length === 0 ? (

          <li className="muted">No hay incidencias con ese filtro.</li>

        ) : null}

        {items.map((row) => (

          <li key={row.id} className="incident-card">

            <div className="incident-card-head">

              <strong>{row.resource_name ?? "Recurso"}</strong>

              <span className={`status-pill status-${row.status === "pendiente" ? "observaciones" : row.status === "aprobada" ? "operativo" : "no_utilizable"}`}>

                {incidentStatusLabel(row.status)}

              </span>

            </div>

            <p>

              <strong>{incidentTypeLabel(row.type)}</strong>

              {row.suggested_status

                ? ` · Sugiere: ${statusLabel(row.suggested_status)}`

                : ""}

            </p>

            <p>{row.description}</p>

            <small className="muted">

              {formatDateTime(row.created_at)}

              {row.reporter_name ? ` · ${row.reporter_name}` : ""}

            </small>

            <div className="form-actions" style={{ marginTop: 10 }}>

              <Link

                to={`/recursos/${row.resource_id}`}

                className="btn-toolbar"

              >

                Ver ficha

              </Link>

              {row.photo_path ? (

                <button

                  type="button"

                  className="btn-toolbar"

                  onClick={() => void openPhoto(row.photo_path!)}

                >

                  Ver foto

                </button>

              ) : null}

              {row.status === "pendiente" ? (

                <>

                  <button

                    type="button"

                    className="btn-primary btn-inline"

                    disabled={busyId === row.id}

                    onClick={() => void handleResolve(row, true)}

                  >

                    Aplicar a la ficha

                  </button>

                  <button

                    type="button"

                    className="btn-toolbar"

                    disabled={busyId === row.id}

                    onClick={() => void handleResolve(row, false)}

                  >

                    Rechazar

                  </button>

                </>

              ) : null}

            </div>

          </li>

        ))}

      </ul>



      {photoUrl ? (

        <div className="photo-modal" role="dialog" aria-label="Foto">

          <button

            type="button"

            className="btn-toolbar"

            onClick={() => setPhotoUrl(null)}

          >

            Cerrar

          </button>

          <img src={photoUrl} alt="Foto de la incidencia" />

        </div>

      ) : null}

    </div>

  );

}


