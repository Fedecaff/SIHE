import { statusColor, statusLabel, typeColor, typeLabel } from "@/lib/resourceLabels";
import type { ResourceStatus, ResourceType } from "@/types/sihe";

const iconPaths: Record<string, string> = {
  Flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  Droplet: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
  Container: '<path d="M22 7.7c0-.6-.4-1.2-.7-1.5L12 .4 2.7 6.2c-.3.3-.7.8-.7 1.5v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zM9.3 17.7v-3.4"/><path d="M14.7 17.7v-3.4"/>',
};

function createSvgIcon(iconName: string, size: number, color: string, strokeWidth: number): string {
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
