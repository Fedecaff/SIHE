import { useMemo } from "react";
import { CircleMarker, LayerGroup, LayersControl, Popup, TileLayer, WMSTileLayer } from "react-leaflet";
import {
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
  activeOverlays: string[];
  date: string;
  opacity: number;
  hotspots: FirmsHotspot[];
  onTileError: (name: string) => void;
};

function gibsUrl(layerId: string, date: string): string {
  return `${GIBS_WMTS_BASE}/${layerId}/default/${date}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg`;
}

export function FireLayers({
  activeOverlays,
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
      <LayersControl.Overlay
        checked={activeOverlays.includes(OVERLAY_MODIS)}
        name={OVERLAY_MODIS}
      >
        <TileLayer
          url={gibsUrl(GIBS_MODIS_721, date)}
          attribution={GIBS_ATTRIBUTION}
          maxNativeZoom={GIBS_NATIVE_ZOOM}
          maxZoom={GIBS_MAX_ZOOM}
          opacity={opacity}
          eventHandlers={{ tileerror: () => onTileError(OVERLAY_MODIS) }}
        />
      </LayersControl.Overlay>
      <LayersControl.Overlay
        checked={activeOverlays.includes(OVERLAY_VIIRS)}
        name={OVERLAY_VIIRS}
      >
        <TileLayer
          url={gibsUrl(GIBS_VIIRS_M11, date)}
          attribution={GIBS_ATTRIBUTION}
          maxNativeZoom={GIBS_NATIVE_ZOOM}
          maxZoom={GIBS_MAX_ZOOM}
          opacity={opacity === 1 ? 0.9 : opacity}
          eventHandlers={{ tileerror: () => onTileError(OVERLAY_VIIRS) }}
        />
      </LayersControl.Overlay>
      <LayersControl.Overlay
        checked={activeOverlays.includes(OVERLAY_WMS)}
        name={OVERLAY_WMS}
      >
        <WMSTileLayer
          url={GIBS_WMS_URL}
          version={GIBS_WMS_VERSION}
          params={wmsParams}
          attribution={GIBS_ATTRIBUTION}
          opacity={0.9}
          eventHandlers={{ tileerror: () => onTileError(OVERLAY_WMS) }}
        />
      </LayersControl.Overlay>
      <LayersControl.Overlay
        checked={activeOverlays.includes(OVERLAY_FIRMS)}
        name={OVERLAY_FIRMS}
      >
        <LayerGroup attribution={FIRMS_ATTRIBUTION}>
          {hotspots.map((point) => (
            <FirmsMarker key={markerKey(point)} point={point} />
          ))}
        </LayerGroup>
      </LayersControl.Overlay>
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
