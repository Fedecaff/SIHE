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

6. **`05_admin_incendios.sql`** — Admin puede aprobar incidencias, crear recursos, vista incendios

7. **`06_direcciones_hidrantes.sql`** — Calles de los 850 hidrantes
   - Solo ejecutar si los hidrantes todavía dicen "Hidrante N - Catamarca"

8. **`07_operador_solo_incidencia.sql`** — El operador no puede editar fichas oficiales

9. **`08_admin_alta_incendio.sql`** — Admin registra incendios para mapa de calor

## Verificación

Después de ejecutar todos los scripts, verificar:

```sql
-- Deben existir 850 recursos (hidrantes)
SELECT COUNT(*) FROM resources;

-- Deben existir 2 perfiles (admin y operador)
SELECT email, app_role FROM profiles;

-- La vista debe tener todas las columnas
SELECT * FROM resources_map LIMIT 1;

-- La vista de incendios debe tener eventos demo
SELECT COUNT(*) FROM fire_events_map;
```

## Auth (panel admin)

Para crear usuarios desde `/admin/usuarios`:

- En Supabase → Authentication → Providers → Email: **Allow new users** activado (la app no tiene registro público).
- Confirmación de email: desactivada en el MVP local, o el usuario no podrá entrar hasta confirmar.
