import { resourceGlyphSvg } from "@/lib/mapIcons";
import { statusColor, statusLabel, typeColor, typeLabel } from "@/lib/resourceLabels";
import type { ResourceStatus, ResourceType } from "@/types/sihe";

const TYPES: ResourceType[] = ["hidrante", "espejo", "tanque"];
const STATUSES: ResourceStatus[] = [
  "operativo",
  "observaciones",
  "no_utilizable",
];

type Props = {
  showFire?: boolean;
};

export function MapLegend({ showFire = false }: Props) {
  return (
    <aside className="map-legend" aria-label="Leyenda">
      <h2>Tipo</h2>
      <ul>
        {TYPES.map((type) => (
          <li key={type}>
            <span
              className="map-legend-icon"
              style={{
                background: typeColor(type),
                borderColor: statusColor("operativo"),
              }}
              dangerouslySetInnerHTML={{
                __html: resourceGlyphSvg(type, "#fff", 14),
              }}
            />
            {typeLabel(type)}
          </li>
        ))}
      </ul>
      <h2>Estado</h2>
      <ul>
        {STATUSES.map((status) => (
          <li key={status}>
            <span
              className="map-legend-dot"
              style={{ background: statusColor(status) }}
            />
            {statusLabel(status)}
          </li>
        ))}
        {showFire ? (
          <li>
            <span
              className="map-legend-dot"
              style={{ background: "#f97316" }}
            />
            Incendio histórico
          </li>
        ) : null}
      </ul>
    </aside>
  );
}
