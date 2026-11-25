import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { LoginPage } from "@/pages/LoginPage";

vi.mock("@/app/useAuth", () => ({
  useAuth: () => ({ login: vi.fn() }),
}));

describe("LoginPage", () => {
  it("renderiza exactamente un main", () => {
    const { container } = render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    const mains = container.querySelectorAll("main");
    expect(mains).toHaveLength(1);
    expect(mains[0]?.classList.contains("login-shell")).toBe(true);
  });
});
