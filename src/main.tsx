import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/inter";
import "leaflet/dist/leaflet.css";
import "./styles/global.css";
import { Toaster } from "sonner";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster
      className="app-toaster"
      position="top-center"
      offset="calc(var(--header-h) + env(safe-area-inset-top) + 8px)"
      toastOptions={{
        duration: 4000,
        closeButtonAriaLabel: "Cerrar",
      }}
    />
    <App />
  </StrictMode>,
);
