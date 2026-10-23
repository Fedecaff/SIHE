import { useEffect } from "react";
import { useBlocker } from "react-router-dom";

/** Pregunta antes de salir si hay cambios sin guardar. */
export function useUnsavedChanges(when: boolean) {
  const blocker = useBlocker(when);

  useEffect(() => {
    if (!when) return;
    function onBeforeUnload(event: BeforeUnloadEvent) {
      event.preventDefault();
      event.returnValue = "";
    }
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [when]);

  useEffect(() => {
    if (blocker.state !== "blocked") return;
    const discard = window.confirm("¿Descartar lo cargado?");
    if (discard) blocker.proceed();
    else blocker.reset();
  }, [blocker]);
}
