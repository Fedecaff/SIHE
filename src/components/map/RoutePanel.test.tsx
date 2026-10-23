import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { RoutePanel } from "./RoutePanel";

const mockRoute = vi.hoisted(() => ({
  destination: null as any,
  route: null as any,
  loading: false,
  error: null,
  needsOrigin: false,
  pickingOriginOnMap: false,
  pickingDestinationOnMap: false,
  followLive: false,
  startTo: vi.fn(),
  setOriginFromAddress: vi.fn(),
  beginPickOriginOnMap: vi.fn(),
  setOriginFromMap: vi.fn(),
  beginPickDestinationOnMap: vi.fn(),
  setDestinationFromMap: vi.fn(),
  cancelPickDestination: vi.fn(),
  closeRoute: vi.fn(),
  setFollowLive: vi.fn(),
}));

vi.mock("@/hooks/useRoute", () => ({
  useRoute: () => mockRoute,
}));

describe("RoutePanel", () => {
  beforeEach(() => {
    mockRoute.destination = null;
    mockRoute.route = null;
    mockRoute.loading = false;
    mockRoute.error = null;
  });

  it("el aviso de ruta larga aparece con distancia >300 km", () => {
    mockRoute.destination = {
      lat: -28.47,
      lng: -65.78,
      label: "Lejos",
      kind: "punto" as const,
    };
    mockRoute.route = {
      geometry: [],
      distanceM: 350000,
      durationS: 14400,
      steps: [],
    };

    render(<RoutePanel />);

    expect(screen.getByText(/Ruta larga: 350 km, aprox\. 4 h 0 min/)).toBeTruthy();
  });

  it("el aviso NO aparece con distancia <300 km", () => {
    mockRoute.destination = {
      lat: -28.47,
      lng: -65.78,
      label: "Cerca",
      kind: "punto" as const,
    };
    mockRoute.route = {
      geometry: [],
      distanceM: 50000,
      durationS: 1200,
      steps: [],
    };

    render(<RoutePanel />);

    expect(screen.queryByText(/Ruta larga/)).toBeNull();
  });
});
