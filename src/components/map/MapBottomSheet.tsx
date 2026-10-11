import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";
import { cycleSheetHeight, type SheetHeight } from "@/lib/mapPanel";

type Props = {
  title: string;
  label: string;
  height: SheetHeight;
  side?: boolean;
  backLabel?: string;
  onBack?: () => void;
  onHeight: (height: SheetHeight) => void;
  onClose: () => void;
  children: ReactNode;
};

export function MapBottomSheet({
  title,
  label,
  height,
  side,
  backLabel,
  onBack,
  onHeight,
  onClose,
  children,
}: Props) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const drag = useRef<{ y: number; moved: boolean } | null>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, [label, title]);

  function onPointerDown(event: PointerEvent<HTMLButtonElement>) {
    drag.current = { y: event.clientY, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent<HTMLButtonElement>) {
    if (!drag.current) return;
    if (Math.abs(event.clientY - drag.current.y) > 12) drag.current.moved = true;
  }

  function onPointerUp(event: PointerEvent<HTMLButtonElement>) {
    const start = drag.current;
    drag.current = null;
    if (!start) return;
    const delta = event.clientY - start.y;
    if (!start.moved) {
      onHeight(cycleSheetHeight(height));
      return;
    }
    if (delta < -24) {
      onHeight(height === "peek" ? "media" : "expandida");
    } else if (delta > 24) {
      onHeight(height === "expandida" ? "media" : "peek");
    }
  }

  return (
    <section
      className={`map-sheet is-${height}${side ? " is-side" : ""}`}
      role="region"
      aria-label={label}
    >
      {backLabel && onBack ? (
        <button type="button" className="map-sheet-back" onClick={onBack}>
          {backLabel}
        </button>
      ) : null}
      <button
        type="button"
        className="map-sheet-handle"
        aria-expanded={height !== "peek"}
        aria-label={height === "expandida" ? "Achicar panel" : "Agrandar panel"}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <span />
      </button>
      <div className="map-sheet-head">
        <h2 ref={titleRef} tabIndex={-1}>
          {title}
        </h2>
        <button type="button" className="btn-toolbar" onClick={onClose}>
          Cerrar
        </button>
      </div>
      <div className="map-sheet-scroll">{children}</div>
    </section>
  );
}
