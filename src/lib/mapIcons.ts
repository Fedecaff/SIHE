import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Droplet, Flame, Container } from "lucide-react";
import L from "leaflet";
import type { ResourceStatus, ResourceType } from "@/types/sihe";
import { statusColor, typeColor } from "@/lib/resourceLabels";

const cache = new Map<string, L.DivIcon>();
const svgCache = new Map<string, string>();

const SIZE = 22;

function getLucideIcon(type: ResourceType) {
  switch (type) {
    case "espejo":
      return Droplet;
    case "tanque":
      return Container;
    default:
      return Flame;
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

  const IconComponent = getLucideIcon(type);
  const markup = renderToStaticMarkup(
    createElement(IconComponent, { size, color: fill, strokeWidth: 2.5 })
  );
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
