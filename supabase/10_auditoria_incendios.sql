-- =============================================================================
-- SIHE — 10 auditoría del alta de incendio
-- Correr después de 08_admin_alta_incendio.sql y 09_seguridad_altas.sql.
-- Idempotente.
--
-- Agrega fire_events.created_by (quién cargó el evento) y vuelve a definir
-- admin_create_fire_event para guardarlo con auth.uid().
--
-- No modifica fire_events_map: esa vista lista columnas fijas y sigue
-- sirviendo al mapa igual.
--
-- Si más adelante se reejecuta 08, hay que volver a correr este script:
-- el 08 no escribe created_by.
-- =============================================================================

alter table public.fire_events
  add column if not exists created_by uuid references public.profiles (id);

create or replace function public.admin_create_fire_event(
  p_event_type text,
  p_occurred_at timestamptz,
  p_lat double precision,
  p_lng double precision,
  p_description text default null
)
returns uuid
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_id uuid;
begin
  if not public.is_admin() then
    raise exception 'Solo administradores pueden registrar incendios';
  end if;

  if p_event_type not in ('incendio_forestal', 'incendio_urbano') then
    raise exception 'Tipo de incendio inválido';
  end if;

  if p_occurred_at is null then
    raise exception 'Fecha y hora obligatorias';
  end if;

  if p_occurred_at > now() + interval '5 minutes' then
    raise exception 'La fecha y hora no pueden ser futuras';
  end if;

  if p_lat is null or p_lng is null
     or p_lat < -90 or p_lat > 90
     or p_lng < -180 or p_lng > 180 then
    raise exception 'Ubicación inválida';
  end if;

  if p_description is not null and char_length(trim(p_description)) > 500 then
    raise exception 'La nota no puede superar 500 caracteres';
  end if;

  insert into public.fire_events (
    event_type, occurred_at, location, description, created_by
  )
  values (
    p_event_type,
    p_occurred_at,
    ST_SetSRID(ST_MakePoint(p_lng, p_lat), 4326)::geography,
    nullif(trim(p_description), ''),
    auth.uid()
  )
  returning id into v_id;

  return v_id;
end;
$$;

revoke all on function public.admin_create_fire_event(
  text, timestamptz, double precision, double precision, text
) from public;
revoke execute on function public.admin_create_fire_event(
  text, timestamptz, double precision, double precision, text
) from anon;
grant execute on function public.admin_create_fire_event(
  text, timestamptz, double precision, double precision, text
) to authenticated;
