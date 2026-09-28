-- =============================================================================
-- SIHE — perfiles iniciales (admin + operador)
-- Pegá los UUID de Authentication → Users. No commitees UUID reales.
-- =============================================================================

insert into public.profiles (id, email, name, institution, app_role, active)
values
  (
    '<UUID-ADMIN>',
    'admin@gmail.com',
    'Administrador SIHE',
    'Bomberos Catamarca',
    'administrador'::public.user_role,
    true
  ),
  (
    '<UUID-OPERADOR>',
    'operador@gmail.com',
    'Operador SIHE',
    'Bomberos Catamarca',
    'operador'::public.user_role,
    true
  )
on conflict (id) do update set
  email = excluded.email,
  name = excluded.name,
  institution = excluded.institution,
  app_role = excluded.app_role,
  active = excluded.active;

-- Verificación
select id, email, name, app_role, active
from public.profiles
order by app_role;
