import L from "leaflet";
import type { ResourceStatus, ResourceType } from "@/types/sihe";
import { statusColor, typeColor } from "@/lib/resourceLabels";

const cache = new Map<string, L.DivIcon>();

const SIZE = 22;

const HYDRANT =
  '<path d="M9 3h6v2H9V3zm1 2h4v1.5h3.2V9H15.5v8.2H8.5V9H6.8V6.5H10V5zm-3.5 4.2h2.2v2.2H6.5V9.2zm9 0H17.7v2.2h-2.2V9.2zM8 18.5h8V21H8v-2.5z"/>';

const DROPLET =
  '<path d="M12 2.8c0 0 6.4 7.4 6.4 11.6A6.4 6.4 0 1 1 5.6 14.4C5.6 10.2 12 2.8 12 2.8z"/>';

const TANK =
  '<path d="M8.2 3.2h7.6v2.6H8.2V3.2zm1.1 3.4h5.4v8.6H9.3V6.6zM7 16h10v2.2H7V16zM8.4 18.2h1.4V21H8.4v-2.8zm5.8 0H15.6V21h-1.4v-2.8z"/>';

function glyph(type: ResourceType): string {
  switch (type) {
    case "espejo":
      return DROPLET;
    case "tanque":
      return TANK;
    default:
      return HYDRANT;
  }
}

export function resourceGlyphSvg(
  type: ResourceType,
  fill = "#fff",
  size = 16,
): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="${fill}" aria-hidden="true">${glyph(type)}</svg>`;
}

export function resourceMapIcon(
  type: ResourceType,
  status: ResourceStatus,
): L.DivIcon {
  const key = `${type}-${status}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const fill = typeColor(type);
  const ring = statusColor(status);
  const icon = L.divIcon({
    className: "resource-marker",
    html: `<span class="resource-marker-pin" style="background:${fill};border-color:${ring}">${resourceGlyphSvg(type, "#fff", 14)}</span>`,
    iconSize: [SIZE, SIZE],
    iconAnchor: [SIZE / 2, SIZE / 2],
    popupAnchor: [0, -12],
  });

  cache.set(key, icon);
  return icon;
}
