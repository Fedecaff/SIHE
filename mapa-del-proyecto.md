# Mapa del proyecto SIHE

Guía rápida: **qué hay en cada carpeta**.  
Proyecto: `D:\PROYECTOS\SIHE`

---

## Vista general

```
SIHE/
├── src/                 ← código de la app (lo importante)
├── supabase/            ← SQL de la base (correr en el dashboard)
├── public/              ← íconos / estáticos
├── package.json         ← dependencias y scripts (npm run dev)
├── .env                 ← secretos locales (no subir)
├── .env.example         ← plantilla sin secretos
└── README.md            ← cómo arrancar
```

**Arranque:** en esta carpeta → `npm run dev` → http://localhost:5173/

---

## `src/` — la aplicación

| Carpeta / archivo | Qué es |
| --- | --- |
| `src/pages/` | Pantallas: login, mapa, listado, admin |
| `src/components/layout/` | Header y shell (navegación) |
| `src/components/map/` | Mapa Leaflet + leyenda |
| `src/app/` | Router, login/sesión, guards de rol |
| `src/services/` | Llamadas a Supabase (perfil, mapa) |
| `src/lib/` | Cliente Supabase, etiquetas, centro del mapa |
| `src/types/` | Tipos TypeScript (roles, recursos) |
| `src/styles/` | CSS (colores, login, mapa) |
| `src/main.tsx` | Entrada de React |
| `src/App.tsx` | Monta auth + router |

---

## `supabase/` — base de datos

| Archivo | Qué es |
| --- | --- |
| `01_esquema.sql` | Tablas, RLS, vista del mapa, permisos |
| `02_perfiles_iniciales.sql` | Admin y operador |
| `03_datos_demo.sql` | 850 hidrantes reales (WGS84) |
| `README.md` | Orden para correrlos en SQL Editor |

---

## Qué no hace falta abrir en la demo

- `node_modules/` — librerías de npm  
- `dist/` — build de producción  
- `tsconfig*.json`, `vite.config.ts` — configuración de herramientas  

---

## Frase corta

> La app está en `src/`. La base se arma con los SQL de `supabase/`. El resto es configuración para correr el proyecto.
