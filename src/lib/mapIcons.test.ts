import { describe, expect, it } from "vitest";
import { resourceGlyphSvg, resourceMapIcon } from "./mapIcons";

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

  it("cada tipo de recurso produce un SVG distinto", () => {
    const hidranteSvg = resourceGlyphSvg("hidrante");
    const espejoSvg = resourceGlyphSvg("espejo");
    const tanqueSvg = resourceGlyphSvg("tanque");

    expect(hidranteSvg).not.toBe(espejoSvg);
    expect(hidranteSvg).not.toBe(tanqueSvg);
    expect(espejoSvg).not.toBe(tanqueSvg);

    expect(hidranteSvg).toContain("<svg");
    expect(espejoSvg).toContain("<svg");
    expect(tanqueSvg).toContain("<svg");
  });

  it("ningún tipo de recurso usa el ícono de llama", () => {
    const flamePath = "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6";
    
    const hidranteSvg = resourceGlyphSvg("hidrante");
    const espejoSvg = resourceGlyphSvg("espejo");
    const tanqueSvg = resourceGlyphSvg("tanque");

    expect(hidranteSvg).not.toContain(flamePath);
    expect(espejoSvg).not.toContain(flamePath);
    expect(tanqueSvg).not.toContain(flamePath);
  });

  it("hidrante usa el ícono de hidrante", () => {
    const hidranteSvg = resourceGlyphSvg("hidrante");
    expect(hidranteSvg).toContain("M7 12V7h2v5");
  });

  it("espejo usa el ícono de gota", () => {
    const espejoSvg = resourceGlyphSvg("espejo");
    expect(espejoSvg).toContain("M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z");
  });

  it("tanque usa el ícono de tanque elevado", () => {
    const tanqueSvg = resourceGlyphSvg("tanque");
    expect(tanqueSvg).toContain('ellipse cx="12" cy="19"');
  });
});
