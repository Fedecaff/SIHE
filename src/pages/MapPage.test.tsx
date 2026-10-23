import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MapPage } from "@/pages/MapPage";

const { closeRoute } = vi.hoisted(() => ({
  closeRoute: vi.fn(),
}));

vi.mock("leaflet", () => ({
  default: {
    divIcon: () => ({}),
    latLngBounds: () => ({}),
  },
}));

vi.mock("react-leaflet", () => ({
  MapContainer: ({ children }: { children?: unknown }) => children,
  TileLayer: () => null,
  WMSTileLayer: () => null,
  Marker: () => null,
  Circle: () => null,
  CircleMarker: () => null,
  Popup: ({ children }: { children?: unknown }) => children,
  LayerGroup: ({ children }: { children?: unknown }) => children,
  Polyline: () => null,
  useMap: () => ({
    setView: vi.fn(),
    panInside: vi.fn(),
    fitBounds: vi.fn(),
    zoomIn: vi.fn(),
    zoomOut: vi.fn(),
    getPane: () => ({}),
    createPane: () => ({ style: {} }),
  }),
  useMapEvents: () => null,
}));

vi.mock("react-leaflet-cluster", () => ({
  default: ({ children }: { children?: unknown }) => children,
}));

vi.mock("@/app/providers", () => ({
  useAuth: () => ({ user: null }),
}));

vi.mock("@/services/resources", () => ({
  fetchResourcesMap: vi.fn().mockResolvedValue([]),
}));

vi.mock("@/services/fires", () => ({
  fetchFireEventsMap: vi.fn().mockResolvedValue([]),
}));

vi.mock("@/services/geocode", () => ({
  geocodeCityAddress: vi.fn(),
}));

vi.mock("@/hooks/useSatelliteLayers", () => ({
  useSatelliteLayers: () => ({
    baseLayer: "Mapa (OSM)",
    overlays: [] as string[],
    date: "2026-10-10",
    windowMode: "24h",
    source: "VIIRS_SNPP_NRT",
    confidence: "todas",
    minFrp: "",
    opacity: 1,
    hotspots: [],
    firmsError: null,
    firmsLabel: null,
    tileWarning: null,
    setDate: vi.fn(),
    setWindowMode: vi.fn(),
    setSource: vi.fn(),
    setConfidence: vi.fn(),
    setMinFrp: vi.fn(),
    setOpacity: vi.fn(),
    changeBase: vi.fn(),
    changeOverlay: vi.fn(),
    reportTileError: vi.fn(),
  }),
}));

vi.mock("@/hooks/useRoute", () => ({
  useRoute: () => ({
    destination: {
      lat: -28.47,
      lng: -65.78,
      label: "Cuartel",
      kind: "direccion" as const,
    },
    origin: { lat: -28.5, lng: -65.8 },
    route: { geometry: [], distanceM: 1200, durationS: 240, steps: [] },
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
    closeRoute,
    setFollowLive: vi.fn(),
  }),
}));

describe("MapPage", () => {
  beforeEach(() => {
    closeRoute.mockReset();
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
      }),
    });
  });

  it("con una ruta activa, abrir Filtros muestra Volver a la ruta y no cierra la ruta", () => {
    render(
      <MemoryRouter>
        <MapPage />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Filtros" }));
    expect(screen.getByRole("button", { name: "← Volver a la ruta" })).toBeTruthy();
    expect(closeRoute).not.toHaveBeenCalled();
    expect(screen.queryByRole("button", { name: "Mostrar panel" })).toBeNull();
    expect(screen.queryByRole("button", { name: "Ocultar panel" })).toBeNull();
  });

  it("en escritorio el botón del panel no queda dentro del buscador", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query: string) => ({
        matches: query.includes("1024") || query.includes("1280"),
        media: query,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
      }),
    });
    render(
      <MemoryRouter>
        <MapPage />
      </MemoryRouter>,
    );

    const hide = screen.getByRole("button", { name: "Ocultar panel" });
    const dock = screen.getByRole("complementary", { name: "Herramientas del mapa" });
    expect(dock.contains(hide)).toBe(true);
    expect(screen.getByRole("search").contains(hide)).toBe(false);
    expect(screen.getByPlaceholderText("Dirección o intersección")).toBeTruthy();

    fireEvent.click(hide);
    const show = screen.getByRole("button", { name: "Mostrar panel" });
    expect(show.parentElement?.classList.contains("map-search-row")).toBe(true);
    expect(show.parentElement?.contains(screen.getByRole("search"))).toBe(true);
    expect(screen.getByRole("search").contains(show)).toBe(false);
    expect(screen.queryByRole("complementary", { name: "Herramientas del mapa" })).toBeNull();
  });
});
