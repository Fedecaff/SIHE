import { Link } from "react-router-dom";

type NotificationBellProps = {
  pendingCount: number;
};

export function NotificationBell({ pendingCount }: NotificationBellProps) {
  const shown = pendingCount > 99 ? "99+" : String(pendingCount);
  const label =
    pendingCount > 0
      ? `${pendingCount} incidencia${pendingCount === 1 ? "" : "s"} pendiente${pendingCount === 1 ? "" : "s"}`
      : "Notificaciones";

  return (
    <Link
      to="/admin/incidencias"
      className="header-bell"
      aria-label={label}
      title={label}
    >
      <BellIcon />
      {pendingCount > 0 ? (
        <span className="header-bell-badge">{shown}</span>
      ) : null}
    </Link>
  );
}

function BellIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}
