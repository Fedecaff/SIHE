import type { ReactNode } from "react";
import { Layers, SlidersHorizontal, Info, MapPin, Locate, Home, Plus, Minus } from "lucide-react";

type Props = {
  filtersOpen: boolean;
  layersOpen: boolean;
  legendOpen: boolean;
  activeFilters: number;
  activeOverlays: number;
  showZoom: boolean;
  dimmed: boolean;
  pickingPoint: boolean;
  onToggleFilters: () => void;
  onToggleLayers: () => void;
  onToggleLegend: () => void;
  onTogglePickPoint: () => void;
  onLocate: () => void;
  onHome: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
};

export function MapActionRail({
  filtersOpen,
  layersOpen,
  legendOpen,
  activeFilters,
  activeOverlays,
  showZoom,
  dimmed,
  pickingPoint,
  onToggleFilters,
  onToggleLayers,
  onToggleLegend,
  onTogglePickPoint,
  onLocate,
  onHome,
  onZoomIn,
  onZoomOut,
}: Props) {
  return (
    <div className={dimmed ? "map-rail is-dimmed" : "map-rail"}>
      <div className="map-rail-group">
        <RailButton
          id="map-rail-capas"
          label="Capas"
          pressed={layersOpen}
          badge={activeOverlays > 0 ? String(activeOverlays) : undefined}
          onClick={onToggleLayers}
        >
          <Layers size={20} strokeWidth={2.5} />
        </RailButton>
        <RailButton
          id="map-rail-filtros"
          label="Filtros"
          pressed={filtersOpen}
          badge={activeFilters > 0 ? String(activeFilters) : undefined}
          onClick={onToggleFilters}
        >
          <SlidersHorizontal size={20} strokeWidth={2.5} />
        </RailButton>
        <RailButton id="map-rail-leyenda" label="Leyenda" pressed={legendOpen} onClick={onToggleLegend}>
          <Info size={20} strokeWidth={2.5} />
        </RailButton>
      </div>
      <div className="map-rail-group">
        <RailButton
          id="map-rail-marcar"
          label="Marcar punto"
          pressed={pickingPoint}
          onClick={onTogglePickPoint}
        >
          <MapPin size={20} strokeWidth={2.5} />
        </RailButton>
        {showZoom ? (
          <>
            <RailButton label="Acercar" onClick={onZoomIn}>
              <Plus size={20} strokeWidth={2.5} />
            </RailButton>
            <RailButton label="Alejar" onClick={onZoomOut}>
              <Minus size={20} strokeWidth={2.5} />
            </RailButton>
          </>
        ) : null}
        <RailButton label="Mi ubicación" onClick={onLocate}>
          <Locate size={20} strokeWidth={2.5} />
        </RailButton>
        <RailButton label="Centrar" onClick={onHome}>
          <Home size={20} strokeWidth={2.5} />
        </RailButton>
      </div>
    </div>
  );
}

function RailButton({
  id,
  label,
  pressed,
  badge,
  onClick,
  children,
}: {
  id?: string;
  label: string;
  pressed?: boolean;
  badge?: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      id={id}
      type="button"
      className={pressed ? "map-rail-btn is-pressed" : "map-rail-btn"}
      aria-label={label}
      title={label}
      aria-pressed={pressed}
      aria-expanded={pressed}
      onClick={onClick}
    >
      {children}
      <span>{label}</span>
      {badge ? <span className="map-rail-badge">{badge}</span> : null}
    </button>
  );
}

