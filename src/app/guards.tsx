import { Navigate, Outlet } from "react-router-dom";
import type { UserRole } from "@/types/sihe";
import { homePathForRole } from "@/lib/authSession";
import { useAuth } from "@/app/providers";
import { Spinner } from "@/components/ui/Spinner";

export function PublicOnly() {
  const { user, loading } = useAuth();
  if (loading) return <Spinner className="page-center" />;
  if (user) return <Navigate to={homePathForRole(user.role)} replace />;
  return <Outlet />;
}

export function RequireAuth() {
  const { user, loading } = useAuth();
  if (loading) return <Spinner className="page-center" />;
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export function RequireRole({ roles }: { roles: UserRole[] }) {
  const { user, loading } = useAuth();
  if (loading) return <Spinner className="page-center" />;
  if (!user) return <Navigate to="/login" replace />;
  if (!roles.includes(user.role)) return <Navigate to="/mapa" replace />;
  return <Outlet />;
}
