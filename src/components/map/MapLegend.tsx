import { statusColor, statusLabel, typeColor, typeLabel } from "@/lib/resourceLabels";
import type { ResourceStatus, ResourceType } from "@/types/sihe";

const iconPaths: Record<string, string> = {
  Flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  Droplet: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
  Hydrant: '<path d="M7 12V7h2v5M15 12V7h2v5"/><rect x="9" y="4" width="6" height="3" rx="1"/><rect x="8" y="12" width="8" height="8" rx="1"/><path d="M6 15h2M16 15h2M6 17h2M16 17h2"/>',
  Tank: '<ellipse cx="12" cy="19" rx="4" ry="2"/><path d="M8 19V9M16 19V9"/><ellipse cx="12" cy="9" rx="4" ry="2"/><line x1="10" y1="9" x2="10" y2="5"/><line x1="14" y1="9" x2="14" y2="5"/><line x1="8" y1="5" x2="16" y2="5"/>',
};

function createSvgIcon(iconName: string, size: number, color: string, strokeWidth: number): string {
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

const TYPES: ResourceType[] = ["hidrante", "espejo", "tanque"];
const STATUSES: ResourceStatus[] = [
  "operativo",
  "observaciones",
  "no_utilizable",
];

type Props = {
  embedded?: boolean;
  typeFilter?: "" | "hidrante" | "espejo" | "tanque" | "ninguno";
  showFire?: boolean;
  showModis?: boolean;
  showViirs?: boolean;
  showWms?: boolean;
  showFirms?: boolean;
  imageDate?: string;
  firmsLabel?: string | null;
};

export function MapLegend({
  embedded = false,
  typeFilter = "",
  showFire = false,
  showModis = false,
  showViirs = false,
  showWms = false,
  showFirms = false,
  imageDate,
  firmsLabel,
}: Props) {
  const showSatellite = showModis || showViirs || showWms || showFirms;
  const types =
    typeFilter === "ninguno"
      ? []
      : typeFilter === ""
        ? TYPES
        : TYPES.filter((type) => type === typeFilter);
  return (
    <aside className={embedded ? "map-legend is-embedded" : "map-legend"} aria-label="Leyenda">
      <details open>
        <summary>Qué se ve en el mapa</summary>
      {types.length > 0 ? (
        <>
      <h2>Tipo</h2>
      <ul>
        {types.map((type) => (
          <li key={type}>
            <span
              className="map-legend-icon"
              style={{
                background: typeColor(type),
                borderColor: statusColor("operativo"),
              }}
              dangerouslySetInnerHTML={{
                __html: createSvgIcon(getIconName(type), 14, "#fff", 2.5),
              }}
            />
            {typeLabel(type)}
          </li>
        ))}
      </ul>
        </>
      ) : null}
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
      {showSatellite ? (
        <>
          <h2>Fuego satelital</h2>
          <p className="map-legend-note">Fecha o ventana: {imageDate}</p>
          {showFirms ? (
            <>
              <p className="map-legend-note">
                Focos de calor detectados por satélite; no confirman incendio.
              </p>
              <ul>
                <li>
                  <span className="map-legend-dot" style={{ background: "#d7301f" }} />
                  Confianza alta
                </li>
                <li>
                  <span className="map-legend-dot" style={{ background: "#fc8d59" }} />
                  Confianza nominal
                </li>
                <li>
                  <span className="map-legend-dot" style={{ background: "#fdcc8a" }} />
                  Confianza baja
                </li>
              </ul>
            </>
          ) : null}
          {firmsLabel ? <p className="map-legend-note">{firmsLabel}</p> : null}
          {showModis || showViirs ? (
            <p className="map-legend-note">
              Falso color: rojo o marrón puede ser un área quemada.
            </p>
          ) : null}
          {showWms ? (
            <p className="map-legend-note">
              Manchas de calor satelital dibujadas sobre el mapa.
            </p>
          ) : null}
        </>
      ) : null}
      </details>
    </aside>
  );
}
