import { useEffect } from "react";
import { Marker, Polyline, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import type { LatLng } from "@/lib/userLocation";
import { typeLabel } from "@/lib/resourceLabels";
import { createSvgIcon } from "@/lib/mapIcons";
import type { RouteTarget } from "@/services/routing";

const originIcon = L.divIcon({
  className: "route-origin-marker",
  html: `<div class="map-icon-circle map-icon-origin">${createSvgIcon("Circle", 16, 3)}</div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const destIcon = L.divIcon({
  className: "route-dest-marker",
  html: `<div class="map-icon-pin map-icon-dest">${createSvgIcon("Flag", 18, 2.5)}</div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});

function destinationCaption(target: RouteTarget): string {
  if (target.kind === "recurso" && target.tipoRecurso) {
    return `${typeLabel(target.tipoRecurso)} · ${target.label}`;
  }
  return target.label;
}

function FitRoute({
  points,
  padding,
}: {
  points: LatLng[];
  padding: { top: number; right: number; bottom: number; left: number };
}) {
  const map = useMap();
  const top = padding.top;
  const right = padding.right;
  const bottom = padding.bottom;
  const left = padding.left;

  useEffect(() => {
    if (points.length < 2) return;
    const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]));
    map.fitBounds(bounds, {
      paddingTopLeft: [left, top],
      paddingBottomRight: [right, bottom],
      maxZoom: 16,
    });
  }, [map, points, top, right, bottom, left]);

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

function DestinationPicker({
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
  markedPoint: LatLng | null;
  pickingOrigin: boolean;
  onPickOrigin: (point: LatLng) => void;
  pickingDestination: boolean;
  onPickDestination: (point: LatLng) => void;
  viewPadding?: { top: number; right: number; bottom: number; left: number };
};

export function RouteLayer({
  geometry,
  origin,
  destination,
  markedPoint,
  pickingOrigin,
  onPickOrigin,
  pickingDestination,
  onPickDestination,
  viewPadding = { top: 48, right: 48, bottom: 48, left: 48 },
}: Props) {
  return (
    <>
      <OriginPicker enabled={pickingOrigin} onPick={onPickOrigin} />
      <DestinationPicker enabled={pickingDestination} onPick={onPickDestination} />
      {geometry.length > 1 ? (
        <>
          <Polyline
            positions={geometry.map((p) => [p.lat, p.lng])}
            pathOptions={{ color: "#1d4ed8", weight: 5, opacity: 0.9 }}
          />
          <FitRoute points={geometry} padding={viewPadding} />
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
      ) : markedPoint ? (
        <Marker position={[markedPoint.lat, markedPoint.lng]} icon={destIcon}>
          <Popup>
            {markedPoint.lat.toFixed(5)}, {markedPoint.lng.toFixed(5)}
          </Popup>
        </Marker>
      ) : null}
    </>
  );
}
