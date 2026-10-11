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
      {showSatellite ? (
        <>
          <h2>Fuego satelital</h2>
          <p className="map-legend-note">Fecha o ventana: {imageDate}</p>
          {showFirms ? (
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
          ) : null}
          {firmsLabel ? <p className="map-legend-note">{firmsLabel}</p> : null}
          {showModis || showViirs ? (
            <p className="map-legend-note">
              7-2-1: rojo/marrón, posible área quemada; verde, vegetación.
            </p>
          ) : null}
          {showWms ? (
            <p className="map-legend-note">
              Fuego WMS: anomalías térmicas de VIIRS y MODIS (NASA GIBS).
            </p>
          ) : null}
        </>
      ) : null}
    </aside>
  );
}
