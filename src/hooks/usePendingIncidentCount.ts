import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { countPendingIncidents } from "@/services/resources";

const POLL_MS = 30_000;
const CHANGED_EVENT = "sihe:pending-incidents-changed";

/** Avisa al badge del header que el conteo de pendientes cambió. */
export function notifyPendingIncidentsChanged(): void {
  window.dispatchEvent(new Event(CHANGED_EVENT));
}

export function usePendingIncidentCount(enabled: boolean): number {
  const { pathname } = useLocation();
  const [count, setCount] = useState(0);
  const [trackedEnabled, setTrackedEnabled] = useState(enabled);

  // Con el badge apagado el conteo visible es cero, sin otro render desde el efecto.
  if (trackedEnabled !== enabled) {
    setTrackedEnabled(enabled);
    if (!enabled) setCount(0);
  }

  const refresh = useCallback(() => {
    void countPendingIncidents()
      .then((next) => {
        setCount(next);
      })
      .catch(() => {
        /* el header no debe romper si falla el conteo */
      });
  }, []);

  useEffect(() => {
    if (!enabled) return;
    refresh();
  }, [enabled, pathname, refresh]);

  useEffect(() => {
    if (!enabled) return;

    const id = window.setInterval(() => {
      refresh();
    }, POLL_MS);

    const onChanged = () => {
      refresh();
    };

    window.addEventListener(CHANGED_EVENT, onChanged);
    window.addEventListener("focus", onChanged);

    return () => {
      window.clearInterval(id);
      window.removeEventListener(CHANGED_EVENT, onChanged);
      window.removeEventListener("focus", onChanged);
    };
  }, [enabled, refresh]);

  return count;
}
