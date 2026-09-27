import type { UserRole } from "@/types/sihe";

export const REMEMBER_SESSION_KEY = "sihe-remember-session";
export const AUTH_STORAGE_KEY = "sihe-auth";

export const LOGIN_ERROR_CREDENTIALS =
  "Email o contraseña incorrectos.";
export const LOGIN_ERROR_INACTIVE =
  "Su cuenta está desactivada. Contacte al administrador.";

export function setRememberSession(remember: boolean): void {
  if (remember) {
    localStorage.setItem(REMEMBER_SESSION_KEY, "1");
    return;
  }
  localStorage.removeItem(REMEMBER_SESSION_KEY);
}

export function shouldRememberSession(): boolean {
  return localStorage.getItem(REMEMBER_SESSION_KEY) === "1";
}

function storeForAuth(): Storage {
  return shouldRememberSession() ? localStorage : sessionStorage;
}

/** localStorage si marcó «Mantener sesión»; si no, solo dura la pestaña. */
export const authStorage = {
  getItem: (key: string) => storeForAuth().getItem(key),
  setItem: (key: string, value: string) => {
    const active = storeForAuth();
    const other = active === localStorage ? sessionStorage : localStorage;
    other.removeItem(key);
    active.setItem(key, value);
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  },
};

export function homePathForRole(role: UserRole): string {
  return role === "administrador" ? "/admin" : "/mapa";
}

export function loginErrorFromAuth(message: string | undefined): string {
  if (!message) return "No se pudo iniciar sesión.";
  if (/invalid login credentials|invalid_credentials/i.test(message)) {
    return LOGIN_ERROR_CREDENTIALS;
  }
  return message;
}
