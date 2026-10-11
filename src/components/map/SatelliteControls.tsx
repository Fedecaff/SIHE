import { GIBS_MIN_DATE } from "@/lib/mapConstants";
import { todayInArgentina } from "@/lib/fireDates";
import type {
  FirmsConfidenceFilter,
  FirmsSourceChoice,
  FirmsWindow,
} from "@/lib/firmsHotspots";

type Props = {
  date: string;
  windowMode: FirmsWindow;
  source: FirmsSourceChoice;
  confidence: FirmsConfidenceFilter;
  minFrp: string;
  opacity: number;
  onDateChange: (value: string) => void;
  onWindowChange: (value: FirmsWindow) => void;
  onSourceChange: (value: FirmsSourceChoice) => void;
  onConfidenceChange: (value: FirmsConfidenceFilter) => void;
  onMinFrpChange: (value: string) => void;
  onOpacityChange: (value: number) => void;
};

export function SatelliteControls({
  date,
  windowMode,
  source,
  confidence,
  minFrp,
  opacity,
  onDateChange,
  onWindowChange,
  onSourceChange,
  onConfidenceChange,
  onMinFrpChange,
  onOpacityChange,
}: Props) {
  return (
    <div className="filter-satellite">
      <label className="filter-field">
        <span>Fecha de imagen</span>
        <input
          type="date"
          value={date}
          min={GIBS_MIN_DATE}
          max={todayInArgentina()}
          onChange={(event) => onDateChange(event.target.value)}
        />
      </label>
      <label className="filter-field">
        <span>Ventana FIRMS</span>
        <select
          value={windowMode}
          onChange={(event) => onWindowChange(event.target.value as FirmsWindow)}
        >
          <option value="24h">24 h</option>
          <option value="48h">48 h</option>
          <option value="7d">7 días</option>
          <option value="dia">Día elegido</option>
        </select>
      </label>
      <label className="filter-field">
        <span>Satélite FIRMS</span>
        <select
          value={source}
          onChange={(event) =>
            onSourceChange(event.target.value as FirmsSourceChoice)
          }
        >
          <option value="VIIRS_SNPP_NRT">VIIRS S-NPP</option>
          <option value="VIIRS_NOAA20_NRT">VIIRS NOAA-20</option>
          <option value="VIIRS_NOAA21_NRT">VIIRS NOAA-21</option>
          <option value="MODIS_NRT">MODIS</option>
          <option value="viirs_all">Todos los VIIRS</option>
        </select>
      </label>
      <label className="filter-field">
        <span>Confianza</span>
        <select
          value={confidence}
          onChange={(event) =>
            onConfidenceChange(event.target.value as FirmsConfidenceFilter)
          }
        >
          <option value="todas">Todas</option>
          <option value="nominal_alta">Nominal y alta</option>
          <option value="alta">Solo alta</option>
        </select>
      </label>
      <label className="filter-field">
        <span>FRP mínimo (MW)</span>
        <input
          type="number"
          min={0}
          step={1}
          value={minFrp}
          placeholder="Sin mínimo"
          onChange={(event) => onMinFrpChange(event.target.value)}
        />
      </label>
      <label className="filter-field">
        <span>Opacidad imágenes</span>
        <input
          type="range"
          min={0.3}
          max={1}
          step={0.1}
          value={opacity}
          aria-valuetext={opacity.toFixed(1)}
          onChange={(event) => onOpacityChange(Number(event.target.value))}
        />
      </label>
      <p className="filter-note">
        Las imágenes del día se completan a lo largo de la jornada (UTC). Activá
        las capas de fuego en el control del mapa, arriba a la derecha.
      </p>
    </div>
  );
}
