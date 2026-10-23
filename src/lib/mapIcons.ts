import L from "leaflet";
import type { ResourceStatus, ResourceType } from "@/types/sihe";
import { statusColor, typeColor } from "@/lib/resourceLabels";

const cache = new Map<string, L.DivIcon>();
const svgCache = new Map<string, string>();

const SIZE = 22;

// Icon paths from multiple open-source libraries:
// - Tabler Icons v3.49.0 (MIT License) https://tabler.io/icons
// - IconOven (MIT License) https://iconoven.com
// - Lucide v1.61.0 (ISC License) https://lucide.dev
const iconPaths: Record<string, string> = {
  Flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  // Lucide: droplet (water drop) - ISC License
  Droplet: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />',
  // Tabler Icons: fire-hydrant (outline) - MIT License
  FireHydrant: '<path d="M5 21h14" /><path d="M17 21v-5h1a1 1 0 0 0 1 -1v-2a1 1 0 0 0 -1 -1h-1v-4a5 5 0 0 0 -10 0v4h-1a1 1 0 0 0 -1 1v2a1 1 0 0 0 1 1h1v5" /><path d="M10 14a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M6 8h12" />',
  // IconOven: water-tower (tank on elevated structure) - MIT License
  WaterTower: '<rect width="14.5" height="8.5" x="4.75" y="2.75" rx="3"/><path d="M4.75 7h14.5m-12.5 4v10.25M17.25 11v10.25M6.75 17h3.5m3.5 0h3.5M12 11.25v10"/>',
  MapPin: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  User: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  Circle: '<circle cx="12" cy="12" r="10"/>',
  Flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/>',
};

export function createSvgFromIcon(
  iconName: string,
  size: number,
  color: string,
  strokeWidth: number,
): string {
  const path = iconPaths[iconName];
  if (!path) return "";
  
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
}

export function getIconName(type: ResourceType): string {
  switch (type) {
    case "hidrante":
      return "FireHydrant";
    case "espejo":
      return "Droplet";
    case "tanque":
      return "WaterTower";
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
