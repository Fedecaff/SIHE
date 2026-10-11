import type { ResourceFiltersState } from "@/lib/resourceFilters";
import type { ResourceStatus } from "@/types/sihe";
import type { ResourceTypeFilter } from "@/lib/resourceFilters";

const TYPES: { value: ResourceTypeFilter; label: string }[] = [
  { value: "", label: "Todos" },
  { value: "hidrante", label: "Hidrante" },
  { value: "espejo", label: "Espejo" },
  { value: "tanque", label: "Tanque" },
  { value: "ninguno", label: "Ninguno" },
];

const STATUSES: { value: ResourceStatus | ""; label: string }[] = [
  { value: "", label: "Todos" },
  { value: "operativo", label: "Operativo" },
  { value: "observaciones", label: "Observaciones" },
  { value: "no_utilizable", label: "No utilizable" },
];

type Props = {
  filters: ResourceFiltersState;
  resultCount?: number;
  loading?: boolean;
  onChange: (partial: Partial<ResourceFiltersState>) => void;
  onClear: () => void;
};

export function MapFiltersPanel({
  filters,
  resultCount,
  loading,
  onChange,
  onClear,
}: Props) {
  return (
    <div className="map-panel-body">
      <p className="map-panel-kicker">
        {loading ? "Cargando…" : `${resultCount ?? 0} recursos`}
      </p>
      <fieldset className="map-chip-set">
        <legend>Tipo</legend>
        <div className="map-chips">
          {TYPES.map((option) => (
            <button
              key={option.label}
              type="button"
              className={filters.type === option.value ? "map-chip is-on" : "map-chip"}
              aria-pressed={filters.type === option.value}
              onClick={() => onChange({ type: option.value })}
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className="map-chip-set">
        <legend>Estado</legend>
        <div className="map-chips">
          {STATUSES.map((option) => (
            <button
              key={option.label}
              type="button"
              className={
                filters.status === option.value ? "map-chip is-on" : "map-chip"
              }
              aria-pressed={filters.status === option.value}
              onClick={() => onChange({ status: option.value })}
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>
      <button type="button" className="btn-toolbar" onClick={onClear}>
        Limpiar filtros
      </button>
    </div>
  );
}
