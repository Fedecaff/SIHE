import { useEffect } from "react";
import { Marker, Polyline, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import type { LatLng } from "@/lib/userLocation";
import { typeLabel } from "@/lib/resourceLabels";
import type { RouteTarget } from "@/services/routing";

const originIcon = L.divIcon({
  className: "route-origin-marker",
  html: '<span class="route-origin-dot"></span>',
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

const destIcon = L.divIcon({
  className: "route-dest-marker",
  html: '<span class="route-dest-dot"></span>',
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

function destinationCaption(target: RouteTarget): string {
  if (target.kind === "recurso" && target.tipoRecurso) {
    return `${typeLabel(target.tipoRecurso)} · ${target.label}`;
  }
  return target.label;
}

function FitRoute({ points }: { points: LatLng[] }) {
  const map = useMap();

  useEffect(() => {
    if (points.length < 2) return;
    const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 16 });
  }, [map, points]);

  return null;
}

function OriginPicker({
  enabled,
  onPick,
}: {
  enabled: boolean;
  onPick: (point: LatLng) => void;
}) {
  useMapEvents({
    click(e) {
      if (!enabled) return;
      onPick({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

type Props = {
  geometry: LatLng[];
  origin: LatLng | null;
  destination: RouteTarget | null;
  pickingOrigin: boolean;
  onPickOrigin: (point: LatLng) => void;
};

export function RouteLayer({
  geometry,
  origin,
  destination,
  pickingOrigin,
  onPickOrigin,
}: Props) {
  return (
    <>
      <OriginPicker enabled={pickingOrigin} onPick={onPickOrigin} />
      {geometry.length > 1 ? (
        <>
          <Polyline
            positions={geometry.map((p) => [p.lat, p.lng])}
            pathOptions={{ color: "#1d4ed8", weight: 5, opacity: 0.9 }}
          />
          <FitRoute points={geometry} />
        </>
      ) : null}
      {origin ? (
        <Marker position={[origin.lat, origin.lng]} icon={originIcon}>
          <Popup>Origen</Popup>
        </Marker>
      ) : null}
      {destination ? (
        <Marker
          position={[destination.lat, destination.lng]}
          icon={destIcon}
        >
          <Popup>{destinationCaption(destination)}</Popup>
        </Marker>
      ) : null}
    </>
  );
}
