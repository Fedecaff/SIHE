-- =============================================================================
-- SIHE — perfiles iniciales (admin + operador)
-- =============================================================================

insert into public.profiles (id, email, name, institution, app_role, active)
values
  (
    '4a11d7c7-c9d2-4c2a-ba3d-ed0dbb68b40b',
    'admin@gmail.com',
    'Administrador SIHE',
    'Bomberos Catamarca',
    'administrador'::public.user_role,
    true
  ),
  (
    '5ab77389-63bc-4759-9c6b-07a0f19c485d',
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
