# SQL en Supabase



Orden en **SQL Editor**:



1. `01_esquema.sql`

2. Usuarios en Auth (ya creados):

   - `admin@gmail.com` → `4a11d7c7-c9d2-4c2a-ba3d-ed0dbb68b40b`

   - `operador@gmail.com` → `5ab77389-63bc-4759-9c6b-07a0f19c485d`

3. `02_perfiles_iniciales.sql`

4. `03_datos_demo.sql` — 850 hidrantes reales (GeoJSON EPSG:22183 → WGS84)

5. `04_permisos_operacion.sql` — escritura (ficha, incidencias, usuarios, fotos)

6. `05_admin_incendios.sql` — revisión admin, alta de recurso, incendios demo
7. `06_direcciones_hidrantes.sql` — calles de los 850 hidrantes (solo si todavía dicen “Hidrante N - Catamarca”)
8. `07_operador_solo_incidencia.sql` — el operador no puede editar la ficha oficial
9. `08_admin_alta_incendio.sql` — el admin registra incendios para el mapa de calor



## Auth (panel admin)



Para crear usuarios desde `/admin/usuarios`:



- En Supabase → Authentication → Providers → Email: **Allow new users** activado (la app no tiene registro público).

- Confirmación de email: desactivada en el MVP local, o el usuario no podrá entrar hasta confirmar.


