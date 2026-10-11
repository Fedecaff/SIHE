import { useMemo } from "react";
import {
  CircleMarker,
  LayerGroup,
  Popup,
  TileLayer,
  WMSTileLayer,
} from "react-leaflet";
import {
  BASE_LAYER_ESRI_SAT,
  BASE_LAYER_ESRI_TOPO,
  BASE_LAYER_IGN,
  BASE_LAYER_OPENTOPO,
  BASE_LAYER_OSM,
  ESRI_IMAGERY_ATTRIBUTION,
  ESRI_IMAGERY_MAX_NATIVE_ZOOM,
  ESRI_IMAGERY_MAX_ZOOM,
  ESRI_IMAGERY_TILE_URL,
  ESRI_TOPO_ATTRIBUTION,
  ESRI_TOPO_MAX_ZOOM,
  ESRI_TOPO_TILE_URL,
  FIRMS_ATTRIBUTION,
  FIRMS_COLOR_STROKE,
  FIRMS_DISCLAIMER,
  FIRMS_MARKER_FILL_OPACITY,
  FIRMS_MARKER_RADIUS,
  GIBS_ATTRIBUTION,
  GIBS_MAX_ZOOM,
  GIBS_MODIS_721,
  GIBS_NATIVE_ZOOM,
  GIBS_VIIRS_M11,
  GIBS_WMS_LAYERS,
  GIBS_WMS_URL,
  GIBS_WMS_VERSION,
  GIBS_WMTS_BASE,
  IGN_ATTRIBUTION,
  IGN_TOPO_MAX_ZOOM,
  IGN_TOPO_TILE_URL,
  OPENTOPO_ATTRIBUTION,
  OPENTOPO_MAX_ZOOM,
  OPENTOPO_SUBDOMAINS,
  OPENTOPO_TILE_URL,
  OSM_ATTRIBUTION,
  OSM_MAX_ZOOM,
  OSM_TILE_URL,
  OVERLAY_FIRMS,
  OVERLAY_MODIS,
  OVERLAY_VIIRS,
  OVERLAY_WMS,
} from "@/lib/mapConstants";
import { formatAcqUtcToLocal } from "@/lib/fireDates";
import {
  confidenceColor,
  sourceLabel,
  type FirmsHotspot,
} from "@/lib/firmsHotspots";

type Props = {
  baseLayer: string;
  overlays: string[];
  date: string;
  opacity: number;
  hotspots: FirmsHotspot[];
  onTileError: (name: string) => void;
};

function gibsUrl(layerId: string, date: string): string {
  return `${GIBS_WMTS_BASE}/${layerId}/default/${date}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`;
}

export function ControlledMapLayers({
  baseLayer,
  overlays,
  date,
  opacity,
  hotspots,
  onTileError,
}: Props) {
  const wmsParams = useMemo(
    () => ({
      layers: GIBS_WMS_LAYERS,
      format: "image/png",
      transparent: true,
      time: date,
    }),
    [date],
  );

  return (
    <>
      {baseLayer === BASE_LAYER_ESRI_SAT ? (
        <TileLayer
          key={BASE_LAYER_ESRI_SAT}
          attribution={ESRI_IMAGERY_ATTRIBUTION}
          url={ESRI_IMAGERY_TILE_URL}
          maxZoom={ESRI_IMAGERY_MAX_ZOOM}
          maxNativeZoom={ESRI_IMAGERY_MAX_NATIVE_ZOOM}
          eventHandlers={{ tileerror: () => onTileError(BASE_LAYER_ESRI_SAT) }}
        />
      ) : null}
      {baseLayer === BASE_LAYER_IGN ? (
        <TileLayer
          key={BASE_LAYER_IGN}
          attribution={IGN_ATTRIBUTION}
          url={IGN_TOPO_TILE_URL}
          maxZoom={IGN_TOPO_MAX_ZOOM}
          eventHandlers={{ tileerror: () => onTileError(BASE_LAYER_IGN) }}
        />
      ) : null}
      {baseLayer === BASE_LAYER_ESRI_TOPO ? (
        <TileLayer
          key={BASE_LAYER_ESRI_TOPO}
          attribution={ESRI_TOPO_ATTRIBUTION}
          url={ESRI_TOPO_TILE_URL}
          maxZoom={ESRI_TOPO_MAX_ZOOM}
          eventHandlers={{ tileerror: () => onTileError(BASE_LAYER_ESRI_TOPO) }}
        />
      ) : null}
      {baseLayer === BASE_LAYER_OPENTOPO ? (
        <TileLayer
          key={BASE_LAYER_OPENTOPO}
          attribution={OPENTOPO_ATTRIBUTION}
          url={OPENTOPO_TILE_URL}
          subdomains={OPENTOPO_SUBDOMAINS}
          maxZoom={OPENTOPO_MAX_ZOOM}
          eventHandlers={{ tileerror: () => onTileError(BASE_LAYER_OPENTOPO) }}
        />
      ) : null}
      {baseLayer === BASE_LAYER_OSM ||
      (baseLayer !== BASE_LAYER_ESRI_SAT &&
        baseLayer !== BASE_LAYER_IGN &&
        baseLayer !== BASE_LAYER_ESRI_TOPO &&
        baseLayer !== BASE_LAYER_OPENTOPO) ? (
        <TileLayer
          key={BASE_LAYER_OSM}
          attribution={OSM_ATTRIBUTION}
          url={OSM_TILE_URL}
          maxZoom={OSM_MAX_ZOOM}
          eventHandlers={{ tileerror: () => onTileError(BASE_LAYER_OSM) }}
        />
      ) : null}

      {overlays.includes(OVERLAY_MODIS) ? (
        <TileLayer
          key={OVERLAY_MODIS}
          url={gibsUrl(GIBS_MODIS_721, date)}
          attribution={GIBS_ATTRIBUTION}
          maxNativeZoom={GIBS_NATIVE_ZOOM}
          maxZoom={GIBS_MAX_ZOOM}
          opacity={opacity}
          eventHandlers={{ tileerror: () => onTileError(OVERLAY_MODIS) }}
        />
      ) : null}
      {overlays.includes(OVERLAY_VIIRS) ? (
        <TileLayer
          key={OVERLAY_VIIRS}
          url={gibsUrl(GIBS_VIIRS_M11, date)}
          attribution={GIBS_ATTRIBUTION}
          maxNativeZoom={GIBS_NATIVE_ZOOM}
          maxZoom={GIBS_MAX_ZOOM}
          opacity={opacity === 1 ? 0.9 : opacity}
          eventHandlers={{ tileerror: () => onTileError(OVERLAY_VIIRS) }}
        />
      ) : null}
      {overlays.includes(OVERLAY_WMS) ? (
        <WMSTileLayer
          key={OVERLAY_WMS}
          url={GIBS_WMS_URL}
          version={GIBS_WMS_VERSION}
          params={wmsParams}
          attribution={GIBS_ATTRIBUTION}
          opacity={0.9}
          eventHandlers={{ tileerror: () => onTileError(OVERLAY_WMS) }}
        />
      ) : null}
      {overlays.includes(OVERLAY_FIRMS) ? (
        <LayerGroup key={OVERLAY_FIRMS} attribution={FIRMS_ATTRIBUTION}>
          {hotspots.map((point) => (
            <FirmsMarker key={markerKey(point)} point={point} />
          ))}
        </LayerGroup>
      ) : null}
    </>
  );
}

function markerKey(point: FirmsHotspot): string {
  return `${point.lat}|${point.lng}|${point.acqDate}|${point.acqTime}|${point.satellite}|${point.source}`;
}

function FirmsMarker({ point }: { point: FirmsHotspot }) {
  const when = formatAcqUtcToLocal(point.acqDate, point.acqTime);
  const dayNight =
    point.dayNight === "D" ? "Día" : point.dayNight === "N" ? "Noche" : "—";
  return (
    <CircleMarker
      center={[point.lat, point.lng]}
      radius={FIRMS_MARKER_RADIUS}
      pane="firms"
      pathOptions={{
        color: FIRMS_COLOR_STROKE,
        weight: 1,
        fillColor: confidenceColor(point.confidence),
        fillOpacity: FIRMS_MARKER_FILL_OPACITY,
      }}
    >
      <Popup>
        <strong>{sourceLabel(point.source)}</strong>
        <br />
        Satélite: {point.satellite || "—"}
        <br />
        {when.utc}
        <br />
        {when.local}
        <br />
        Confianza: {point.confidence}
        <br />
        FRP: {point.frp == null ? "—" : `${point.frp} MW`}
        <br />
        Brillo: {point.brightnessK == null ? "—" : `${point.brightnessK} K`}
        <br />
        {dayNight}
        <br />
        {point.lat.toFixed(3)}, {point.lng.toFixed(3)}
        <br />
        <span className="map-popup-address">{FIRMS_DISCLAIMER}</span>
      </Popup>
    </CircleMarker>
  );
}
