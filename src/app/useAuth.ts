import { createContext, useContext } from "react";
import type { AuthUser } from "@/types/sihe";

export type AuthState = {
  user: AuthUser | null;
  loading: boolean;
  login: (
    email: string,
    password: string,
    rememberSession?: boolean,
  ) => Promise<AuthUser>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthState | null>(null);

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
