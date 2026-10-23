import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RouteProvider, useRoute } from "./useRoute";

vi.mock("@/services/geocode", () => ({
  geocodeCityAddress: vi.fn().mockResolvedValue({ lat: -28.5, lng: -65.8 }),
}));

vi.mock("@/services/routing", () => ({
  defaultRoutingProvider: {
    getRoute: vi.fn().mockResolvedValue({
      geometry: [{ lat: -28.5, lng: -65.8 }, { lat: -28.47, lng: -65.78 }],
      distanceM: 1200,
      durationS: 240,
      steps: [],
    }),
  },
  RoutingError: class RoutingError extends Error {
    code: string;
    constructor(message: string, code: string) {
      super(message);
      this.code = code;
    }
  },
}));

vi.mock("@/lib/userLocation", () => ({
  getBrowserLocation: vi.fn().mockResolvedValue({ lat: -28.5, lng: -65.8 }),
  watchBrowserLocation: vi.fn(() => 123),
  distanceMeters: vi.fn(() => 100),
}));

describe("useRoute", () => {
  it("al activar modo marcar punto y tocar el mapa se llama a setDestinationFromMap", async () => {
    const { result } = renderHook(() => useRoute(), {
      wrapper: ({ children }) => <RouteProvider>{children}</RouteProvider>,
    });

    act(() => {
      result.current.beginPickDestinationOnMap();
    });

    expect(result.current.pickingDestinationOnMap).toBe(true);
    expect(result.current.destination).toBeNull();

    await act(async () => {
      result.current.setDestinationFromMap({ lat: -28.47, lng: -65.78 });
    });

    expect(result.current.pickingDestinationOnMap).toBe(false);
    expect(result.current.destination).toEqual({
      lat: -28.47,
      lng: -65.78,
      label: "Punto marcado",
      kind: "punto",
    });
  });

  it("con destino marcado la ruta tiene kind 'punto'", async () => {
    const { result } = renderHook(() => useRoute(), {
      wrapper: ({ children }) => <RouteProvider>{children}</RouteProvider>,
    });

    await act(async () => {
      result.current.setDestinationFromMap({ lat: -28.47, lng: -65.78 });
    });

    expect(result.current.destination?.kind).toBe("punto");
    expect(result.current.destination?.label).toBe("Punto marcado");
  });
});
