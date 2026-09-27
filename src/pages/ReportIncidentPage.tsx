import { useEffect, useState, type FormEvent } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "@/app/providers";

import {

  INCIDENT_TYPE_OPTIONS,

  RESOURCE_STATUS_OPTIONS,

} from "@/lib/incidentLabels";

import { typeLabel } from "@/lib/resourceLabels";

import { reportIncident } from "@/services/incidents";

import { fetchResourceDetail } from "@/services/resources";

import type { IncidentType, ResourceStatus } from "@/types/sihe";



export function ReportIncidentPage() {

  const { id = "" } = useParams();

  const { user } = useAuth();

  const navigate = useNavigate();

  const [resourceName, setResourceName] = useState("");

  const [resourceType, setResourceType] = useState("");

  const [type, setType] = useState<IncidentType>("dano");

  const [description, setDescription] = useState("");

  const [suggestedStatus, setSuggestedStatus] = useState<ResourceStatus | "">(

    "",

  );

  const [photo, setPhoto] = useState<File | null>(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState<string | null>(null);



  useEffect(() => {

    if (!id) return;

    let cancelled = false;

    void fetchResourceDetail(id)

      .then((r) => {

        if (cancelled) return;

        setResourceName(r.name);

        setResourceType(typeLabel(r.type));

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



  async function onSubmit(e: FormEvent) {

    e.preventDefault();

    if (!user || !id) return;

    setSaving(true);

    setError(null);

    try {

      await reportIncident({

        resourceId: id,

        reporterId: user.id,

        type,

        description,

        suggestedStatus,

        photo,

      });

      navigate(`/recursos/${id}`);

    } catch (err: unknown) {

      setError(err instanceof Error ? err.message : "No se pudo enviar");

    } finally {

      setSaving(false);

    }

  }



  if (loading) {

    return (

      <div className="page-panel">

        <p>Cargando…</p>

      </div>

    );

  }



  return (

    <div className="form-page">

      <h1>Reportar incidencia</h1>

      <p className="form-lead">

        {resourceType}: <strong>{resourceName}</strong>. La ficha oficial{" "}

        <strong>no cambia</strong> hasta que un administrador revise el reporte.

      </p>



      <form className="form-card" onSubmit={(e) => void onSubmit(e)}>

        <label className="field">

          <span>Tipo</span>

          <select

            value={type}

            onChange={(e) => setType(e.target.value as IncidentType)}

            required

          >

            {INCIDENT_TYPE_OPTIONS.map((o) => (

              <option key={o.value} value={o.value}>

                {o.label}

              </option>

            ))}

          </select>

        </label>



        <label className="field">

          <span>Descripción</span>

          <textarea

            rows={4}

            value={description}

            onChange={(e) => setDescription(e.target.value)}

            required

            placeholder="Qué se observó en campo"

          />

        </label>



        <label className="field">

          <span>Estado sugerido (opcional)</span>

          <select

            value={suggestedStatus}

            onChange={(e) =>

              setSuggestedStatus(e.target.value as ResourceStatus | "")

            }

          >

            <option value="">Sin sugerencia</option>

            {RESOURCE_STATUS_OPTIONS.map((o) => (

              <option key={o.value} value={o.value}>

                {o.label}

              </option>

            ))}

          </select>

        </label>



        <label className="field">

          <span>Foto (opcional, máx. 5 MB)</span>

          <input

            type="file"

            accept="image/jpeg,image/png,image/webp"

            onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}

          />

        </label>



        {error ? (

          <p className="form-error" role="alert">

            {error}

          </p>

        ) : null}



        <div className="form-actions">

          <button type="submit" className="btn-primary btn-inline" disabled={saving}>

            {saving ? "Enviando…" : "Enviar reporte"}

          </button>

          <Link to={`/recursos/${id}`} className="btn-toolbar">

            Cancelar

          </Link>

        </div>

      </form>

    </div>

  );

}


