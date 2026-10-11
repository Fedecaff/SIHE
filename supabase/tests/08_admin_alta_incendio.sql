-- pgTAP del alta de incendio (script 10).
-- Corre con la base ya migrada y los helpers de Supabase (`supabase test db`).
-- No es un script para el SQL Editor.

begin;

select plan(7);

select tests.create_supabase_user('sihe_fire_operator', 'sihe-fire-operator@test.local');
select tests.create_supabase_user('sihe_fire_admin_off', 'sihe-fire-admin-off@test.local');
select tests.create_supabase_user('sihe_fire_admin', 'sihe-fire-admin@test.local');

update public.profiles
set app_role = 'operador', active = true
where id = tests.get_supabase_uid('sihe_fire_operator');

update public.profiles
set app_role = 'administrador', active = false
where id = tests.get_supabase_uid('sihe_fire_admin_off');

update public.profiles
set app_role = 'administrador', active = true
where id = tests.get_supabase_uid('sihe_fire_admin');

select tests.authenticate_as('sihe_fire_operator');
select throws_ok(
  $$select public.admin_create_fire_event(
      'incendio_forestal', now() - interval '1 day', -28.47, -65.78, null
    )$$,
  'P0001',
  'Solo administradores pueden registrar incendios',
  'un operador recibe excepción'
);

select tests.authenticate_as('sihe_fire_admin_off');
select throws_ok(
  $$select public.admin_create_fire_event(
      'incendio_forestal', now() - interval '1 day', -28.47, -65.78, null
    )$$,
  'P0001',
  'Solo administradores pueden registrar incendios',
  'un admin inactivo recibe excepción'
);

select tests.authenticate_as('sihe_fire_admin');
select lives_ok(
  $$select public.admin_create_fire_event(
      'incendio_forestal', now() - interval '1 day', -28.47, -65.78, 'parte'
    )$$,
  'un admin activo inserta'
);

select is(
  (
    select created_by
    from public.fire_events
    where description = 'parte'
    order by created_at desc
    limit 1
  ),
  tests.get_supabase_uid('sihe_fire_admin'),
  'el alta guarda created_by'
);

select throws_ok(
  $$select public.admin_create_fire_event(
      'otro', now() - interval '1 day', -28.47, -65.78, null
    )$$,
  'P0001',
  'Tipo de incendio inválido',
  'tipo inválido falla'
);

select throws_ok(
  $$select public.admin_create_fire_event(
      'incendio_urbano', now() - interval '1 day', 120, -65.78, null
    )$$,
  'P0001',
  'Ubicación inválida',
  'coordenadas fuera de rango fallan'
);

select throws_ok(
  $$select public.admin_create_fire_event(
      'incendio_urbano', now() + interval '1 hour', -28.47, -65.78, null
    )$$,
  'P0001',
  'La fecha y hora no pueden ser futuras',
  'fecha futura falla'
);

select * from finish();

rollback;
