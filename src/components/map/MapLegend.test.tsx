import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MapLegend } from "@/components/map/MapLegend";

describe("MapLegend", () => {
  it("sin overlays no hay sección de fuego satelital", () => {
    render(<MapLegend embedded />);
    expect(screen.queryByText("Fuego satelital")).toBeNull();
    expect(screen.queryByText("Confianza alta")).toBeNull();
  });

  it("con FIRMS aparecen los tres colores de confianza", () => {
    render(<MapLegend embedded showFirms firmsLabel="4 focos · 24 h" />);
    expect(
      screen.getByText(/Focos de calor detectados por satélite/),
    ).toBeTruthy();
    expect(screen.getByText("Confianza alta")).toBeTruthy();
    expect(screen.getByText("Confianza nominal")).toBeTruthy();
    expect(screen.getByText("Confianza baja")).toBeTruthy();
    expect(screen.getByText("4 focos · 24 h")).toBeTruthy();
  });

  it("con MODIS y WMS muestra ayuda en lenguaje llano", () => {
    render(<MapLegend embedded showModis showWms />);
    expect(
      screen.getByText(/Falso color: rojo o marrón puede ser un área quemada/),
    ).toBeTruthy();
    expect(
      screen.getByText(/Manchas de calor satelital dibujadas sobre el mapa/),
    ).toBeTruthy();
  });

  it("con Tipo hidrante solo se lista hidrante", () => {
    render(<MapLegend embedded typeFilter="hidrante" />);
    expect(screen.getByText("Hidrante")).toBeTruthy();
    expect(screen.queryByText("Espejo de agua")).toBeNull();
    expect(screen.queryByText("Tanque")).toBeNull();
  });
});
