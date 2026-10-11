import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import type { AuthUser } from "@/types/sihe";
import { UserRole } from "@/types/sihe";
import { RequireRole } from "@/app/guards";

const { auth } = vi.hoisted(() => ({
  auth: {
    user: null as AuthUser | null,
    loading: false,
  },
}));

vi.mock("@/app/providers", () => ({
  useAuth: () => auth,
}));

function renderAlta(role: AuthUser["role"]) {
  auth.loading = false;
  auth.user = {
    id: "user-1",
    email: "user@sihe.test",
    name: "Usuario",
    institution: "Cuartel",
    role,
  };

  return render(
    <MemoryRouter initialEntries={["/admin/incendios/nuevo"]}>
      <Routes>
        <Route element={<RequireRole roles={[UserRole.Administrador]} />}>
          <Route
            path="/admin/incendios/nuevo"
            element={<h1>Registrar incendio</h1>}
          />
        </Route>
        <Route path="/mapa" element={<h1>Mapa</h1>} />
        <Route path="/login" element={<h1>Login</h1>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("RequireRole en el alta de incendio", () => {
  it("manda al mapa a un operador", () => {
    renderAlta(UserRole.Operador);
    expect(screen.getByRole("heading", { name: "Mapa" })).toBeTruthy();
    expect(screen.queryByRole("heading", { name: "Registrar incendio" })).toBeNull();
  });

  it("deja pasar a un administrador", () => {
    renderAlta(UserRole.Administrador);
    expect(
      screen.getByRole("heading", { name: "Registrar incendio" }),
    ).toBeTruthy();
  });
});
