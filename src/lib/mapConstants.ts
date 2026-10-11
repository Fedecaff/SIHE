export const CATAMARCA_CENTER = {
  lat: -28.4696,
  lng: -65.7795,
} as const;

export const MAP_DEFAULT_ZOOM = 13;

const routingBase = import.meta.env.VITE_ROUTING_BASE_URL?.trim();

export const ROUTING_BASE_URL = (
  routingBase ? routingBase.replace(/\/$/, "") : "https://router.project-osrm.org"
);

export const ROUTING_TIMEOUT_MS = 10_000;

export const ROUTE_DEVIATION_M = 50;

/** Recuadro de la provincia de Catamarca (oeste, sur, este, norte), con margen.
 *  El territorio queda aprox. entre 69°O–65°O y 30°S–25°S.
 */
export const CATAMARCA_BBOX = {
  west: -69.2,
  south: -30.2,
  east: -64.8,
  north: -25.0,
} as const;

export const OSM_TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
export const OSM_MAX_ZOOM = 19;
export const OSM_ATTRIBUTION =
  '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export const ESRI_IMAGERY_TILE_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
export const ESRI_IMAGERY_MAX_ZOOM = 19;
export const ESRI_IMAGERY_MAX_NATIVE_ZOOM = 18;
export const ESRI_IMAGERY_ATTRIBUTION =
  "Sources: Esri, DigitalGlobe, GeoEye, i-cubed, USDA FSA, USGS, AEX, Getmapping, Aerogrid, IGN, IGP, swisstopo, and the GIS User Community";

export const ESRI_TOPO_TILE_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}";
export const ESRI_TOPO_MAX_ZOOM = 19;
export const ESRI_TOPO_ATTRIBUTION =
  "Sources: Esri, HERE, Garmin, Intermap, increment P Corp., GEBCO, USGS, FAO, NPS, NRCAN, GeoBase, IGN, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), (c) OpenStreetMap contributors, and the GIS User Community";

export const IGN_TOPO_TILE_URL =
  "https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/mapabase_topo@EPSG%3A3857@png/{z}/{x}/{-y}.png";
export const IGN_TOPO_MAX_ZOOM = 19;
export const IGN_ATTRIBUTION =
  '<a href="https://www.ign.gob.ar">Instituto Geográfico Nacional</a> + OpenStreetMap';

export const OPENTOPO_TILE_URL =
  "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png";
export const OPENTOPO_SUBDOMAINS = "abc";
export const OPENTOPO_MAX_ZOOM = 17;
export const OPENTOPO_ATTRIBUTION =
  "Datos: © colaboradores de OpenStreetMap, SRTM | Estilo: © OpenTopoMap (CC-BY-SA)";

export const GIBS_WMTS_BASE =
  "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best";
export const GIBS_MODIS_721 = "MODIS_Terra_CorrectedReflectance_Bands721";
/** NOAA-20 sigue disponible; S-NPP también respondió para la misma fecha. */
export const GIBS_VIIRS_M11 = "VIIRS_NOAA20_CorrectedReflectance_BandsM11-I2-I1";
export const GIBS_NATIVE_ZOOM = 9;
export const GIBS_MAX_ZOOM = 19;
export const GIBS_ATTRIBUTION =
  "Imágenes: NASA Global Imagery Browse Services (GIBS), ESDIS";
export const GIBS_MIN_DATE = "2015-11-24";

export const GIBS_WMS_URL =
  "https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi";
export const GIBS_WMS_LAYERS =
  "VIIRS_SNPP_Thermal_Anomalies_375m_All,VIIRS_NOAA20_Thermal_Anomalies_375m_All,MODIS_Combined_Thermal_Anomalies_All";
export const GIBS_WMS_VERSION = "1.3.0";

export const FIRMS_API_BASE =
  "https://firms.modaps.eosdis.nasa.gov/api/area/csv";
export const FIRMS_SOURCES = [
  "VIIRS_SNPP_NRT",
  "VIIRS_NOAA20_NRT",
  "VIIRS_NOAA21_NRT",
  "MODIS_NRT",
] as const;
export const FIRMS_TIMEOUT_MS = 15_000;
export const FIRMS_REFRESH_MS = 5 * 60 * 1000;
export const FIRMS_ATTRIBUTION = "Focos: NASA FIRMS (LANCE)";

/** FIRMS: MODIS confidence 0–100. Baja &lt; 30, nominal 30–79, alta ≥ 80.
 *  https://www.earthdata.nasa.gov/faq/firms-faq
 */
export const MODIS_CONFIDENCE_NOMINAL_MIN = 30;
export const MODIS_CONFIDENCE_HIGH_MIN = 80;

export const FIRMS_COLOR_HIGH = "#d7301f";
export const FIRMS_COLOR_NOMINAL = "#fc8d59";
export const FIRMS_COLOR_LOW = "#fdcc8a";
export const FIRMS_COLOR_STROKE = "#000";
export const FIRMS_MARKER_RADIUS = 6;
export const FIRMS_MARKER_FILL_OPACITY = 0.7;

export const BASE_LAYER_OSM = "Mapa (OSM)";
export const BASE_LAYER_ESRI_SAT = "Satélite (Esri)";
export const BASE_LAYER_IGN = "Topográfico (IGN Argenmap)";
export const BASE_LAYER_ESRI_TOPO = "Topográfico (Esri)";
export const BASE_LAYER_OPENTOPO = "Relieve (OpenTopoMap)";

export const OVERLAY_MODIS = "Fuego MODIS 7-2-1";
export const OVERLAY_VIIRS = "Fuego VIIRS M11-I2-I1";
export const OVERLAY_WMS = "Fuego WMS";
export const OVERLAY_FIRMS = "Focos FIRMS";

export const FIRMS_DISCLAIMER =
  "Detección satelital: no confirma un incendio; el punto es el centro de un píxel de 375 m / 1 km.";
