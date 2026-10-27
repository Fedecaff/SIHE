import { createContext, useContext } from "react";

export type ToastState = {
  showToast: (text: string) => void;
};

export const ToastContext = createContext<ToastState | null>(null);

export function useToast(): ToastState {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast debe usarse dentro de ToastProvider");
  return ctx;
}
