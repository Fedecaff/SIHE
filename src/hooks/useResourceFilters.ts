import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  EMPTY_FILTERS,
  filtersFromSearchParams,
  filtersToSearchParams,
  type ResourceFiltersState,
} from "@/lib/resourceFilters";

/** Filtros compartidos mapa/listado vía query string. */
export function useResourceFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(
    () => filtersFromSearchParams(searchParams),
    [searchParams],
  );

  const setFilters = useCallback(
    (next: ResourceFiltersState) => {
      const params = filtersToSearchParams(next);
      setSearchParams(params, { replace: true });
    },
    [setSearchParams],
  );

  const patchFilters = useCallback(
    (partial: Partial<ResourceFiltersState>) => {
      setFilters({ ...filters, ...partial });
    },
    [filters, setFilters],
  );

  const clearFilters = useCallback(() => {
    setFilters(EMPTY_FILTERS);
  }, [setFilters]);

  return { filters, setFilters, patchFilters, clearFilters };
}
