import type { UserRole } from "@/types/sihe";

const LABELS: Record<UserRole, string> = {
  operador: "Operador",
  administrador: "Administrador",
};

export function roleLabel(role: UserRole): string {
  return LABELS[role] ?? role;
}
