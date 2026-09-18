import { Link, NavLink } from "react-router-dom";
import { UserRole } from "@/types/sihe";
import { useAuth } from "@/app/providers";
import { roleLabel } from "@/lib/roleLabel";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="app-header">
      <div className="app-header-brand">
        <Link to="/mapa" className="app-header-logo">
          SIHE
        </Link>
        <span className="app-header-place">
          San Fernando del Valle de Catamarca
        </span>
      </div>

      <nav className="app-header-nav" aria-label="Principal">
        <NavLink to="/mapa" className={navClass}>
          Mapa
        </NavLink>
        <NavLink to="/listado" className={navClass}>
          Listado
        </NavLink>
        {user?.role === UserRole.Administrador ? (
          <NavLink to="/admin" className={navClass}>
            Admin
          </NavLink>
        ) : null}
      </nav>

      <div className="app-header-user">
        <span className="app-header-name">{user?.name}</span>
        {user ? (
          <span className={`app-header-role role-${user.role}`}>
            {roleLabel(user.role)}
          </span>
        ) : null}
        <button
          type="button"
          className="btn-header-logout"
          onClick={() => void logout()}
        >
          Salir
        </button>
      </div>
    </header>
  );
}

function navClass({ isActive }: { isActive: boolean }): string {
  return isActive ? "app-nav-link is-active" : "app-nav-link";
}
