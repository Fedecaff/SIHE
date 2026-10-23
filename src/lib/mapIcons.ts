import L from "leaflet";
import type { ResourceStatus, ResourceType } from "@/types/sihe";
import { statusColor, typeColor } from "@/lib/resourceLabels";

const cache = new Map<string, L.DivIcon>();
const svgCache = new Map<string, string>();

const SIZE = 22;

const iconPaths: Record<string, string> = {
  Flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  Droplet: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
  Hydrant: '<path d="M7 12V7h2v5M15 12V7h2v5"/><rect x="9" y="4" width="6" height="3" rx="1"/><rect x="8" y="12" width="8" height="8" rx="1"/><path d="M6 15h2M16 15h2M6 17h2M16 17h2"/>',
  Tank: '<ellipse cx="12" cy="19" rx="4" ry="2"/><path d="M8 19V9M16 19V9"/><ellipse cx="12" cy="9" rx="4" ry="2"/><line x1="10" y1="9" x2="10" y2="5"/><line x1="14" y1="9" x2="14" y2="5"/><line x1="8" y1="5" x2="16" y2="5"/>',
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
    case "hidrante":
      return "Hydrant";
    case "espejo":
      return "Droplet";
    case "tanque":
      return "Tank";
    default: {
      const _exhaustive: never = type;
      return _exhaustive;
    }
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
