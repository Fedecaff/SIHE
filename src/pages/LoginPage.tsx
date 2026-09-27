import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/app/providers";
import { homePathForRole } from "@/lib/authSession";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberSession, setRememberSession] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const profile = await login(email, password, rememberSession);
      navigate(homePathForRole(profile.role), { replace: true });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No se pudo iniciar sesión.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="login-shell">
      <div className="login-stack">
        <form className="login-card" onSubmit={onSubmit} noValidate>
          <h1 className="login-brand">SIHE</h1>
          <p className="login-subtitle">
            Sistema Integral Hídrico de Emergencia
          </p>
          <label className="field">
            <span>Email</span>
            <input
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@institucion.gob.ar"
              required
            />
          </label>
          <label className="field">
            <span>Contraseña</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </label>
          <label className="field field-check">
            <input
              type="checkbox"
              checked={rememberSession}
              onChange={(e) => setRememberSession(e.target.checked)}
            />
            <span>Mantener sesión</span>
          </label>
          {error ? (
            <p className="form-error" role="alert">
              {error}
            </p>
          ) : null}
          <button className="btn-primary" type="submit" disabled={submitting}>
            {submitting ? "Ingresando…" : "Iniciar sesión"}
          </button>
          <p className="login-help">
            ¿Problemas para acceder? Contacte al administrador del sistema.
          </p>
        </form>
        <p className="login-note">
          Sin registro público. El administrador crea las cuentas.
        </p>
      </div>
    </div>
  );
}
