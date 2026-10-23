import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { UserRole } from "@/types/sihe";

const mockUseAuth = vi.hoisted(() => vi.fn());

vi.mock("@/app/providers", () => ({
  useAuth: mockUseAuth,
  ToastProvider: ({ children }: { children: React.ReactNode }) => children,
}));

function renderHeader() {
  const logout = vi.fn();
  const mockUser = {
    id: "test-id",
    name: "Usuario Test",
    email: "test@example.com",
    role: UserRole.Administrador,
  };

  mockUseAuth.mockReturnValue({
    user: mockUser,
    logout,
    loading: false,
    login: vi.fn(),
  });

  render(
    <BrowserRouter>
      <Header pendingIncidentCount={0} />
    </BrowserRouter>,
  );

  return { logout };
}

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("no cierra sesión al cancelar el diálogo de confirmación", () => {
    const { logout } = renderHeader();

    const salirButton = screen.getByRole("button", { name: "Salir" });
    fireEvent.click(salirButton);

    expect(screen.getByText("¿Cerrar sesión?")).toBeTruthy();

    const cancelarButton = screen.getByRole("button", { name: "Cancelar" });
    fireEvent.click(cancelarButton);

    expect(logout).not.toHaveBeenCalled();
  });

  it("cierra sesión al confirmar en el diálogo", () => {
    const { logout } = renderHeader();

    const salirButton = screen.getByRole("button", { name: "Salir" });
    fireEvent.click(salirButton);

    expect(screen.getByText("¿Cerrar sesión?")).toBeTruthy();

    const confirmarButton = screen.getByRole("button", { name: "Cerrar sesión" });
    fireEvent.click(confirmarButton);

    expect(logout).toHaveBeenCalled();
  });
});
