import { useEffect } from "react";

import { Link } from "react-router-dom";

import {

  Circle,

  CircleMarker,

  MapContainer,

  Marker,

  Popup,

  TileLayer,

  useMap,

} from "react-leaflet";

import L from "leaflet";

import type { ResourceMapItem } from "@/types/sihe";

import { CATAMARCA_CENTER, MAP_DEFAULT_ZOOM } from "@/lib/mapConstants";
import { resourceMapIcon } from "@/lib/mapIcons";
import { getBrowserLocation } from "@/lib/userLocation";
import type { LatLng } from "@/lib/userLocation";
import type { RouteTarget } from "@/services/routing";
import { RouteLayer } from "@/components/map/RouteLayer";

import { statusLabel, typeLabel } from "@/lib/resourceLabels";

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

}: {

  items: ResourceMapItem[];

  focusId?: string | null;

  focusToken?: number;

}) {

  const map = useMap();



  useEffect(() => {

    if (!focusId) return;

    const item = items.find((r) => r.id === focusId);

    if (!item) return;

    map.setView([item.lat, item.lng], 17);

  }, [focusId, focusToken, items, map]);



  return null;

}



function AddressFlyControl({ target }: { target?: FlyToTarget | null }) {

  const map = useMap();



  useEffect(() => {

    if (!target) return;

    map.setView([target.lat, target.lng], 17);

  }, [target, map]);



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

  onRouteToAddress,

  onRouteToResource,

}: Props) {

  return (

    <MapContainer

      center={[CATAMARCA_CENTER.lat, CATAMARCA_CENTER.lng]}

      zoom={MAP_DEFAULT_ZOOM}

      className={pickingOrigin ? "map-canvas is-picking-origin" : "map-canvas"}

      scrollWheelZoom

    >

      <TileLayer

        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'

        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

      />

      <LocateControl

        token={locateToken}

        onUserLocation={onUserLocation}

        onLocateError={onLocateError}

      />

      <HomeControl token={homeToken} />

      <FocusControl items={items} focusId={focusId} focusToken={focusToken} />

      <AddressFlyControl target={addressTarget} />

      <FireFocusControl fires={fireEvents} focusFireId={focusFireId} />

      <RouteLayer

        geometry={routeGeometry}

        origin={routeOrigin}

        destination={routeDestination}

        pickingOrigin={pickingOrigin}

        onPickOrigin={onPickOrigin ?? (() => undefined)}

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

        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>

          <Popup>Tu ubicación</Popup>

        </Marker>

      ) : null}



      {addressTarget ? (

        <Marker

          position={[addressTarget.lat, addressTarget.lng]}

          icon={addressIcon}

        >

          <Popup>
            <strong>{addressLabel || "Dirección buscada"}</strong>
            {onRouteToAddress ? (
              <>
                <br />
                <button
                  type="button"
                  className="map-popup-link map-popup-button"
                  onClick={onRouteToAddress}
                >
                  Cómo llegar
                </button>
              </>
            ) : null}
          </Popup>

        </Marker>

      ) : null}



      {items.map((item) => (
        <Marker
          key={item.id}
          position={[item.lat, item.lng]}
          icon={resourceMapIcon(item.type, item.status)}
          eventHandlers={{
            click: () => onSelectResource?.(item),
          }}
        >
          <Popup>
            <strong>{item.name}</strong>
            <br />
            {typeLabel(item.type)} · {statusLabel(item.status)}
            <br />
            <span className="map-popup-address">{item.address}</span>
            <br />
            <Link to={`/recursos/${item.id}`} className="map-popup-link">
              Ver ficha
            </Link>
            {onRouteToResource ? (
              <>
                <br />
                <button
                  type="button"
                  className="map-popup-link map-popup-button"
                  onClick={() => onRouteToResource(item)}
                >
                  Cómo llegar
                </button>
              </>
            ) : null}
          </Popup>
        </Marker>
      ))}

    </MapContainer>

  );

}


