# SIHE · Sistema Integral Hídrico de Emergencia

> Proyecto de tesis — Tecnicatura en Desarrollo de Software, Instituto Superior San Martín.

Aplicación web para consultar y mantener los recursos hídricos de emergencia de San Fernando del Valle de Catamarca. Incluye un mapa con **850 hidrantes geolocalizados**, fichas por recurso, reporte de incidencias con aprobación y un mapa de calor de incendios.

## Funcionalidades

- **Mapa interactivo** (Leaflet + OpenStreetMap) con hidrantes, espejos de agua y tanques, iconos según tipo y estado, y ubicación del usuario.
- **Filtros** por tipo, estado y dirección, compartidos entre el mapa y el listado (se guardan en la URL).
- **Listado** de recursos y **ficha** de cada uno, con datos de accesibilidad, capacidad, última verificación, historial de cambios e incidencias.
- **Reporte de incidencias** (daño, obstrucción, datos incorrectos u otro), con foto opcional guardada en Supabase Storage y estado sugerido para el recurso.
- **Roles:**
  - *Operador*: consulta el mapa y las fichas y reporta incidencias.
  - *Administrador*: además aprueba o rechaza incidencias, edita fichas, da de alta recursos, gestiona usuarios y registra incendios.
- **Incendios históricos**: registro de eventos y mapa de calor con filtro temporal.
- **Notificaciones**: el administrador ve un contador de incidencias pendientes.

## Stack

| Capa | Tecnología |
| --- | --- |
| Frontend | React 19, TypeScript, Vite, React Router 7 |
| Mapa | Leaflet, react-leaflet, tiles de OpenStreetMap |
| Backend | Supabase: PostgreSQL + PostGIS, Auth, Row Level Security, Storage |
| Geocodificación | Photon (datos de OpenStreetMap) |
| Calidad | oxlint, `tsc` en el build |
| Deploy | Vercel (`vercel.json` con rewrites para la SPA) |

El frontend solo usa la **anon key** de Supabase. Los permisos se controlan en la base con **RLS**: lectura para usuarios autenticados y escritura según el rol, validada con `is_admin()` y funciones `SECURITY DEFINER`.

## Estructura

```
src/
  app/          router, sesión (AuthProvider) y guards por rol
  pages/        pantallas: login, mapa, listado, ficha, edición, incidencia, admin
  components/   layout, mapa y panel de filtros
  hooks/        filtros compartidos y contador de incidencias pendientes
  services/     acceso a Supabase (recursos, incidencias, incendios, admin, geocodificación)
  lib/          cliente Supabase, etiquetas, iconos y constantes del mapa
  types/        tipos del dominio
supabase/       scripts SQL numerados (esquema, permisos, datos)
scripts/        geocodificación inversa de hidrantes (Python)
```

## Correr el proyecto en local

Requisitos: Node.js 20 o superior y un proyecto de Supabase.

1. Copiá `.env.example` a `.env` y completá `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` (Supabase → Project Settings → API).
2. En el SQL Editor de Supabase, corré los scripts de `supabase/` en orden numérico. El detalle está en [`supabase/README.md`](supabase/README.md).
3. Instalá dependencias y levantá el servidor:

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # verificación de tipos + build de producción
npm run lint
```

Nunca subas el archivo `.env`: ya está en `.gitignore`.

## Deploy

La guía completa (variables de entorno, configuración de Auth, verificación y problemas comunes) está en [`DESPLIEGUE.md`](DESPLIEGUE.md).

## Datos

- **Hidrantes:** 850 puntos convertidos de EPSG:22183 (POSGAR 94 / Argentina 3) a WGS84.
- **Direcciones:** aproximadas, obtenidas por geocodificación inversa con Photon (`scripts/geocode_hidrantes.py`).
- **Incendios:** los eventos de ejemplo de los scripts SQL son ficticios y solo sirven para la demo.

## Autor

Federico Gabriel Gomez Caffettaro · [GitHub](https://github.com/Fedecaff) · federico.gomez.sc@gmail.com
