import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserRole } from "@/types/sihe";
import { useAuth } from "@/app/useAuth";
import { NotificationBell } from "@/components/layout/NotificationBell";
import { roleLabel } from "@/lib/roleLabel";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

type HeaderProps = {
  pendingIncidentCount?: number;
};

export function Header({ pendingIncidentCount = 0 }: HeaderProps) {
  const { user, logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const isAdmin = user?.role === UserRole.Administrador;

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
        {isAdmin ? (
          <NavLink to="/admin" className={navClass}>
            Admin
          </NavLink>
        ) : null}
      </nav>

      <div className="app-header-user">
        {isAdmin ? (
          <NotificationBell pendingCount={pendingIncidentCount} />
        ) : null}
        <span className="app-header-name">{user?.name}</span>
        {user ? (
          <span className={`app-header-role role-${user.role}`}>
            {roleLabel(user.role)}
          </span>
        ) : null}
        <button
          type="button"
          className="btn-toolbar app-header-logout"
          onClick={() => setShowLogoutConfirm(true)}
        >
          Salir
        </button>
      </div>

      <ConfirmDialog
        isOpen={showLogoutConfirm}
        title="¿Cerrar sesión?"
        message="Tendrás que volver a ingresar para usar SIHE."
        confirmLabel="Cerrar sesión"
        cancelLabel="Cancelar"
        onConfirm={() => {
          setShowLogoutConfirm(false);
          void logout();
        }}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </header>
  );
}

function navClass({ isActive }: { isActive: boolean }): string {
  return isActive ? "app-nav-link is-active" : "app-nav-link";
}
