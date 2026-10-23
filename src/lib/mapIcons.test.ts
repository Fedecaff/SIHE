import { describe, expect, it } from "vitest";
import { resourceMapIcon } from "./mapIcons";

describe("mapIcons", () => {
  it("el caché de resourceMapIcon devuelve la misma instancia para el mismo tipo+estado", () => {
    const icon1 = resourceMapIcon("hidrante", "operativo");
    const icon2 = resourceMapIcon("hidrante", "operativo");

    expect(icon1).toBe(icon2);
  });

  it("el caché devuelve instancias distintas para tipo+estado diferentes", () => {
    const icon1 = resourceMapIcon("hidrante", "operativo");
    const icon2 = resourceMapIcon("espejo", "operativo");
    const icon3 = resourceMapIcon("hidrante", "no_utilizable");

    expect(icon1).not.toBe(icon2);
    expect(icon1).not.toBe(icon3);
    expect(icon2).not.toBe(icon3);
  });
});
