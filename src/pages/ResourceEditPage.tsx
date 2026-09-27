import { useEffect, useState, type FormEvent } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "@/app/providers";

import { RESOURCE_STATUS_OPTIONS } from "@/lib/incidentLabels";

import { typeLabel } from "@/lib/resourceLabels";

import {

  fetchResourceDetail,

  updateResourceSheet,

} from "@/services/resources";

import type { ResourceStatus } from "@/types/sihe";



export function ResourceEditPage() {

  const { id = "" } = useParams();

  const { user } = useAuth();

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [typeLabelText, setTypeLabelText] = useState("");

  const [status, setStatus] = useState<ResourceStatus>("operativo");

  const [observations, setObservations] = useState("");

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState<string | null>(null);



  useEffect(() => {

    if (!id) return;

    let cancelled = false;

    setLoading(true);

    void fetchResourceDetail(id)

      .then((r) => {

        if (cancelled) return;

        setName(r.name);

        setTypeLabelText(typeLabel(r.type));

        setStatus(r.status);

        setObservations(r.observations ?? "");

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

      await updateResourceSheet({

        resourceId: id,

        userId: user.id,

        status,

        observations,

      });

      navigate(`/recursos/${id}`);

    } catch (err: unknown) {

      setError(err instanceof Error ? err.message : "No se pudo guardar");

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

      <h1>Actualizar ficha</h1>

      <p className="form-lead">

        {typeLabelText}: <strong>{name}</strong>. Solo el administrador puede
        cambiar la ficha oficial. El operador reporta una incidencia.

      </p>



      <form className="form-card" onSubmit={(e) => void onSubmit(e)}>

        <label className="field">

          <span>Estado operativo</span>

          <select

            value={status}

            onChange={(e) => setStatus(e.target.value as ResourceStatus)}

            required

          >

            {RESOURCE_STATUS_OPTIONS.map((o) => (

              <option key={o.value} value={o.value}>

                {o.label}

              </option>

            ))}

          </select>

        </label>



        <label className="field">

          <span>Observaciones</span>

          <textarea

            rows={4}

            value={observations}

            onChange={(e) => setObservations(e.target.value)}

            placeholder="Condición observada en campo"

          />

        </label>



        <p className="form-hint">

          Al guardar se registra la verificación con tu usuario y la fecha

          actual.

        </p>



        {error ? (

          <p className="form-error" role="alert">

            {error}

          </p>

        ) : null}



        <div className="form-actions">

          <button type="submit" className="btn-primary btn-inline" disabled={saving}>

            {saving ? "Guardando…" : "Guardar"}

          </button>

          <Link to={`/recursos/${id}`} className="btn-toolbar">

            Cancelar

          </Link>

        </div>



        <p className="form-hint">

          ¿Daño grave o estructural?{" "}

          <Link to={`/recursos/${id}/incidencia`}>Reportar incidencia</Link>

        </p>

      </form>

    </div>

  );

}


