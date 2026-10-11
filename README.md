# SIHE · Sistema Integral Hídrico de Emergencia

> Proyecto de tesis — Tecnicatura en Desarrollo de Software, Instituto Superior San Martín.

Aplicación web para consultar y mantener los recursos hídricos de emergencia de San Fernando del Valle de Catamarca. Incluye un mapa con **850 hidrantes geolocalizados**, fichas por recurso, reporte de incidencias con aprobación y un mapa de calor de incendios.

## Funcionalidades

- **Mapa interactivo** (Leaflet + OpenStreetMap) con hidrantes, espejos de agua y tanques, iconos según tipo y estado, y ubicación del usuario.
- **Cómo llegar**: ruta interna en el mapa hacia un recurso hídrico o una dirección buscada. No abre Google Maps ni otras apps.
- **Filtros** por tipo, estado y dirección, compartidos entre el mapa y el listado (se guardan en la URL).
- **Listado** de recursos y **ficha** de cada uno, con datos de accesibilidad, capacidad, última verificación, historial de cambios e incidencias.
- **Reporte de incidencias** (daño, obstrucción, datos incorrectos u otro), con foto opcional guardada en Supabase Storage y estado sugerido para el recurso.
- **Roles:**
  - *Operador*: consulta el mapa y las fichas y reporta incidencias.
  - *Administrador*: además aprueba o rechaza incidencias, edita fichas, da de alta recursos, gestiona usuarios y registra incendios.
- **Incendios históricos**: registro de eventos y mapa de calor con filtro temporal.
- **Capas del mapa**: texturas base (callejero, satélite y topográfico) y capas satelitales de fuego de NASA, además de los recursos y los incendios históricos.
- **Notificaciones**: el administrador ve un contador de incidencias pendientes.

## Stack

| Capa | Tecnología |
| --- | --- |
| Frontend | React 19, TypeScript, Vite, React Router 7 |
| Mapa | Leaflet, react-leaflet, OpenStreetMap, Esri, IGN Argenmap, OpenTopoMap |
| Fuego satelital | NASA GIBS (imágenes y anomalías) y NASA FIRMS (focos NRT) |
| Backend | Supabase: PostgreSQL + PostGIS, Auth, Row Level Security, Storage |
| Geocodificación | Photon (datos de OpenStreetMap) |
| Ruteo | OSRM (perfil driving; servidor configurable) |
| Calidad | oxlint, Vitest, `tsc` en el build |
| Deploy | Vercel (`vercel.json` con rewrites para la SPA) |

El frontend solo usa la **anon key** de Supabase. Los permisos se controlan en la base con **RLS**: lectura para usuarios autenticados y escritura según el rol, validada con `is_admin()` y funciones `SECURITY DEFINER`.

## Estructura

```
src/
  app/          router, sesión (AuthProvider) y guards por rol
  pages/        pantallas: login, mapa, listado, ficha, edición, incidencia, admin
  components/   layout, mapa y panel de filtros
  hooks/        filtros compartidos, contador de incidencias y ruta («Cómo llegar»)
  services/     acceso a Supabase (recursos, incidencias, incendios, admin, geocodificación, ruteo)
  lib/          cliente Supabase, etiquetas, iconos y constantes del mapa
  types/        tipos del dominio
supabase/       scripts SQL numerados (esquema, permisos, datos)
scripts/        geocodificación inversa de hidrantes (Python)
```

## Correr el proyecto en local

Requisitos: Node.js 20 o superior y un proyecto de Supabase.

1. Copiá `.env.example` a `.env` y completá `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` (Supabase → Project Settings → API). `VITE_ROUTING_BASE_URL` es opcional.
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

## Capas satelitales

Son un apoyo visual. No reemplazan el reporte oficial ni la verificación en terreno, ni los recursos hídricos ni los incendios cargados por el cuartel.

| Capa | Fuente | Clave | Actualización |
| --- | --- | --- | --- |
| Mapa, satélite, topográfico, relieve | OpenStreetMap, Esri, IGN | No | Teselas públicas |
| Fuego MODIS 7-2-1 y VIIRS M11-I2-I1 | NASA GIBS | No | Imagen diaria (el día se completa en UTC) |
| Fuego WMS | NASA GIBS, anomalías térmicas | No | Diaria |
| Focos FIRMS | NASA FIRMS Area API | Sí, `MAP_KEY` solo en el servidor | NRT, latencia de hasta 3 h |

La clave de FIRMS no va en el frontend de producción: la pide la Edge Function `firms-proxy`. En local se puede usar `VITE_FIRMS_MAP_KEY`, pero esa variable queda en el bundle y no sirve para publicar. El pedido de la clave y el deploy están en [`DESPLIEGUE.md`](DESPLIEGUE.md).

## Cómo llegar

La ruta se dibuja **dentro del mapa de SIHE**, desde tu ubicación (o un origen elegido a mano) hasta:

- cualquier **recurso hídrico** (hidrante, espejo de agua o tanque), desde el sheet, el popup o la ficha;
- una **dirección** encontrada con el buscador.

Usa el perfil *driving* de OSRM. El servidor público (`https://router.project-osrm.org`) es solo de **demostración**: no tiene garantía de disponibilidad ni tráfico en tiempo real. La precisión depende de OpenStreetMap en Catamarca. Para producción se recomienda una instancia propia y configurarla en `VITE_ROUTING_BASE_URL`. La ubicación del usuario no se guarda en Supabase.

## Datos

- **Hidrantes:** 850 puntos convertidos de EPSG:22183 (POSGAR 94 / Argentina 3) a WGS84.
- **Direcciones:** aproximadas, obtenidas por geocodificación inversa con Photon (`scripts/geocode_hidrantes.py`).
- **Incendios:** los eventos de ejemplo de los scripts SQL son ficticios y solo sirven para la demo.

## Autor

Federico Gabriel Gomez Caffettaro · [GitHub](https://github.com/Fedecaff) · federico.gomez.sc@gmail.com
