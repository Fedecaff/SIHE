import type { ReactNode } from "react";
import { readFileSync } from "node:fs";
import path from "node:path";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { MapView } from "@/components/map/MapView";
import type { ResourceMapItem } from "@/types/sihe";

const { createdIcons } = vi.hoisted(() => ({
  createdIcons: [] as Array<{ html?: string }>,
}));

vi.mock("leaflet", () => ({
  default: {
    divIcon: (options: { html?: string }) => {
      createdIcons.push(options);
      return options;
    },
    point: () => ({}),
    latLngBounds: () => ({}),
  },
}));

vi.mock("react-leaflet", () => ({
  MapContainer: ({ children }: { children?: ReactNode }) => <div>{children}</div>,
  TileLayer: () => null,
  WMSTileLayer: () => null,
  Circle: () => null,
  Popup: ({ children }: { children?: ReactNode }) => <div>{children}</div>,
  LayerGroup: ({ children }: { children?: ReactNode }) => <div>{children}</div>,
  Polyline: () => null,
  Marker: ({ title, children }: { title?: string; children?: ReactNode }) => (
    <div role="img" title={title ?? ""}>
      {children}
    </div>
  ),
  CircleMarker: ({
    eventHandlers,
    children,
  }: {
    eventHandlers?: {
      add?: (event: { target: { getElement: () => HTMLElement } }) => void;
    };
    children?: ReactNode;
  }) => {
    const element = document.createElement("div");
    eventHandlers?.add?.({ target: { getElement: () => element } });
    return (
      <div role="img" title={element.getAttribute("title") ?? ""}>
        {children}
      </div>
    );
  },
  useMap: () => ({
    setView: vi.fn(),
    panInside: vi.fn(),
    fitBounds: vi.fn(),
    zoomIn: vi.fn(),
    zoomOut: vi.fn(),
    getPane: () => null,
    createPane: () => ({ style: {} }),
  }),
  useMapEvents: () => null,
}));

vi.mock("react-leaflet-cluster", () => ({
  default: ({
    children,
    iconCreateFunction,
  }: {
    children?: ReactNode;
    iconCreateFunction?: (cluster: { getChildCount: () => number }) => void;
  }) => {
    iconCreateFunction?.({ getChildCount: () => 2 });
    return <div>{children}</div>;
  },
}));

const resource: ResourceMapItem = {
  id: "recurso-1",
  type: "hidrante",
  name: "Hidrante San Martín",
  address: "San Martín 100",
  status: "operativo",
  accessibility: null,
  capacity: null,
  observations: null,
  last_verified_at: null,
  last_verified_by_id: null,
  lat: -28.47,
  lng: -65.78,
};

describe("MapView", () => {
  it("cada marcador tiene un title no vacío", () => {
    createdIcons.length = 0;
    render(
      <MemoryRouter>
        <MapView
          items={[resource]}
          locateToken={0}
          showFirePoints
          userLocation={{ lat: -28.46, lng: -65.77 }}
          addressTarget={{ lat: -28.45, lng: -65.76, token: 1 }}
          addressLabel="Plaza 25 de Mayo"
          fireEvents={[
            {
              id: "incendio-1",
              event_type: "incendio_forestal",
              occurred_at: "2024-06-01T18:30:00.000Z",
              description: "Barrio norte",
              linked_resource_id: null,
              lat: -28.48,
              lng: -65.79,
            },
            {
              id: "incendio-2",
              event_type: "incendio_urbano",
              occurred_at: "2024-07-01T18:30:00.000Z",
              description: "   ",
              linked_resource_id: null,
              lat: -28.49,
              lng: -65.8,
            },
          ]}
        />
      </MemoryRouter>,
    );

    const titles = screen.getAllByRole("img").map((marker) => marker.getAttribute("title"));
    expect(titles).toEqual([
      "Incendio: Barrio norte",
      "Incendio: Incendio urbano",
      "Tu ubicación",
      "Plaza 25 de Mayo",
      "Hidrante San Martín",
    ]);
    expect(titles.every((title) => title && title.trim().length > 0)).toBe(true);

    const cluster = createdIcons.find((icon) => icon.html?.includes("Grupo de"));
    expect(cluster?.html).toContain('title="Grupo de 2 recursos"');
  });
});

describe("SEO del sitio", () => {
  it("index.html describe SIHE en español y robots.txt permite el rastreo", () => {
    const html = readFileSync(path.join(process.cwd(), "index.html"), "utf8");
    const robots = readFileSync(path.join(process.cwd(), "public", "robots.txt"), "utf8");

    expect(html).toContain('<html lang="es">');
    expect(html).toContain(
      '<meta name="description" content="SIHE: sistema de información y registro de incendios para bomberos de Catamarca." />',
    );
    expect(robots).toContain("User-agent: *");
    expect(robots).toContain("Allow: /");
  });
});
