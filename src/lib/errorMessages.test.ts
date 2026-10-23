import { describe, expect, it } from "vitest";
import { toUserMessage } from "@/lib/errorMessages";

describe("toUserMessage", () => {
  it("credenciales inválidas → Email o contraseña incorrectos", () => {
    expect(toUserMessage(new Error("Invalid login credentials"))).toBe(
      "Email o contraseña incorrectos",
    );
  });

  it("red caída → mensaje de conexión", () => {
    expect(toUserMessage(new Error("Failed to fetch"))).toBe(
      "Sin conexión. Revisá la red e intentá de nuevo.",
    );
  });

  it("sin permiso → mensaje de permiso", () => {
    expect(toUserMessage(new Error("permission denied for table"))).toBe(
      "No tenés permiso para esta acción.",
    );
  });

  it("error técnico en inglés → genérico", () => {
    expect(toUserMessage(new Error("TypeError: Cannot read property of undefined"))).toBe(
      "No se pudo completar la acción.",
    );
  });

  it("mensaje en español se conserva", () => {
    expect(toUserMessage(new Error("Marcá en el mapa dónde fue el incendio."))).toBe(
      "Marcá en el mapa dónde fue el incendio.",
    );
  });

  it("sin error usa el fallback", () => {
    expect(toUserMessage(null, "No se pudo iniciar sesión.")).toBe(
      "No se pudo iniciar sesión.",
    );
  });
});
