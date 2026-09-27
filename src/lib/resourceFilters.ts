import type { ResourceStatus, ResourceType } from "@/types/sihe";

export type ResourceTypeFilter = ResourceType | "" | "ninguno";

export type ResourceFiltersState = {
  type: ResourceTypeFilter;
  status: ResourceStatus | "";
};

export const EMPTY_FILTERS: ResourceFiltersState = {
  type: "",
  status: "",
};

export function filtersFromSearchParams(
  params: URLSearchParams,
): ResourceFiltersState {
  const type = params.get("tipo") ?? "";
  const status = params.get("estado") ?? "";

  return {
    type: type === "ninguno" || isResourceType(type) ? type : "",
    status: isResourceStatus(status) ? status : "",
  };
}

export function filtersToSearchParams(
  filters: ResourceFiltersState,
): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.type) params.set("tipo", filters.type);
  if (filters.status) params.set("estado", filters.status);
  return params;
}

function isResourceType(value: string): value is ResourceType {
  return value === "hidrante" || value === "espejo" || value === "tanque";
}

function isResourceStatus(value: string): value is ResourceStatus {
  return (
    value === "operativo" ||
    value === "observaciones" ||
    value === "no_utilizable"
  );
}
