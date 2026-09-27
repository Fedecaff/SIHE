-- =============================================================================
-- SIHE — 08 alta de incendio (admin)
-- Correr después de 07_operador_solo_incidencia.sql
-- =============================================================================

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

  if p_lat is null or p_lng is null
     or p_lat < -90 or p_lat > 90
     or p_lng < -180 or p_lng > 180 then
    raise exception 'Ubicación inválida';
  end if;

  insert into public.fire_events (
    event_type, occurred_at, location, description
  )
  values (
    p_event_type,
    p_occurred_at,
    ST_SetSRID(ST_MakePoint(p_lng, p_lat), 4326)::geography,
    nullif(trim(p_description), '')
  )
  returning id into v_id;

  return v_id;
end;
$$;

revoke all on function public.admin_create_fire_event(
  text, timestamptz, double precision, double precision, text
) from public;
grant execute on function public.admin_create_fire_event(
  text, timestamptz, double precision, double precision, text
) to authenticated;
