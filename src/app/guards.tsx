import { Navigate, Outlet } from "react-router-dom";
import type { UserRole } from "@/types/sihe";
import { useAuth } from "@/app/providers";

export function PublicOnly() {
  const { user, loading } = useAuth();
  if (loading) return <p className="page-center">Cargando…</p>;
  if (user) return <Navigate to="/mapa" replace />;
  return <Outlet />;
}

export function RequireAuth() {
  const { user, loading } = useAuth();
  if (loading) return <p className="page-center">Cargando…</p>;
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export function RequireRole({ roles }: { roles: UserRole[] }) {
  const { user, loading } = useAuth();
  if (loading) return <p className="page-center">Cargando…</p>;
  if (!user) return <Navigate to="/login" replace />;
  if (!roles.includes(user.role)) return <Navigate to="/mapa" replace />;
  return <Outlet />;
}
