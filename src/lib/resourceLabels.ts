import type { ResourceStatus, ResourceType } from "@/types/sihe";

export function statusLabel(status: ResourceStatus): string {
  switch (status) {
    case "operativo":
      return "Operativo";
    case "observaciones":
      return "Observaciones";
    case "no_utilizable":
      return "No utilizable";
    default:
      return status;
  }
}

export function typeLabel(type: ResourceType): string {
  switch (type) {
    case "hidrante":
      return "Hidrante";
    case "espejo":
      return "Espejo de agua";
    case "tanque":
      return "Tanque";
    default:
      return type;
  }
}

export function statusColor(status: ResourceStatus): string {
  switch (status) {
    case "operativo":
      return "#22c55e";
    case "observaciones":
      return "#eab308";
    case "no_utilizable":
      return "#e74c3c";
    default:
      return "#666666";
  }
}

export function typeColor(type: ResourceType): string {
  switch (type) {
    case "hidrante":
      return "#b91c1c";
    case "espejo":
      return "#0369a1";
    case "tanque":
      return "#6d28d9";
    default:
      return "#334155";
  }
}
