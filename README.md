# SIHE

Sistema Integral Hídrico de Emergencia — San Fernando del Valle de Catamarca.

**MVP:** React (Vite) + Supabase + Leaflet + GitHub.

## Arranque

1. Copiá `.env.example` → `.env` (URL + anon key de Supabase).
2. **Base de datos:** en SQL Editor correr los scripts de `supabase/` en orden (`01` … `08`). Ver `supabase/README.md`.
3. `npm install`
4. `npm run dev` → http://localhost:5173/

## Stack

| Pieza | Tecnología |
| --- | --- |
| Frontend | React + Vite |
| Datos / Auth | Supabase |
| Mapa | Leaflet |
| Versiones | GitHub |
