import { statusColor, statusLabel } from "@/lib/resourceLabels";
import type { ResourceStatus } from "@/types/sihe";

const STATUSES: ResourceStatus[] = [
  "operativo",
  "observaciones",
  "no_utilizable",
];

export function MapLegend() {
  return (
    <aside className="map-legend" aria-label="Leyenda">
      <h2>Leyenda</h2>
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
      </ul>
    </aside>
  );
}
