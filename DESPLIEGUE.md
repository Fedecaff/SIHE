# Guía de Despliegue - SIHE

## Pre-requisitos

✅ Proyecto Supabase creado
✅ Cuenta de Vercel configurada
✅ Repositorio en GitHub

## Paso 1: Configurar Supabase

### 1.1 Ejecutar scripts SQL

En el SQL Editor de Supabase, ejecutar **en orden**:

1. `supabase/01_esquema.sql`
2. Crear usuarios en Authentication → Users (Admin panel):
   - Email: `admin@gmail.com`, password temporal
   - Email: `operador@gmail.com`, password temporal
   - **Importante:** Copiar los UUID de estos usuarios para el siguiente paso
3. `supabase/02_perfiles_iniciales.sql` (editar con los UUID reales)
4. `supabase/03_datos_demo.sql`
5. `supabase/04_permisos_operacion.sql`
6. `supabase/05_admin_incendios.sql`
7. `supabase/06_direcciones_hidrantes.sql` (opcional: solo si las direcciones están vacías)
8. `supabase/07_operador_solo_incidencia.sql`
9. `supabase/08_admin_alta_incendio.sql`

### 1.2 Configurar Authentication

En Supabase → Authentication → Providers → Email:

- ✅ **Enable Email provider**
- ✅ **Allow new users** (la app no tiene registro público, solo admin crea usuarios)
- ❌ **Confirm email** desactivado (o los usuarios no podrán entrar hasta confirmar)

### 1.3 Verificar Storage

En Storage, debe existir el bucket `incident-photos`:
- Creado automáticamente por `01_esquema.sql`
- Tipo: Private
- Límite: 5 MB por archivo
- MIME types: image/jpeg, image/png, image/webp

Si no existe, crearlo manualmente con esa configuración.

## Paso 2: Configurar Vercel

### 2.1 Variables de entorno

En Vercel → Project Settings → Environment Variables, agregar:

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anon-publica
```

**Dónde encontrar estos valores:**
- Supabase → Project Settings → API
  - `URL` → copiar en `VITE_SUPABASE_URL`
  - `anon public` → copiar en `VITE_SUPABASE_ANON_KEY`

### 2.2 Configuración de build

Vercel detecta automáticamente Vite, pero verificar:

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### 2.3 Desplegar

1. Conectar el repositorio en Vercel
2. Hacer commit y push a `main`
3. Vercel desplegará automáticamente

## Verificación Post-Despliegue

### Checklist de funcionalidad

1. ✅ Abrir `https://tu-app.vercel.app`
2. ✅ Navegar a `/login` y autenticarse con `admin@gmail.com`
3. ✅ Ir a `/mapa` y verificar que carguen los 850 hidrantes
4. ✅ Ir a `/listado` y verificar que aparezcan recursos
5. ✅ Entrar a una ficha `/recursos/:id`
6. ✅ Refrescar la página (F5) en `/mapa` → debe seguir funcionando (no 404)
7. ✅ Como admin, ir a `/admin/usuarios` y verificar permisos
8. ✅ Reportar una incidencia y verificar que se suba la foto
9. ✅ Ver el mapa de calor en `/mapa` (botón "Incendios históricos")

### Problemas comunes

#### 404 en rutas SPA
**Síntoma:** Entrar directo o refrescar `/mapa` devuelve 404
**Causa:** Vercel no redirige rutas del SPA a `index.html`
**Solución:** El archivo `vercel.json` con rewrites ya está incluido

#### No carga datos / tabla vacía
**Síntoma:** El mapa aparece vacío o el listado no muestra recursos
**Posibles causas:**

1. **Variables de entorno no configuradas**
   - Verificar en Vercel que `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` estén configuradas
   - Redesplegar después de agregar variables

2. **Scripts SQL no ejecutados**
   - Verificar en Supabase SQL Editor que se ejecutaron los 8 scripts en orden
   - El script `03_datos_demo.sql` inserta 850 hidrantes

3. **RLS (Row Level Security) sin grants**
   - Verificar que `04_permisos_operacion.sql` se ejecutó correctamente
   - Este script da permisos de lectura a usuarios autenticados

4. **Vista `resources_map` no existe**
   - Verificar en SQL Editor: `SELECT * FROM resources_map LIMIT 1;`
   - Si falla, re-ejecutar `04_permisos_operacion.sql`

#### Error de autenticación
**Síntoma:** No se puede iniciar sesión
**Posibles causas:**

1. **Usuario no existe en Auth**
   - Crear en Supabase → Authentication → Users

2. **Perfil no existe en tabla `profiles`**
   - Verificar: `SELECT * FROM profiles WHERE id = 'UUID-del-usuario';`
   - Si falta, ejecutar `02_perfiles_iniciales.sql` con el UUID correcto

3. **Email confirmation activada**
   - Ir a Authentication → Email → desactivar "Confirm email"

#### Fotos de incidencias no se suben
**Síntoma:** Error al reportar incidencia con foto
**Causa:** Bucket `incident-photos` no existe o no tiene políticas RLS
**Solución:**
1. Verificar que el bucket existe en Storage
2. Re-ejecutar `04_permisos_operacion.sql` para crear las políticas de Storage

## Logs y debugging

### Ver errores en el navegador

1. Abrir DevTools (F12) → Console
2. Buscar errores con el texto:
   - `Failed to load resource: 404` → tabla/vista no existe
   - `permission denied` → falta ejecutar SQL de permisos
   - `Faltan VITE_SUPABASE_URL` → variables de entorno no configuradas

### Ver logs en Supabase

Supabase → Logs → API/Database
- Filtrar por errores 4xx/5xx
- Buscar queries fallidos

### Ver logs de build en Vercel

Vercel → Deployments → [último deploy] → View Function Logs
- Ver errores de compilación
- Verificar que las variables de entorno estén disponibles en build time

## Mantenimiento

### Actualizar datos

Para agregar más hidrantes:
```sql
INSERT INTO public.resources (type, name, address, location, status, accessibility, capacity)
VALUES (
  'hidrante',
  'Hidrante Ejemplo',
  'Calle Falsa 123, Catamarca',
  ST_SetSRID(ST_MakePoint(-65.7795, -28.4696), 4326)::geography,
  'operativo',
  'Vereda pública',
  '1500 L/min'
);
```

### Crear usuarios nuevos

Como admin, usar la interfaz `/admin/usuarios` → "Crear usuario"

O manualmente en Supabase:
1. Authentication → Users → Add user
2. El trigger `handle_new_user()` crea automáticamente el perfil

### Backups

Supabase hace backups automáticos (según el plan).

Para backup manual:
- Database → Backups → Create backup
- Storage → incident-photos → descargar fotos si es necesario

## Soporte

Si después de seguir esta guía persisten problemas:

1. Revisar los logs de la consola del navegador
2. Verificar que todas las tablas existan: `SELECT tablename FROM pg_tables WHERE schemaname = 'public';`
3. Verificar que todas las vistas existan: `SELECT table_name FROM information_schema.views WHERE table_schema = 'public';`
4. Verificar grants: todos los scripts SQL del 01 al 08 deben haberse ejecutado sin errores
