# SQL en Supabase

**Importante:** Estos scripts deben ejecutarse en orden exacto para que la aplicación funcione correctamente en producción (Vercel) y desarrollo.

## Orden de ejecución en SQL Editor

1. **`01_esquema.sql`** — Tablas base, RLS, storage, vistas, grants

2. **Crear usuarios en Auth** (panel Authentication → Users):
   - `admin@gmail.com` con password temporal
   - `operador@gmail.com` con password temporal
   - **Copiar los UUID generados** para el siguiente paso

3. **`02_perfiles_iniciales.sql`** — Perfiles en tabla `profiles`
   - ⚠️ **Editar el script** con los UUID reales de los usuarios creados en el paso anterior

4. **`03_datos_demo.sql`** — 850 hidrantes reales (GeoJSON EPSG:22183 → WGS84)

5. **`04_permisos_operacion.sql`** — RLS de escritura (ficha, incidencias, usuarios, fotos)
   - Recrea la vista `resources_map` con todas las columnas necesarias

6. **`05_admin_incendios.sql`** — Admin puede aprobar incidencias, crear recursos, vista incendios. No borra ni carga eventos.

6b. **`05b_demo_incendios.sql`** — **Opcional y solo en una base de prueba.** Incendios ficticios. No borra filas: si ya hay algún evento, no inserta nada. No lo corras sobre incendios reales.

7. **`06_direcciones_hidrantes.sql`** — Calles de los 850 hidrantes
   - Solo ejecutar si los hidrantes todavía dicen "Hidrante N - Catamarca"

8. **`07_operador_solo_incidencia.sql`** — El operador no puede editar fichas oficiales

9. **`08_admin_alta_incendio.sql`** — Admin registra incendios. Valida fecha no futura y nota de hasta 500 caracteres. `anon` no puede ejecutar la función.

10. **`09_seguridad_altas.sql`** — El rol no se toma del signUp: perfil nuevo = operador inactivo; lectura solo para perfiles activos. `anon` no puede ejecutar `is_active_user`.

11. **`10_auditoria_incendios.sql`** — Columna `fire_events.created_by` y el alta guarda `auth.uid()`. No cambia la vista `fire_events_map`. Si se vuelve a correr el `08`, hay que correr el `10` otra vez.

## Verificación

Después de ejecutar todos los scripts, verificar:

```sql
-- Deben existir 850 recursos (hidrantes)
SELECT COUNT(*) FROM resources;

-- Deben existir 2 perfiles (admin y operador)
SELECT email, app_role FROM profiles;

-- La vista debe tener todas las columnas
SELECT * FROM resources_map LIMIT 1;

-- Eventos de incendio (0 si no corriste 05b; los reales no se borran)
SELECT COUNT(*) FROM fire_events_map;

-- Auditoría del alta (después del 10)
SELECT column_name
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'fire_events'
  AND column_name = 'created_by';
```

## Auth (panel admin)

Para crear usuarios desde `/admin/usuarios`:

- En Supabase → Authentication → Providers → Email: **Allow new users** activado (la app no tiene registro público; el alta la hace un administrador).
- El rol **solo** lo asigna un administrador (desde `/admin/usuarios` o actualizando `profiles`). `signUp` no puede elegir `app_role`: el trigger crea operador inactivo.
- Confirmación de email: desactivada en el MVP local, o el usuario no podrá entrar hasta confirmar.

## Focos satelitales (NASA FIRMS)

No hay script SQL. Los focos se consultan al vuelo y no se guardan.

1. Pedí la clave en https://firms.modaps.eosdis.nasa.gov/api/map_key/
2. `supabase secrets set FIRMS_MAP_KEY=...`
3. `supabase secrets set FIRMS_ALLOWED_ORIGINS=https://tu-app.vercel.app`
4. `supabase functions deploy firms-proxy`

La función está en `supabase/functions/firms-proxy`. El detalle de la prueba con `curl` está en `DESPLIEGUE.md`.
