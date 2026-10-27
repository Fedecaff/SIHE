import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { useAuth } from "@/app/useAuth";
import { useToast } from "@/app/useToast";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";
import { toUserMessage } from "@/lib/errorMessages";
import {
  clearFormDraft,
  loadFormDraft,
  saveFormDraft,
} from "@/lib/formDraft";
import { CATAMARCA_CENTER, MAP_DEFAULT_ZOOM } from "@/lib/mapConstants";
import { formatMapCoords } from "@/services/geocode";
import {
  createFireEventAdmin,
  type FireEventType,
} from "@/services/fires";

const FIRE_DRAFT = "incendio-nuevo";

type FireDraft = {
  eventType: FireEventType;
  occurredAt: string;
  description: string;
  lat: number | null;
  lng: number | null;
};

const pinIcon = L.divIcon({
  className: "address-marker",
  html: '<span class="address-marker-dot"></span>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

function ClickPicker({
  onPick,
}: {
  onPick: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      const p = e.latlng.wrap();
      onPick(p.lat, p.lng);
    },
  });
  return null;
}

function toLocalInputValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function AdminCreateFirePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [eventType, setEventType] = useState<FireEventType>(
    () => loadFormDraft<FireDraft>(user?.id, FIRE_DRAFT)?.eventType || "incendio_forestal",
  );
  const [occurredAt, setOccurredAt] = useState(
    () =>
      loadFormDraft<FireDraft>(user?.id, FIRE_DRAFT)?.occurredAt ||
      toLocalInputValue(new Date()),
  );
  const [description, setDescription] = useState(() => {
    const draft = loadFormDraft<FireDraft>(user?.id, FIRE_DRAFT);
    return typeof draft?.description === "string" ? draft.description : "";
  });
  const [lat, setLat] = useState<number | null>(() => {
    const draft = loadFormDraft<FireDraft>(user?.id, FIRE_DRAFT);
    return typeof draft?.lat === "number" ? draft.lat : null;
  });
  const [lng, setLng] = useState<number | null>(() => {
    const draft = loadFormDraft<FireDraft>(user?.id, FIRE_DRAFT);
    return typeof draft?.lng === "number" ? draft.lng : null;
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dirty, setDirty] = useState(() => {
    const draft = loadFormDraft<FireDraft>(user?.id, FIRE_DRAFT);
    return Boolean(
      draft?.description ||
        draft?.lat != null ||
        (draft?.eventType && draft.eventType !== "incendio_forestal"),
    );
  });
  const [allowLeave, setAllowLeave] = useState(false);
  const [loadedUserId, setLoadedUserId] = useState(user?.id);

  useUnsavedChanges(dirty && !allowLeave && !saving);

  // Si cambia la sesión, se recupera el borrador de ese usuario.
  if (loadedUserId !== user?.id) {
    setLoadedUserId(user?.id);
    const draft = loadFormDraft<FireDraft>(user?.id, FIRE_DRAFT);
    if (draft) {
      if (draft.eventType) setEventType(draft.eventType);
      if (draft.occurredAt) setOccurredAt(draft.occurredAt);
      if (typeof draft.description === "string") setDescription(draft.description);
      if (typeof draft.lat === "number") setLat(draft.lat);
      if (typeof draft.lng === "number") setLng(draft.lng);
      if (
        draft.description ||
        draft.lat != null ||
        (draft.eventType && draft.eventType !== "incendio_forestal")
      ) {
        setDirty(true);
      }
    }
  }

  useEffect(() => {
    if (allowLeave) return;
    saveFormDraft(user?.id, FIRE_DRAFT, {
      eventType,
      occurredAt,
      description,
      lat,
      lng,
    });
  }, [user?.id, allowLeave, eventType, occurredAt, description, lat, lng]);

  function markDirty() {
    setDirty(true);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (lat == null || lng == null) {
      setError("Marcá en el mapa dónde fue el incendio.");
      return;
    }

    const when = new Date(occurredAt);
    if (Number.isNaN(when.getTime())) {
      setError("Revisá la fecha y la hora.");
      return;
    }
    if (when > new Date()) {
      setError("La fecha y hora no pueden ser futuras");
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const id = await createFireEventAdmin({
        eventType,
        occurredAt: when.toISOString(),
        lat,
        lng,
        description,
      });
      setAllowLeave(true);
      setDirty(false);
      clearFormDraft(user?.id, FIRE_DRAFT);
      showToast("Incendio registrado");
      navigate(`/incendios/${id}`);
    } catch (err: unknown) {
      setError(toUserMessage(err, "No se pudo registrar el incendio"));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="admin-page admin-create">
      <div className="list-header" style={{ paddingLeft: 0, paddingRight: 0 }}>
        <div>
          <h1>Registrar incendio</h1>
          <p className="list-subtitle">
            Después de la intervención, marcá el lugar y la fecha. Ese punto
            entra al mapa de calor.
          </p>
        </div>
        <Link to="/admin" className="btn-secondary">
          Cancelar
        </Link>
      </div>

      <form className="form-card" onSubmit={(e) => void onSubmit(e)}>
        <div className="form-row">
          <label className="field">
            <span>Tipo</span>
            <select
              value={eventType}
              onChange={(e) => {
                markDirty();
                setEventType(e.target.value as FireEventType);
              }}
            >
              <option value="incendio_forestal">Incendio forestal</option>
              <option value="incendio_urbano">Incendio urbano</option>
            </select>
          </label>

          <label className="field">
            <span>Fecha y hora</span>
            <input
              type="datetime-local"
              value={occurredAt}
              max={toLocalInputValue(new Date())}
              onChange={(e) => {
                markDirty();
                setOccurredAt(e.target.value);
              }}
              required
            />
          </label>
        </div>

        <label className="field">
          <span>Nota (opcional)</span>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => {
              markDirty();
              setDescription(e.target.value);
            }}
            maxLength={500}
            placeholder="Barrio, causa, o lo que sirva para el parte"
          />
          <span className="form-hint">{description.length}/500</span>
        </label>

        <p className="form-hint">
          Ubicación:{" "}
          {lat != null && lng != null
            ? formatMapCoords(lat, lng)
            : "hacé clic en el mapa"}
        </p>

        <div className="create-map">
          <MapContainer
            center={[CATAMARCA_CENTER.lat, CATAMARCA_CENTER.lng]}
            zoom={MAP_DEFAULT_ZOOM}
            className="create-map-canvas"
            scrollWheelZoom
            worldCopyJump={false}
            maxBounds={[
              [-28.7, -66.05],
              [-28.25, -65.5],
            ]}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ClickPicker
              onPick={(pickLat, pickLng) => {
                markDirty();
                setLat(pickLat);
                setLng(pickLng);
                setError(null);
              }}
            />
            {lat != null && lng != null ? (
              <Marker position={[lat, lng]} icon={pinIcon} />
            ) : null}
          </MapContainer>
        </div>

        {error ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : null}

        <div className="form-actions">
          <button
            type="submit"
            className="btn-primary btn-inline"
            disabled={saving}
          >
            {saving ? "Guardando…" : "Guardar incendio"}
          </button>
        </div>
      </form>
    </div>
  );
}
