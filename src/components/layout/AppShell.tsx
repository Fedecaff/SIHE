import { NavLink, Outlet } from "react-router-dom";
import { UserRole } from "@/types/sihe";
import { useAuth } from "@/app/providers";
import { Header } from "@/components/layout/Header";

export function AppShell() {
  const { user } = useAuth();
  const isAdmin = user?.role === UserRole.Administrador;

  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
      <nav className="app-mobile-nav" aria-label="Móvil">
        <NavLink to="/mapa" className={mobileNavClass}>
          Mapa
        </NavLink>
        <NavLink to="/listado" className={mobileNavClass}>
          Listado
        </NavLink>
        {isAdmin ? (
          <NavLink to="/admin" className={mobileNavClass}>
            Admin
          </NavLink>
        ) : null}
      </nav>
    </div>
  );
}

function mobileNavClass({ isActive }: { isActive: boolean }): string {
  return isActive ? "mobile-nav-link is-active" : "mobile-nav-link";
}
