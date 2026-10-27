import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Link2, Map } from "lucide-react";
import { CircleMarker, MapContainer } from "react-leaflet";
import { ControlledMapLayers } from "@/components/map/ControlledMapLayers";
import { Spinner } from "@/components/ui/Spinner";
import { toUserMessage } from "@/lib/errorMessages";
import { formatDateTime } from "@/lib/incidentLabels";
import { BASE_LAYER_OSM } from "@/lib/mapConstants";
import { formatMapCoords } from "@/services/geocode";
import {
  fireTypeLabel,
  fetchFireEventById,
  isFireEventId,
} from "@/services/fires";
import type { FireEventMapItem } from "@/services/fires";

export function FireDetailPage() {
  const { id = "" } = useParams();
  return <FireDetail key={id} />;
}

function FireDetail() {
  const { id = "" } = useParams();
  const idValid = isFireEventId(id);
  const [item, setItem] = useState<FireEventMapItem | null>(null);
  const [error, setError] = useState<string | null>(
    idValid ? null : "Evento no encontrado",
  );
  const [loading, setLoading] = useState(idValid);

  useEffect(() => {
    if (!idValid) return;
    let cancelled = false;
    void fetchFireEventById(id)
      .then((found) => {
        if (cancelled) return;
        setItem(found);
        if (!found) setError("Evento no encontrado");
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
  }, [id, idValid]);

  if (loading) {
    return (
      <div className="page-panel">
        <Spinner />
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="page-panel">
        <p className="form-error" role="alert">
          {error ?? "No encontrado"}
        </p>
        <Link to="/mapa" className="btn-toolbar detail-icon-link">
          <ArrowLeft size={16} strokeWidth={2.5} aria-hidden="true" />
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
            <dt>Nota</dt>
            <dd>{item.description || "—"}</dd>
          </div>
        </dl>
      </section>
      <section className="detail-card">
        <h2>Ubicación</h2>
        <FireLocationMap lat={item.lat} lng={item.lng} />
        <dl className="detail-grid">
          <div>
            <dt>Coordenadas</dt>
            <dd>{formatMapCoords(item.lat, item.lng)}</dd>
          </div>
        </dl>
      </section>
      <div className="detail-actions">
        <Link to={`/mapa?fire=${item.id}`} className="btn-toolbar detail-icon-link">
          <Map size={16} strokeWidth={2.5} aria-hidden="true" />
          Ver en mapa
        </Link>
        {item.linked_resource_id ? (
          <Link
            to={`/recursos/${item.linked_resource_id}`}
            className="btn-toolbar detail-icon-link"
          >
            <Link2 size={16} strokeWidth={2.5} aria-hidden="true" />
            Recurso vinculado
          </Link>
        ) : null}
      </div>
      <p className="detail-back">
        <Link to="/mapa" className="detail-icon-link">
          <ArrowLeft size={16} strokeWidth={2.5} aria-hidden="true" />
          Volver al mapa
        </Link>
      </p>
    </div>
  );
}

function FireLocationMap({ lat, lng }: { lat: number; lng: number }) {
  return (
    <div className="create-map" role="region" aria-label="Mapa del incendio">
      <MapContainer
        center={[lat, lng]}
        zoom={16}
        className="create-map-canvas"
        dragging={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        touchZoom={false}
        boxZoom={false}
        keyboard={false}
        zoomControl={false}
      >
        <ControlledMapLayers
          baseLayer={BASE_LAYER_OSM}
          overlays={[]}
          date=""
          opacity={1}
          hotspots={[]}
          onTileError={() => undefined}
        />
        <CircleMarker
          center={[lat, lng]}
          radius={7}
          pathOptions={{
            color: "#7c2d12",
            weight: 1,
            fillColor: "#f97316",
            fillOpacity: 0.95,
          }}
        />
      </MapContainer>
    </div>
  );
}

