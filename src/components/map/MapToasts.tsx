export type MapToast = {
  id: string;
  text: string;
  tone: "alert" | "status";
};

type Props = {
  items: MapToast[];
  onDismiss: (item: MapToast) => void;
};

export function MapToasts({ items, onDismiss }: Props) {
  if (items.length === 0) return null;
  return (
    <div className="map-toasts">
      {items.map((item) => (
        <p key={item.id} className={`map-toast is-${item.tone}`} role={item.tone}>
          <span className="map-toast-icon" aria-hidden="true">
            {item.tone === "alert" ? "!" : "i"}
          </span>
          <span>{item.text}</span>
          <button
            type="button"
            aria-label={`Descartar: ${item.text}`}
            onClick={() => onDismiss(item)}
          >
            Cerrar
          </button>
        </p>
      ))}
    </div>
  );
}
