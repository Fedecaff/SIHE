type Props = {
  label?: string;
  className?: string;
};

export function Spinner({ label = "Cargando…", className }: Props) {
  return (
    <div
      className={className ? `app-spinner ${className}` : "app-spinner"}
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="app-spinner-mark" aria-hidden="true" />
      <span className="app-spinner-label">{label}</span>
    </div>
  );
}
