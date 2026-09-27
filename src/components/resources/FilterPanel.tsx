import type { KeyboardEvent, ReactNode } from "react";

import type { ResourceStatus } from "@/types/sihe";
import type {
  ResourceFiltersState,
  ResourceTypeFilter,
} from "@/lib/resourceFilters";

import type { FirePeriod } from "@/services/fires";

type FireLayerControls = {
  showHeat: boolean;
  showPoints: boolean;
  period: FirePeriod;
  onShowHeatChange: (value: boolean) => void;
  onShowPointsChange: (value: boolean) => void;
  onPeriodChange: (value: FirePeriod) => void;
};

type Props = {
  filters: ResourceFiltersState;
  onChange: (partial: Partial<ResourceFiltersState>) => void;
  onClear: () => void;
  resultCount?: number;
  loading?: boolean;
  extraActions?: ReactNode;
  addressQuery?: string;
  onAddressChange?: (value: string) => void;
  onAddressSearch?: () => void;
  addressSearching?: boolean;
  fireLayers?: FireLayerControls;
};

export function FilterPanel({
  filters,
  onChange,
  onClear,
  resultCount,
  loading,
  extraActions,
  addressQuery,
  onAddressChange,
  onAddressSearch,
  addressSearching,
  fireLayers,
}: Props) {
  const showAddress = onAddressChange != null && onAddressSearch != null;

  function handleAddressKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    onAddressSearch?.();
  }

  return (
    <div className="filter-panel" role="search" aria-label="Filtros de recursos">
      {showAddress ? (
        <label className="filter-field filter-field-address">
          <span>Dirección</span>
          <input
            type="search"
            value={addressQuery ?? ""}
            onChange={(e) => onAddressChange?.(e.target.value)}
            onKeyDown={handleAddressKey}
            placeholder="Ej. San Martín y Junín"
            autoComplete="street-address"
            enterKeyHint="search"
            disabled={addressSearching}
            title="Calle y número, o intersección: San Martín y Junín"
          />
        </label>
      ) : null}

      <label className="filter-field">
        <span>Tipo</span>
        <select
          value={filters.type}
          onChange={(e) =>
            onChange({ type: e.target.value as ResourceTypeFilter })
          }
        >
          <option value="">Todos</option>
          <option value="hidrante">Hidrante</option>
          <option value="espejo">Espejo</option>
          <option value="tanque">Tanque</option>
          <option value="ninguno">Ninguno</option>
        </select>
      </label>

      <label className="filter-field">
        <span>Estado</span>
        <select
          value={filters.status}
          onChange={(e) =>
            onChange({ status: e.target.value as ResourceStatus | "" })
          }
        >
          <option value="">Todos</option>
          <option value="operativo">Operativo</option>
          <option value="observaciones">Observaciones</option>
          <option value="no_utilizable">No utilizable</option>
        </select>
      </label>

      {fireLayers ? (
        <div className="filter-fire" role="group" aria-label="Capas de incendios">
          <div className="filter-field">
            <span>Incendios</span>
            <div className="filter-fire-toggles">
              <label className="filter-check">
                <input
                  type="checkbox"
                  checked={fireLayers.showHeat}
                  onChange={(e) => fireLayers.onShowHeatChange(e.target.checked)}
                />
                <span>Calor</span>
              </label>
              <label className="filter-check">
                <input
                  type="checkbox"
                  checked={fireLayers.showPoints}
                  onChange={(e) =>
                    fireLayers.onShowPointsChange(e.target.checked)
                  }
                />
                <span>Puntos</span>
              </label>
            </div>
          </div>
          <label className="filter-field filter-field-period">
            <span>Período</span>
            <select
              value={fireLayers.period}
              onChange={(e) =>
                fireLayers.onPeriodChange(e.target.value as FirePeriod)
              }
              disabled={!fireLayers.showHeat && !fireLayers.showPoints}
            >
              <option value="12m">12 meses</option>
              <option value="5y">5 años</option>
              <option value="all">Todo</option>
            </select>
          </label>
        </div>
      ) : null}

      <div className="filter-actions">
        <button type="button" className="btn-toolbar" onClick={onClear}>
          Limpiar
        </button>
        {extraActions}
      </div>

      {resultCount !== undefined ? (
        <span className="filter-count">
          {loading || addressSearching
            ? "Cargando…"
            : `${resultCount} recursos`}
        </span>
      ) : null}
    </div>
  );
}
