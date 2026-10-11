import { useEffect, useLayoutEffect, useState } from "react";

import { Link } from "react-router-dom";

import {

  Circle,

  CircleMarker,

  MapContainer,

  Marker,

  Popup,

  LayersControl,

  useMap,

  useMapEvents,

} from "react-leaflet";

import L from "leaflet";

import type { ResourceMapItem } from "@/types/sihe";

import { CATAMARCA_CENTER, MAP_DEFAULT_ZOOM } from "@/lib/mapConstants";
import { resourceMapIcon } from "@/lib/mapIcons";
import { getBrowserLocation } from "@/lib/userLocation";
import type { LatLng } from "@/lib/userLocation";
import type { RouteTarget } from "@/services/routing";
import { RouteLayer } from "@/components/map/RouteLayer";
import { BaseLayers } from "@/components/map/BaseLayers";
import { FireLayers } from "@/components/map/FireLayers";
import type { FirmsHotspot } from "@/lib/firmsHotspots";

import type { FireEventMapItem } from "@/services/fires";

import { fireTypeLabel } from "@/services/fires";

import { formatDateTime } from "@/lib/incidentLabels";



type FlyToTarget = {

  lat: number;

  lng: number;

  token: number;

};



type UserLocation = {

  lat: number;

  lng: number;

};



type Props = {

  items: ResourceMapItem[];

  locateToken: number;

  homeToken?: number;

  focusId?: string | null;

  focusToken?: number;

  addressTarget?: FlyToTarget | null;

  userLocation?: UserLocation | null;

  onUserLocation?: (pos: UserLocation) => void;

  onLocateError?: (message: string) => void;

  onSelectResource?: (item: ResourceMapItem) => void;

  fireEvents?: FireEventMapItem[];

  showFireHeat?: boolean;

  showFirePoints?: boolean;

  focusFireId?: string | null;

  routeGeometry?: LatLng[];

  routeOrigin?: LatLng | null;

  routeDestination?: RouteTarget | null;

  pickingOrigin?: boolean;

  onPickOrigin?: (point: LatLng) => void;

  addressLabel?: string;

  onRouteToAddress?: () => void;

  onRouteToResource?: (item: ResourceMapItem) => void;

  onMapClick?: () => void;

  zoomInToken?: number;

  zoomOutToken?: number;

  viewPadding?: { top: number; right: number; bottom: number; left: number };

  baseLayer?: string;

  overlays?: string[];

  satelliteDate?: string;

  satelliteOpacity?: number;

  firmsHotspots?: FirmsHotspot[];

  onBaseLayerChange?: (name: string) => void;

  onOverlayChange?: (name: string, enabled: boolean) => void;

  onTileError?: (name: string) => void;

};



const addressIcon = L.divIcon({

  className: "address-marker",

  html: '<span class="address-marker-dot"></span>',

  iconSize: [18, 18],

  iconAnchor: [9, 9],

});



const userIcon = L.divIcon({

  className: "user-marker",

  html: '<span class="user-marker-dot"></span>',

  iconSize: [22, 22],

  iconAnchor: [11, 11],

});



function LocateControl({

  token,

  onUserLocation,

  onLocateError,

}: {

  token: number;

  onUserLocation?: (pos: UserLocation) => void;

  onLocateError?: (message: string) => void;

}) {

  const map = useMap();



  useEffect(() => {

    if (token === 0) return;

    let cancelled = false;

    void getBrowserLocation()

      .then((next) => {

        if (cancelled) return;

        onUserLocation?.(next);

        map.setView([next.lat, next.lng], 16);

      })

      .catch((err: unknown) => {

        if (cancelled) return;

        onLocateError?.(

          err instanceof Error ? err.message : "No se pudo obtener tu ubicación.",

        );

      });

    return () => {

      cancelled = true;

    };

  }, [token, map, onUserLocation, onLocateError]);



  return null;

}



function HomeControl({ token }: { token: number }) {

  const map = useMap();

  useEffect(() => {

    if (token === 0) return;

    map.setView([CATAMARCA_CENTER.lat, CATAMARCA_CENTER.lng], MAP_DEFAULT_ZOOM);

  }, [token, map]);

  return null;

}



function FocusControl({

  items,

  focusId,

  focusToken = 0,

  padding,

}: {

  items: ResourceMapItem[];

  focusId?: string | null;

  focusToken?: number;

  padding: ViewPadding;

}) {

  const map = useMap();
  const top = padding.top;
  const right = padding.right;
  const bottom = padding.bottom;
  const left = padding.left;

  useEffect(() => {

    if (!focusId) return;

    const item = items.find((r) => r.id === focusId);

    if (!item) return;

    map.setView([item.lat, item.lng], 17);

    map.panInside([item.lat, item.lng], {
      paddingTopLeft: [left, top],
      paddingBottomRight: [right, bottom],
    });

  }, [focusId, focusToken, items, map, top, right, bottom, left]);



  return null;

}



function AddressFlyControl({
  target,
  padding,
}: {
  target?: FlyToTarget | null;
  padding: ViewPadding;
}) {

  const map = useMap();
  const top = padding.top;
  const right = padding.right;
  const bottom = padding.bottom;
  const left = padding.left;

  useEffect(() => {

    if (!target) return;

    map.setView([target.lat, target.lng], 17);

    map.panInside([target.lat, target.lng], {
      paddingTopLeft: [left, top],
      paddingBottomRight: [right, bottom],
    });

  }, [target, map, top, right, bottom, left]);



  return null;

}



function FireFocusControl({

  fires,

  focusFireId,

}: {

  fires: FireEventMapItem[];

  focusFireId?: string | null;

}) {

  const map = useMap();



  useEffect(() => {

    if (!focusFireId) return;

    const fire = fires.find((f) => f.id === focusFireId);

    if (!fire) return;

    map.setView([fire.lat, fire.lng], 16);

  }, [focusFireId, fires, map]);



  return null;

}



export function MapView({

  items,

  locateToken,

  homeToken = 0,

  focusId,

  focusToken,

  addressTarget,

  userLocation,

  onUserLocation,

  onLocateError,

  onSelectResource,

  fireEvents = [],

  showFireHeat = false,

  showFirePoints = false,

  focusFireId,

  routeGeometry = [],

  routeOrigin = null,

  routeDestination = null,

  pickingOrigin = false,

  onPickOrigin,

  addressLabel,

  baseLayer = "Mapa (OSM)",

  overlays = [],

  satelliteDate = "",

  satelliteOpacity = 1,

  firmsHotspots = [],

  onBaseLayerChange,

  onOverlayChange,

  onTileError,

  onMapClick,

  zoomInToken = 0,

  zoomOutToken = 0,

  viewPadding = { top: 72, right: 80, bottom: 16, left: 16 },

}: Props) {

  const [layersCollapsed, setLayersCollapsed] = useState(() =>
    window.matchMedia("(max-width: 767px)").matches,
  );

  return (

    <MapContainer

      center={[CATAMARCA_CENTER.lat, CATAMARCA_CENTER.lng]}

      zoom={MAP_DEFAULT_ZOOM}

      className={pickingOrigin ? "map-canvas is-picking-origin" : "map-canvas"}

      scrollWheelZoom

      zoomControl={false}

    >

      <MapPanes />

      <LayersControl position="topright" collapsed={layersCollapsed}>

        <BaseLayers
          activeName={baseLayer}
          onTileError={onTileError ?? (() => undefined)}
        />

        <FireLayers
          activeOverlays={overlays}
          date={satelliteDate}
          opacity={satelliteOpacity}
          hotspots={firmsHotspots}
          onTileError={onTileError ?? (() => undefined)}
        />

      </LayersControl>

      <LayerSync
        onBase={onBaseLayerChange}
        onOverlay={onOverlayChange}
        onNarrow={setLayersCollapsed}
      />

      <ZoomBridge zoomInToken={zoomInToken} zoomOutToken={zoomOutToken} />

      <MapClick onMapClick={onMapClick} />

      <LocateControl

        token={locateToken}

        onUserLocation={onUserLocation}

        onLocateError={onLocateError}

      />

      <HomeControl token={homeToken} />

      <FocusControl
        items={items}
        focusId={focusId}
        focusToken={focusToken}
        padding={viewPadding}
      />

      <AddressFlyControl target={addressTarget} padding={viewPadding} />

      <FireFocusControl fires={fireEvents} focusFireId={focusFireId} />

      <RouteLayer

        geometry={routeGeometry}

        origin={routeOrigin}

        destination={routeDestination}

        pickingOrigin={pickingOrigin}

        onPickOrigin={onPickOrigin ?? (() => undefined)}

        viewPadding={viewPadding}

      />



      {showFireHeat

        ? fireEvents.map((fire) => (

            <Circle

              key={`heat-${fire.id}`}

              center={[fire.lat, fire.lng]}

              radius={220}

              pathOptions={{

                stroke: false,

                fillColor: "#ea580c",

                fillOpacity: 0.22,

              }}

            />

          ))

        : null}



      {showFirePoints

        ? fireEvents.map((fire) => (

            <CircleMarker

              key={`fire-${fire.id}`}

              center={[fire.lat, fire.lng]}

              radius={7}

              pathOptions={{

                color: "#7c2d12",

                weight: 1,

                fillColor: "#f97316",

                fillOpacity: 0.95,

              }}

            >

              <Popup>

                <strong>{fireTypeLabel(fire.event_type)}</strong>

                <br />

                {formatDateTime(fire.occurred_at)}

                <br />

                <Link to={`/incendios/${fire.id}`} className="map-popup-link">

                  Ver detalle

                </Link>

              </Popup>

            </CircleMarker>

          ))

        : null}



      {userLocation ? (

        <Marker
          pane="resources"
          position={[userLocation.lat, userLocation.lng]}
          icon={userIcon}
        >

          <Popup>Tu ubicación</Popup>

        </Marker>

      ) : null}



      {addressTarget ? (

        <Marker
          pane="resources"
          position={[addressTarget.lat, addressTarget.lng]}
          icon={addressIcon}
        >

          <Popup>
            <strong>{addressLabel || "Dirección buscada"}</strong>
          </Popup>

        </Marker>

      ) : null}



      {items.map((item) => (
        <Marker
          key={item.id}
          pane="resources"
          position={[item.lat, item.lng]}
          icon={resourceMapIcon(item.type, item.status)}
          eventHandlers={{
            click: () => onSelectResource?.(item),
          }}
        />
      ))}

    </MapContainer>

  );

}

type ViewPadding = { top: number; right: number; bottom: number; left: number };

function ZoomBridge({
  zoomInToken,
  zoomOutToken,
}: {
  zoomInToken: number;
  zoomOutToken: number;
}) {
  const map = useMap();
  useEffect(() => {
    if (zoomInToken === 0) return;
    map.zoomIn();
  }, [zoomInToken, map]);
  useEffect(() => {
    if (zoomOutToken === 0) return;
    map.zoomOut();
  }, [zoomOutToken, map]);
  return null;
}

function MapClick({ onMapClick }: { onMapClick?: () => void }) {
  useMapEvents({
    click() {
      onMapClick?.();
    },
  });
  return null;
}

function MapPanes() {
  const map = useMap();
  useLayoutEffect(() => {
    if (!map.getPane("resources")) {
      const resources = map.createPane("resources");
      resources.style.zIndex = "650";
    }
    if (!map.getPane("firms")) {
      const firms = map.createPane("firms");
      firms.style.zIndex = "450";
    }
  }, [map]);
  return null;
}

function LayerSync({
  onBase,
  onOverlay,
  onNarrow,
}: {
  onBase?: (name: string) => void;
  onOverlay?: (name: string, enabled: boolean) => void;
  onNarrow: (value: boolean) => void;
}) {
  useMapEvents({
    baselayerchange(event) {
      onBase?.(event.name);
    },
    overlayadd(event) {
      onOverlay?.(event.name, true);
    },
    overlayremove(event) {
      onOverlay?.(event.name, false);
    },
  });

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => onNarrow(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [onNarrow]);

  return null;
}


