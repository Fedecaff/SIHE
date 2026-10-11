type OsrmManeuver = {
  type?: string;
  modifier?: string;
  exit?: number;
};

function modifierEs(modifier?: string): string {
  switch (modifier) {
    case "uturn":
      return "en U";
    case "sharp right":
      return "cerrado a la derecha";
    case "right":
      return "a la derecha";
    case "slight right":
      return "leve a la derecha";
    case "straight":
      return "derecho";
    case "slight left":
      return "leve a la izquierda";
    case "left":
      return "a la izquierda";
    case "sharp left":
      return "cerrado a la izquierda";
    default:
      return "";
  }
}

function street(name?: string): string {
  const n = name?.trim();
  return n && n !== "-" ? ` por ${n}` : "";
}

/** Traduce una maniobra OSRM a una instrucción en español. */
export function osrmStepInstruction(
  maneuver: OsrmManeuver,
  name?: string,
): string {
  const turn = modifierEs(maneuver.modifier);
  const via = street(name);
  const exit = maneuver.exit;

  switch (maneuver.type) {
    case "depart":
      return turn ? `Salí ${turn}${via}` : `Iniciá el recorrido${via}`;
    case "arrive":
      return "Llegaste al destino";
    case "turn":
    case "end of road":
      return turn ? `Doblá ${turn}${via}` : `Doblá${via}`;
    case "new name":
    case "continue":
      return turn && turn !== "derecho"
        ? `Continuá ${turn}${via}`
        : `Seguí derecho${via}`;
    case "merge":
      return turn ? `Incorporate ${turn}${via}` : `Incorporate${via}`;
    case "on ramp":
      return turn ? `Tomá la rampa ${turn}${via}` : `Tomá la rampa${via}`;
    case "off ramp":
      return turn ? `Bajá por la rampa ${turn}${via}` : `Bajá por la rampa${via}`;
    case "fork":
      return turn ? `Mantenete ${turn} en el cruce${via}` : `Tomá el desvío${via}`;
    case "roundabout":
    case "rotary":
    case "roundabout turn":
      return exit
        ? `En la rotonda, tomá la salida ${exit}${via}`
        : `Entrá a la rotonda${via}`;
    case "exit roundabout":
    case "exit rotary":
      return exit
        ? `Salí de la rotonda por la salida ${exit}${via}`
        : `Salí de la rotonda${via}`;
    case "notification":
      return via ? `Continuá${via}` : "Continuá por el camino";
    default:
      return turn ? `Doblá ${turn}${via}` : `Continuá${via || " por el camino"}`;
  }
}
