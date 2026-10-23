import { todayInArgentina } from "@/lib/fireDates";
import {
  GIBS_MIN_DATE,
  BASE_LAYER_ESRI_SAT,
  BASE_LAYER_ESRI_TOPO,
  BASE_LAYER_IGN,
  BASE_LAYER_OPENTOPO,
  BASE_LAYER_OSM,
  OVERLAY_FIRMS,
  OVERLAY_MODIS,
  OVERLAY_VIIRS,
  OVERLAY_WMS,
} from "@/lib/mapConstants";
import type {
  FirmsConfidenceFilter,
  FirmsSourceChoice,
  FirmsWindow,
} from "@/lib/firmsHotspots";
import type { FirePeriod } from "@/services/fires";

const BASES: { id: string; title: string; detail: string }[] = [
  {
    id: BASE_LAYER_OSM,
    title: "Calles (OpenStreetMap)",
    detail: "Calles y nombres, para ubicar direcciones.",
  },
  {
    id: BASE_LAYER_ESRI_SAT,
    title: "Satélite (Esri)",
    detail: "Foto aérea, para ver terreno, vegetación y accesos.",
  },
  {
    id: BASE_LAYER_IGN,
    title: "Topográfico IGN",
    detail: "Cartografía oficial con curvas de nivel.",
  },
  {
    id: BASE_LAYER_ESRI_TOPO,
    title: "Topográfico (Esri)",
    detail: "Relieve y caminos rurales.",
  },
  {
    id: BASE_LAYER_OPENTOPO,
    title: "Relieve (OpenTopoMap)",
    detail: "Relieve sombreado, hasta zoom 17.",
  },
];

const SATELLITE: { id: string; title: string; detail: string }[] = [
  {
    id: OVERLAY_FIRMS,
    title: "Focos de calor FIRMS",
    detail: "Focos de calor detectados por satélite; no confirman incendio.",
  },
  {
    id: OVERLAY_WMS,
    title: "Anomalías térmicas (GIBS)",
    detail: "Manchas de calor satelital dibujadas sobre el mapa.",
  },
  {
    id: OVERLAY_MODIS,
    title: "Imagen MODIS 7-2-1",
    detail: "Falso color: rojo o marrón puede ser un área quemada.",
  },
  {
    id: OVERLAY_VIIRS,
    title: "Imagen VIIRS",
    detail: "Igual que MODIS, con satélites más nuevos.",
  },
];

type Props = {
  baseLayer: string;
  overlays: string[];
  date: string;
  windowMode: FirmsWindow;
  source: FirmsSourceChoice;
  confidence: FirmsConfidenceFilter;
  minFrp: string;
  opacity: number;
  showFireHeat: boolean;
  showFirePoints: boolean;
  firePeriod: FirePeriod;
  onBase: (name: string) => void;
  onOverlay: (name: string, enabled: boolean) => void;
  onDate: (value: string) => void;
  onWindow: (value: FirmsWindow) => void;
  onSource: (value: FirmsSourceChoice) => void;
  onConfidence: (value: FirmsConfidenceFilter) => void;
  onMinFrp: (value: string) => void;
  onOpacity: (value: number) => void;
  onHeat: (value: boolean) => void;
  onPoints: (value: boolean) => void;
  onPeriod: (value: FirePeriod) => void;
};

export function MapLayersPanel({
  baseLayer,
  overlays,
  date,
  windowMode,
  source,
  confidence,
  minFrp,
  opacity,
  showFireHeat,
  showFirePoints,
  firePeriod,
  onBase,
  onOverlay,
  onDate,
  onWindow,
  onSource,
  onConfidence,
  onMinFrp,
  onOpacity,
  onHeat,
  onPoints,
  onPeriod,
}: Props) {
  const anySatellite = SATELLITE.some((item) => overlays.includes(item.id));
  const firmsOn = overlays.includes(OVERLAY_FIRMS);

  return (
    <div className="map-layers">
      <fieldset className="map-chip-set">
        <legend>Mapa base</legend>
        {BASES.map((item) => (
          <label key={item.id} className="map-layer-option">
            <input
              type="radio"
              name="mapa-base"
              checked={baseLayer === item.id}
              onChange={() => onBase(item.id)}
            />
            <span>
              <strong>{item.title}</strong>
              <small>{item.detail}</small>
            </span>
          </label>
        ))}
      </fieldset>

      <fieldset className="map-chip-set">
        <legend>Fuego satelital (NASA)</legend>
        {SATELLITE.map((item) => (
          <label key={item.id} className="map-layer-option">
            <input
              type="checkbox"
              checked={overlays.includes(item.id)}
              onChange={(event) => onOverlay(item.id, event.target.checked)}
            />
            <span>
              <strong>{item.title}</strong>
              <small>{item.detail}</small>
            </span>
          </label>
        ))}
        {anySatellite ? (
          <>
            <label className="filter-field">
              <span>Fecha de imagen</span>
              <input
                type="date"
                value={date}
                min={GIBS_MIN_DATE}
                max={todayInArgentina()}
                onChange={(event) => onDate(event.target.value)}
              />
            </label>
            {firmsOn ? (
              <>
                <label className="filter-field">
                  <span>Ventana</span>
                  <select
                    value={windowMode}
                    onChange={(event) => onWindow(event.target.value as FirmsWindow)}
                  >
                    <option value="24h">24 h</option>
                    <option value="48h">48 h</option>
                    <option value="7d">7 días</option>
                    <option value="dia">Día elegido</option>
                  </select>
                </label>
                <label className="filter-field">
                  <span>Confianza</span>
                  <select
                    value={confidence}
                    onChange={(event) =>
                      onConfidence(event.target.value as FirmsConfidenceFilter)
                    }
                  >
                    <option value="todas">Todas</option>
                    <option value="nominal_alta">Nominal y alta</option>
                    <option value="alta">Solo alta</option>
                  </select>
                </label>
              </>
            ) : null}
            <details className="map-advanced">
              <summary>Avanzado</summary>
              <label className="filter-field">
                <span>Satélite FIRMS</span>
                <select
                  value={source}
                  onChange={(event) => onSource(event.target.value as FirmsSourceChoice)}
                >
                  <option value="VIIRS_SNPP_NRT">VIIRS S-NPP</option>
                  <option value="VIIRS_NOAA20_NRT">VIIRS NOAA-20</option>
                  <option value="VIIRS_NOAA21_NRT">VIIRS NOAA-21</option>
                  <option value="MODIS_NRT">MODIS</option>
                  <option value="viirs_all">Todos los VIIRS</option>
                </select>
              </label>
              <label className="filter-field">
                <span>FRP mínimo</span>
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={minFrp}
                  placeholder="Sin mínimo"
                  onChange={(event) => onMinFrp(event.target.value)}
                />
              </label>
              <label className="filter-field">
                <span>Opacidad</span>
                <input
                  type="range"
                  min={0.3}
                  max={1}
                  step={0.1}
                  value={opacity}
                  aria-valuetext={opacity.toFixed(1)}
                  onChange={(event) => onOpacity(Number(event.target.value))}
                />
              </label>
            </details>
          </>
        ) : null}
      </fieldset>

      <fieldset className="map-chip-set">
        <legend>Incendios registrados en SIHE</legend>
        <label className="map-layer-option">
          <input
            type="checkbox"
            checked={showFireHeat}
            onChange={(event) => onHeat(event.target.checked)}
          />
          <span>
            <strong>Calor</strong>
            <small>Densidad de incendios ya cargados en el sistema.</small>
          </span>
        </label>
        <label className="map-layer-option">
          <input
            type="checkbox"
            checked={showFirePoints}
            onChange={(event) => onPoints(event.target.checked)}
          />
          <span>
            <strong>Puntos</strong>
            <small>Un marcador por incendio registrado.</small>
          </span>
        </label>
        <label className="filter-field">
          <span>Período</span>
          <select
            value={firePeriod}
            onChange={(event) => onPeriod(event.target.value as FirePeriod)}
          >
            <option value="12m">12 meses</option>
            <option value="5y">5 años</option>
            <option value="all">Todo</option>
          </select>
        </label>
      </fieldset>

      <p className="map-sources">
        Fuentes: OpenStreetMap, Esri, IGN, NASA GIBS y NASA FIRMS. La atribución
        de la capa visible queda en el mapa.
      </p>
    </div>
  );
}
