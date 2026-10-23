import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ToastProvider } from "@/app/providers";
import { AdminCreateFirePage } from "@/pages/AdminCreateFirePage";

const { createFireEventAdmin, onClick } = vi.hoisted(() => ({
  createFireEventAdmin: vi.fn(),
  onClick: {
    current: null as
      | null
      | ((e: {
          latlng: { wrap: () => { lat: number; lng: number } };
        }) => void),
  },
}));

vi.mock("leaflet", () => ({
  default: {
    divIcon: () => ({}),
  },
}));

vi.mock("react-leaflet", () => ({
  MapContainer: ({ children }: { children?: unknown }) => children,
  TileLayer: () => null,
  Marker: () => null,
  useMapEvents: (handlers: {
    click?: (e: {
      latlng: { wrap: () => { lat: number; lng: number } };
    }) => void;
  }) => {
    onClick.current = handlers.click ?? null;
    return null;
  },
}));

vi.mock("@/services/fires", () => ({
  createFireEventAdmin,
}));

vi.mock("@/hooks/useUnsavedChanges", () => ({
  useUnsavedChanges: () => undefined,
}));

vi.mock("@/app/providers", async () => {
  const actual = await vi.importActual<typeof import("@/app/providers")>(
    "@/app/providers",
  );
  return {
    ...actual,
    useAuth: () => ({
      user: { id: "user-test", name: "Test", role: "administrador" },
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
    }),
  };
});

function renderPage() {
  return render(
    <ToastProvider>
      <MemoryRouter initialEntries={["/admin/incendios/nuevo"]}>
        <Routes>
          <Route path="/admin/incendios/nuevo" element={<AdminCreateFirePage />} />
          <Route path="/incendios/:id" element={<p>detalle incendio</p>} />
        </Routes>
      </MemoryRouter>
    </ToastProvider>,
  );
}

function pickPoint() {
  act(() => {
    onClick.current?.({
      latlng: {
        wrap: () => ({ lat: -28.47, lng: -65.78 }),
      },
    });
  });
}

describe("AdminCreateFirePage", () => {
  beforeEach(() => {
    createFireEventAdmin.mockReset();
    onClick.current = null;
  });

  it("sin punto muestra error y no llama al alta", () => {
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: "Guardar incendio" }));
    expect(screen.getByRole("alert").textContent).toContain(
      "Marcá en el mapa dónde fue el incendio.",
    );
    expect(createFireEventAdmin).not.toHaveBeenCalled();
  });

  it("una fecha futura muestra error", () => {
    renderPage();
    pickPoint();
    fireEvent.change(screen.getByLabelText("Fecha y hora"), {
      target: { value: "2099-01-01T12:00" },
    });
    const form = screen
      .getByRole("button", { name: "Guardar incendio" })
      .closest("form");
    if (!form) throw new Error("Falta el formulario");
    fireEvent.submit(form);
    expect(screen.getByRole("alert").textContent).toBe(
      "La fecha y hora no pueden ser futuras",
    );
    expect(createFireEventAdmin).not.toHaveBeenCalled();
  });

  it("con datos válidos guarda en ISO UTC y abre el detalle", async () => {
    createFireEventAdmin.mockResolvedValue("fire-1");
    renderPage();
    const when = "2024-06-01T15:30";
    fireEvent.change(screen.getByLabelText("Fecha y hora"), {
      target: { value: when },
    });
    pickPoint();
    fireEvent.click(screen.getByRole("button", { name: "Guardar incendio" }));

    expect(await screen.findByText("detalle incendio")).toBeTruthy();
    expect(createFireEventAdmin).toHaveBeenCalledWith({
      eventType: "incendio_forestal",
      occurredAt: new Date(when).toISOString(),
      lat: -28.47,
      lng: -65.78,
      description: "",
    });
  });

  it("muestra el error del RPC con role=alert", async () => {
    createFireEventAdmin.mockRejectedValue(new Error("sin permiso"));
    renderPage();
    fireEvent.change(screen.getByLabelText("Fecha y hora"), {
      target: { value: "2024-06-01T15:30" },
    });
    pickPoint();
    fireEvent.click(screen.getByRole("button", { name: "Guardar incendio" }));

    expect((await screen.findByRole("alert")).textContent).toBe("sin permiso");
  });
});
