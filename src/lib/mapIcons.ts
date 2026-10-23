import L from "leaflet";
import type { ResourceStatus, ResourceType } from "@/types/sihe";
import { statusColor, typeColor } from "@/lib/resourceLabels";

const cache = new Map<string, L.DivIcon>();
const svgCache = new Map<string, string>();

const SIZE = 22;

const iconPaths: Record<string, string> = {
  Flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  Droplet: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
  Container: '<path d="M22 7.7c0-.6-.4-1.2-.7-1.5L12 .4 2.7 6.2c-.3.3-.7.8-.7 1.5v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zM9.3 17.7v-3.4"/><path d="M14.7 17.7v-3.4"/>',
  MapPin: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  User: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  Circle: '<circle cx="12" cy="12" r="10"/>',
  Flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/>',
};

function createSvgFromIcon(
  iconName: string,
  size: number,
  color: string,
  strokeWidth: number,
): string {
  const path = iconPaths[iconName];
  if (!path) return "";
  
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
}

function getIconName(type: ResourceType): string {
  switch (type) {
    case "espejo":
      return "Droplet";
    case "tanque":
      return "Container";
    default:
      return "Flame";
  }
}

export function resourceGlyphSvg(
  type: ResourceType,
  fill = "#fff",
  size = 16,
): string {
  const cacheKey = `${type}-${fill}-${size}`;
  const cached = svgCache.get(cacheKey);
  if (cached) return cached;

  const iconName = getIconName(type);
  const markup = createSvgFromIcon(iconName, size, fill, 2.5);
  svgCache.set(cacheKey, markup);
  return markup;
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
