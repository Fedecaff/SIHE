import { useEffect } from "react";
import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import type { ResourceMapItem } from "@/types/sihe";
import { CATAMARCA_CENTER, MAP_DEFAULT_ZOOM } from "@/lib/mapConstants";
import { statusColor, statusLabel, typeLabel } from "@/lib/resourceLabels";

type Props = {
  items: ResourceMapItem[];
  locateToken: number;
};

function LocateControl({ token }: { token: number }) {
  const map = useMap();

  useEffect(() => {
    if (token === 0) return;
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        map.setView([pos.coords.latitude, pos.coords.longitude], 15);
      },
      () => undefined,
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, [token, map]);

  return null;
}

export function MapView({ items, locateToken }: Props) {
  return (
    <MapContainer
      center={[CATAMARCA_CENTER.lat, CATAMARCA_CENTER.lng]}
      zoom={MAP_DEFAULT_ZOOM}
      className="map-canvas"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocateControl token={locateToken} />
      {items.map((item) => (
        <CircleMarker
          key={item.id}
          center={[item.lat, item.lng]}
          radius={9}
          pathOptions={{
            color: "#1a1a1a",
            weight: 1,
            fillColor: statusColor(item.status),
            fillOpacity: 0.9,
          }}
        >
          <Popup>
            <strong>{item.name}</strong>
            <br />
            {typeLabel(item.type)} · {statusLabel(item.status)}
            <br />
            <span className="map-popup-address">{item.address}</span>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
