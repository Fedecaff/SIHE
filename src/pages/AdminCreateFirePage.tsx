import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { CATAMARCA_CENTER, MAP_DEFAULT_ZOOM } from "@/lib/mapConstants";
import { formatMapCoords } from "@/services/geocode";
import {
  createFireEventAdmin,
  type FireEventType,
} from "@/services/fires";

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
      onPick(e.latlng.lat, e.latlng.lng);
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
  const [eventType, setEventType] =
    useState<FireEventType>("incendio_forestal");
  const [occurredAt, setOccurredAt] = useState(() =>
    toLocalInputValue(new Date()),
  );
  const [description, setDescription] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      navigate(`/incendios/${id}`);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "No se pudo registrar el incendio",
      );
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
        <Link to="/admin" className="btn-toolbar">
          Cancelar
        </Link>
      </div>

      <form className="form-card" onSubmit={(e) => void onSubmit(e)}>
        <div className="form-row">
          <label className="field">
            <span>Tipo</span>
            <select
              value={eventType}
              onChange={(e) =>
                setEventType(e.target.value as FireEventType)
              }
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
              onChange={(e) => setOccurredAt(e.target.value)}
              required
            />
          </label>
        </div>

        <label className="field">
          <span>Nota (opcional)</span>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            placeholder="Barrio, causa, o lo que sirva para el parte"
          />
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
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ClickPicker
              onPick={(pickLat, pickLng) => {
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
