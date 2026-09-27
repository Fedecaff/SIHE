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

  const refresh = useCallback(async () => {
    if (!enabled) {
      setCount(0);
      return;
    }
    try {
      setCount(await countPendingIncidents());
    } catch {
      /* el header no debe romper si falla el conteo */
    }
  }, [enabled]);

  useEffect(() => {
    void refresh();
  }, [refresh, pathname]);

  useEffect(() => {
    if (!enabled) return;

    const id = window.setInterval(() => {
      void refresh();
    }, POLL_MS);

    const onChanged = () => {
      void refresh();
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
