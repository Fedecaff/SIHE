import { describe, expect, it } from "vitest";
import {
  initialMapPanel,
  mapPanelReducer,
  resolveSheet,
} from "@/lib/mapPanel";

describe("mapPanelReducer", () => {
  it("abrir Capas con Filtros abierto deja solo Capas", () => {
    const withFilters = mapPanelReducer(initialMapPanel, {
      type: "toggle-tool",
      panel: "filtros",
    });
    const next = mapPanelReducer(withFilters, {
      type: "toggle-tool",
      panel: "capas",
    });
    expect(next.tool).toBe("capas");
    expect(resolveSheet(next, { routeActive: false, pickingOrigin: false }).kind).toBe(
      "capas",
    );
  });

  it("tocar el mismo botón cierra el panel", () => {
    const open = mapPanelReducer(initialMapPanel, {
      type: "toggle-tool",
      panel: "leyenda",
    });
    const closed = mapPanelReducer(open, {
      type: "toggle-tool",
      panel: "leyenda",
    });
    expect(closed.tool).toBeNull();
  });

  it("seleccionar un recurso reemplaza el panel", () => {
    const open = mapPanelReducer(initialMapPanel, {
      type: "toggle-tool",
      panel: "filtros",
    });
    const next = mapPanelReducer(open, { type: "select-resource" });
    expect(next.tool).toBeNull();
    expect(next.detail).toBe("recurso");
    expect(next.height).toBe("peek");
  });

  it("con ficha y ruta, abrir Filtros y cerrarlo vuelve a la ruta", () => {
    const card = mapPanelReducer(initialMapPanel, { type: "select-resource" });
    const open = mapPanelReducer(card, { type: "toggle-tool", panel: "filtros" });
    expect(open.detail).toBeNull();
    const closed = mapPanelReducer(open, { type: "escape" });
    expect(
      resolveSheet(closed, { routeActive: true, pickingOrigin: false }).kind,
    ).toBe("ruta");
  });

  it("con ruta activa, abrir Filtros y cerrarlo vuelve a la ruta", () => {
    const open = mapPanelReducer(initialMapPanel, {
      type: "toggle-tool",
      panel: "filtros",
    });
    expect(
      resolveSheet(open, { routeActive: true, pickingOrigin: false }),
    ).toMatchObject({ kind: "filtros", backToRoute: true });
    const closed = mapPanelReducer(open, { type: "escape" });
    expect(
      resolveSheet(closed, { routeActive: true, pickingOrigin: false }).kind,
    ).toBe("ruta");
  });

  it("Escape cierra el panel visible", () => {
    const open = mapPanelReducer(initialMapPanel, { type: "select-address" });
    expect(mapPanelReducer(open, { type: "escape" }).detail).toBeNull();
  });

  it("el reducer no conoce closeRoute", () => {
    const source = mapPanelReducer.toString();
    expect(source).not.toContain("closeRoute");
  });
});
