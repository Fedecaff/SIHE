import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/app/useAuth";
import { useToast } from "@/app/useToast";
import { Spinner } from "@/components/ui/Spinner";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";
import { toUserMessage } from "@/lib/errorMessages";
import {
  clearFormDraft,
  loadFormDraft,
  saveFormDraft,
} from "@/lib/formDraft";
import {
  INCIDENT_TYPE_OPTIONS,
  RESOURCE_STATUS_OPTIONS,
} from "@/lib/incidentLabels";
import { typeLabel } from "@/lib/resourceLabels";
import { reportIncident } from "@/services/incidents";
import { fetchResourceDetail } from "@/services/resources";
import type { IncidentType, ResourceStatus } from "@/types/sihe";
type IncidentDraft = {
  type: IncidentType;
  description: string;
  suggestedStatus: ResourceStatus | "";
};
export function ReportIncidentPage() {
  const { id = "" } = useParams();
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const draftKey = id ? `incidencia:${id}` : "incidencia";
  const [resourceName, setResourceName] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [type, setType] = useState<IncidentType>(
    () => loadFormDraft<IncidentDraft>(user?.id, draftKey)?.type || "dano",
  );
  const [description, setDescription] = useState(() => {
    const draft = loadFormDraft<IncidentDraft>(user?.id, draftKey);
    return typeof draft?.description === "string" ? draft.description : "";
  });
  const [suggestedStatus, setSuggestedStatus] = useState<ResourceStatus | "">(
    () => loadFormDraft<IncidentDraft>(user?.id, draftKey)?.suggestedStatus ?? "",
  );
  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dirty, setDirty] = useState(() => {
    const draft = loadFormDraft<IncidentDraft>(user?.id, draftKey);
    return Boolean(
      draft?.description ||
        draft?.suggestedStatus ||
        (draft?.type && draft.type !== "dano"),
    );
  });
  const [allowLeave, setAllowLeave] = useState(false);
  const draftIdentity = `${user?.id ?? ""}:${draftKey}`;
  const [loadedDraftId, setLoadedDraftId] = useState(draftIdentity);
  useUnsavedChanges(dirty && !allowLeave && !saving);
  // Si cambia el usuario o el recurso, se recupera el borrador guardado.
  if (loadedDraftId !== draftIdentity) {
    setLoadedDraftId(draftIdentity);
    const draft = loadFormDraft<IncidentDraft>(user?.id, draftKey);
    if (draft) {
      if (draft.type) setType(draft.type);
      if (typeof draft.description === "string") setDescription(draft.description);
      if (draft.suggestedStatus !== undefined) {
        setSuggestedStatus(draft.suggestedStatus);
      }
      if (
        draft.description ||
        draft.suggestedStatus ||
        (draft.type && draft.type !== "dano")
      ) {
        setDirty(true);
      }
    }
  }
  function markDirty() {
    setDirty(true);
  }
  useEffect(() => {
    if (allowLeave) return;
    saveFormDraft(user?.id, draftKey, {
      type,
      description,
      suggestedStatus,
    });
  }, [user?.id, draftKey, allowLeave, type, description, suggestedStatus]);
  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    void fetchResourceDetail(id)
      .then((resource) => {
        if (cancelled) return;
        setResourceName(resource.name);
        setResourceType(typeLabel(resource.type));
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(toUserMessage(err, "Error al cargar"));
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
      setAllowLeave(true);
      setDirty(false);
      clearFormDraft(user?.id, draftKey);
      showToast("Incidencia enviada");
      navigate(`/recursos/${id}`);
    } catch (err: unknown) {
      setError(toUserMessage(err, "No se pudo enviar"));
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="page-panel">
        <Spinner />
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
            onChange={(e) => {
              markDirty();
              setType(e.target.value as IncidentType);
            }}
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
            onChange={(e) => {
              markDirty();
              setDescription(e.target.value);
            }}
            required
            placeholder="Qué se observó en campo"
          />
        </label>

        <label className="field">
          <span>Estado sugerido (opcional)</span>
          <select
            value={suggestedStatus}
            onChange={(e) => {
              markDirty();
              setSuggestedStatus(e.target.value as ResourceStatus | "");
            }}
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
            onChange={(e) => {
              markDirty();
              setPhoto(e.target.files?.[0] ?? null);
            }}
          />
        </label>

        {error ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : null}

        <div className="form-actions">
          <button type="submit" className="btn-primary btn-inline" disabled={saving}>
            {saving ? "Guardando…" : "Enviar reporte"}
          </button>
          <Link to={`/recursos/${id}`} className="btn-secondary">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}

