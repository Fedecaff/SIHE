import { Navigate, createBrowserRouter } from "react-router-dom";

import { UserRole } from "@/types/sihe";

import { PublicOnly, RequireAuth, RequireRole } from "@/app/guards";

import { AppShell } from "@/components/layout/AppShell";

import { LoginPage } from "@/pages/LoginPage";

import { MapPage } from "@/pages/MapPage";

import { ResourceListPage } from "@/pages/ResourceListPage";

import { ResourceDetailPage } from "@/pages/ResourceDetailPage";

import { ResourceEditPage } from "@/pages/ResourceEditPage";

import { ReportIncidentPage } from "@/pages/ReportIncidentPage";

import { AdminPage } from "@/pages/AdminPage";

import { AdminUsersPage } from "@/pages/AdminUsersPage";

import { AdminIncidentsPage } from "@/pages/AdminIncidentsPage";

import { AdminCreateResourcePage } from "@/pages/AdminCreateResourcePage";
import { AdminCreateFirePage } from "@/pages/AdminCreateFirePage";

import { FireDetailPage } from "@/pages/FireDetailPage";



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

          { path: "listado", element: <ResourceListPage /> },

          { path: "recursos/:id", element: <ResourceDetailPage /> },
          { path: "recursos/:id/incidencia", element: <ReportIncidentPage /> },

          { path: "incendios/:id", element: <FireDetailPage /> },

          {

            element: <RequireRole roles={[UserRole.Administrador]} />,

            children: [

              { path: "admin", element: <AdminPage /> },

              { path: "admin/usuarios", element: <AdminUsersPage /> },

              { path: "admin/incidencias", element: <AdminIncidentsPage /> },
              {
                path: "admin/recursos/nuevo",
                element: <AdminCreateResourcePage />,
              },
              {
                path: "admin/incendios/nuevo",
                element: <AdminCreateFirePage />,
              },
              { path: "recursos/:id/editar", element: <ResourceEditPage /> },

            ],

          },

        ],

      },

    ],

  },

  { path: "*", element: <Navigate to="/mapa" replace /> },

]);


