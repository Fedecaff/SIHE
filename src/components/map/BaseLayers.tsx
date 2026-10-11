import { LayersControl, TileLayer } from "react-leaflet";
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
} from "@/lib/mapConstants";

type Props = {
  activeName: string;
  onTileError: (name: string) => void;
};

export function BaseLayers({ activeName, onTileError }: Props) {
  return (
    <>
      <LayersControl.BaseLayer
        checked={activeName === BASE_LAYER_OSM}
        name={BASE_LAYER_OSM}
      >
        <TileLayer
          attribution={OSM_ATTRIBUTION}
          url={OSM_TILE_URL}
          maxZoom={OSM_MAX_ZOOM}
          eventHandlers={{ tileerror: () => onTileError(BASE_LAYER_OSM) }}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer
        checked={activeName === BASE_LAYER_ESRI_SAT}
        name={BASE_LAYER_ESRI_SAT}
      >
        <TileLayer
          attribution={ESRI_IMAGERY_ATTRIBUTION}
          url={ESRI_IMAGERY_TILE_URL}
          maxZoom={ESRI_IMAGERY_MAX_ZOOM}
          maxNativeZoom={ESRI_IMAGERY_MAX_NATIVE_ZOOM}
          eventHandlers={{ tileerror: () => onTileError(BASE_LAYER_ESRI_SAT) }}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer
        checked={activeName === BASE_LAYER_IGN}
        name={BASE_LAYER_IGN}
      >
        <TileLayer
          attribution={IGN_ATTRIBUTION}
          url={IGN_TOPO_TILE_URL}
          maxZoom={IGN_TOPO_MAX_ZOOM}
          eventHandlers={{ tileerror: () => onTileError(BASE_LAYER_IGN) }}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer
        checked={activeName === BASE_LAYER_ESRI_TOPO}
        name={BASE_LAYER_ESRI_TOPO}
      >
        <TileLayer
          attribution={ESRI_TOPO_ATTRIBUTION}
          url={ESRI_TOPO_TILE_URL}
          maxZoom={ESRI_TOPO_MAX_ZOOM}
          eventHandlers={{ tileerror: () => onTileError(BASE_LAYER_ESRI_TOPO) }}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer
        checked={activeName === BASE_LAYER_OPENTOPO}
        name={BASE_LAYER_OPENTOPO}
      >
        <TileLayer
          attribution={OPENTOPO_ATTRIBUTION}
          url={OPENTOPO_TILE_URL}
          subdomains={OPENTOPO_SUBDOMAINS}
          maxZoom={OPENTOPO_MAX_ZOOM}
          eventHandlers={{ tileerror: () => onTileError(BASE_LAYER_OPENTOPO) }}
        />
      </LayersControl.BaseLayer>
    </>
  );
}
