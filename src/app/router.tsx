import { Navigate, createBrowserRouter } from "react-router-dom";
import { UserRole } from "@/types/sihe";
import { PublicOnly, RequireAuth, RequireRole } from "@/app/guards";
import { AppShell } from "@/components/layout/AppShell";
import { LoginPage } from "@/pages/LoginPage";
import { MapPage } from "@/pages/MapPage";
import { ListPlaceholderPage } from "@/pages/ListPlaceholderPage";
import { AdminPlaceholderPage } from "@/pages/AdminPlaceholderPage";

export const router = createBrowserRouter([
  {
    element: <PublicOnly />,
    children: [{ path: "/login", element: <LoginPage /> }],
  },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <AppShell />,
        children: [
          { index: true, element: <Navigate to="/mapa" replace /> },
          { path: "mapa", element: <MapPage /> },
          { path: "listado", element: <ListPlaceholderPage /> },
          {
            element: <RequireRole roles={[UserRole.Administrador]} />,
            children: [{ path: "admin", element: <AdminPlaceholderPage /> }],
          },
        ],
      },
    ],
  },
  { path: "*", element: <Navigate to="/mapa" replace /> },
]);
