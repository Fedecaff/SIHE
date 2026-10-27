import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { formatDateTime } from "@/lib/incidentLabels";
import { FireDetailPage } from "@/pages/FireDetailPage";

const { fetchFireEventById } = vi.hoisted(() => ({
  fetchFireEventById: vi.fn(),
}));

vi.mock("@/services/fires", () => ({
  fetchFireEventById,
  isFireEventId: (id: string) =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id),
  fireTypeLabel: (type: string) => {
    if (type === "incendio_forestal") return "Incendio forestal";
    if (type === "incendio_urbano") return "Incendio urbano";
    return type;
  },
}));

vi.mock("react-leaflet", () => ({
  MapContainer: ({ children }: { children?: ReactNode }) => (
    <div>{children}</div>
  ),
  CircleMarker: ({ center }: { center: [number, number] }) => (
    <span>{`Marcador ${center[0]},${center[1]}`}</span>
  ),
  TileLayer: () => null,
  WMSTileLayer: () => null,
  LayerGroup: ({ children }: { children?: ReactNode }) => children,
  Popup: () => null,
}));

const FIRE_ID = "11111111-1111-4111-8111-111111111111";

const fire = {
  id: FIRE_ID,
  event_type: "incendio_forestal",
  occurred_at: "2024-06-01T18:30:00.000Z",
  description: "Barrio norte",
  linked_resource_id: null,
  lat: -28.47,
  lng: -65.78,
};

function renderAt(id: string) {
  return render(
    <MemoryRouter initialEntries={[`/incendios/${id}`]}>
      <Routes>
        <Route path="/incendios/:id" element={<FireDetailPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("FireDetailPage", () => {
  beforeEach(() => {
    fetchFireEventById.mockReset();
  });

  it("con un id válido muestra el tipo, la fecha y el mapa", async () => {
    fetchFireEventById.mockResolvedValue(fire);
    renderAt(FIRE_ID);

    expect(
      await screen.findByRole("heading", { name: "Incendio forestal" }),
    ).toBeTruthy();
    const fecha = screen.getByText("Fecha").parentElement?.querySelector("dd");
    expect(fecha?.textContent).toBe(formatDateTime(fire.occurred_at));
    expect(
      screen.getByRole("region", { name: "Mapa del incendio" }),
    ).toBeTruthy();
    expect(screen.getByText("Marcador -28.47,-65.78")).toBeTruthy();
    expect(screen.getByText("Barrio norte")).toBeTruthy();
  });

  it("con un id inexistente muestra el aviso y el link para volver al mapa", async () => {
    fetchFireEventById.mockResolvedValue(null);
    renderAt(FIRE_ID);

    expect(await screen.findByRole("alert")).toHaveProperty(
      "textContent",
      "Evento no encontrado",
    );
    const back = screen.getByRole("link", { name: "Volver al mapa" });
    expect(back.getAttribute("href")).toBe("/mapa");
  });

  it("con un error de red muestra un mensaje en español, sin detalles técnicos", async () => {
    fetchFireEventById.mockRejectedValue(new Error("Failed to fetch"));
    renderAt(FIRE_ID);

    expect((await screen.findByRole("alert")).textContent).toBe(
      "Sin conexión. Revisá la red e intentá de nuevo.",
    );
    expect(screen.queryByText(/Failed to fetch|supabase|postgres/i)).toBeNull();
  });

  it("con un id que no es uuid no consulta y avisa que no existe", () => {
    renderAt("no-es-un-id");

    expect(screen.getByRole("alert").textContent).toBe("Evento no encontrado");
    expect(fetchFireEventById).not.toHaveBeenCalled();
    expect(
      screen.getByRole("link", { name: "Volver al mapa" }).getAttribute("href"),
    ).toBe("/mapa");
  });
});
