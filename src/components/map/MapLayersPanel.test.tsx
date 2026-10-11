import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  BASE_LAYER_ESRI_SAT,
  BASE_LAYER_OSM,
  OVERLAY_FIRMS,
} from "@/lib/mapConstants";
import { MapLayersPanel } from "@/components/map/MapLayersPanel";

function renderPanel(overlays: string[] = []) {
  const onBase = vi.fn();
  const onOverlay = vi.fn();
  render(
    <MapLayersPanel
      baseLayer={BASE_LAYER_OSM}
      overlays={overlays}
      date="2026-10-10"
      windowMode="24h"
      source="VIIRS_SNPP_NRT"
      confidence="todas"
      minFrp=""
      opacity={1}
      showFireHeat={false}
      showFirePoints={false}
      firePeriod="12m"
      onBase={onBase}
      onOverlay={onOverlay}
      onDate={vi.fn()}
      onWindow={vi.fn()}
      onSource={vi.fn()}
      onConfidence={vi.fn()}
      onMinFrp={vi.fn()}
      onOpacity={vi.fn()}
      onHeat={vi.fn()}
      onPoints={vi.fn()}
      onPeriod={vi.fn()}
    />,
  );
  return { onBase, onOverlay };
}

describe("MapLayersPanel", () => {
  it("muestra los grupos y las etiquetas claras", () => {
    renderPanel();
    expect(screen.getByText("Mapa base")).toBeTruthy();
    expect(screen.getByText("Fuego satelital (NASA)")).toBeTruthy();
    expect(screen.getByText("Incendios registrados en SIHE")).toBeTruthy();
    expect(screen.getByText("Calles (OpenStreetMap)")).toBeTruthy();
    expect(screen.getByText("Focos de calor FIRMS")).toBeTruthy();
  });

  it("elegir una base llama a changeBase con la constante interna", () => {
    const { onBase } = renderPanel();
    fireEvent.click(screen.getByRole("radio", { name: /Satélite \(Esri\)/ }));
    expect(onBase).toHaveBeenCalledWith(BASE_LAYER_ESRI_SAT);
  });

  it("activar FIRMS llama a changeOverlay con la constante", () => {
    const { onOverlay } = renderPanel();
    fireEvent.click(screen.getByRole("checkbox", { name: /Focos de calor FIRMS/ }));
    expect(onOverlay).toHaveBeenCalledWith(OVERLAY_FIRMS, true);
  });

  it("sin capas de fuego no muestra Ventana, Confianza ni Avanzado", () => {
    renderPanel();
    expect(screen.queryByText("Ventana")).toBeNull();
    expect(screen.queryByText("Confianza")).toBeNull();
    expect(screen.queryByText("Avanzado")).toBeNull();
  });

  it("con FIRMS activo muestra Ventana y Confianza, y Avanzado arranca plegado", () => {
    renderPanel([OVERLAY_FIRMS]);
    expect(screen.getByText("Ventana")).toBeTruthy();
    expect(screen.getByText("Confianza")).toBeTruthy();
    expect(screen.getByText("Fecha de imagen")).toBeTruthy();
    expect(screen.getByText("Avanzado").closest("details")?.hasAttribute("open")).toBe(false);
  });
});
