import type { ReactNode } from "react";

type Props = {
  filtersOpen: boolean;
  layersOpen: boolean;
  legendOpen: boolean;
  activeFilters: number;
  activeOverlays: number;
  showZoom: boolean;
  dimmed: boolean;
  onToggleFilters: () => void;
  onToggleLayers: () => void;
  onToggleLegend: () => void;
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
  onToggleFilters,
  onToggleLayers,
  onToggleLegend,
  onLocate,
  onHome,
  onZoomIn,
  onZoomOut,
}: Props) {
  return (
    <div className={dimmed ? "map-rail is-dimmed" : "map-rail"}>
      <div className="map-rail-group">
        <RailButton
          label="Capas"
          pressed={layersOpen}
          badge={activeOverlays > 0 ? String(activeOverlays) : undefined}
          onClick={onToggleLayers}
        >
          <LayersIcon />
        </RailButton>
        <RailButton
          label="Filtros"
          pressed={filtersOpen}
          badge={activeFilters > 0 ? String(activeFilters) : undefined}
          onClick={onToggleFilters}
        >
          <FilterIcon />
        </RailButton>
        <RailButton label="Leyenda" pressed={legendOpen} onClick={onToggleLegend}>
          <LegendIcon />
        </RailButton>
      </div>
      <div className="map-rail-group">
        {showZoom ? (
          <>
            <RailButton label="Acercar" onClick={onZoomIn}>
              <span className="map-rail-glyph" aria-hidden="true">+</span>
            </RailButton>
            <RailButton label="Alejar" onClick={onZoomOut}>
              <span className="map-rail-glyph" aria-hidden="true">−</span>
            </RailButton>
          </>
        ) : null}
        <RailButton label="Mi ubicación" onClick={onLocate}>
          <LocateIcon />
        </RailButton>
        <RailButton label="Centrar" onClick={onHome}>
          <HomeIcon />
        </RailButton>
      </div>
    </div>
  );
}

function RailButton({
  label,
  pressed,
  badge,
  onClick,
  children,
}: {
  label: string;
  pressed?: boolean;
  badge?: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
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

function LayersIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="map-svg">
      <path d="M12 4l8 4-8 4-8-4 8-4zm0 8l8 4-8 4-8-4 8-4z" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="map-svg">
      <path d="M4 6h16M7 12h10M10 18h4" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function LegendIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="map-svg">
      <rect x="4" y="5" width="6" height="6" fill="currentColor" />
      <rect x="4" y="13" width="6" height="6" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M13 8h7M13 16h7" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function LocateIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="map-svg">
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="map-svg">
      <path d="M4 11l8-7 8 7v8H4v-8z" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
