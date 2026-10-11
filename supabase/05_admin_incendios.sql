-- =============================================================================
-- SIHE — 05 admin + incendios (Sprints 11–12)
-- Correr después de 04_permisos_operacion.sql
-- =============================================================================

-- Admin puede actualizar incidencias (aprobar / rechazar)
drop policy if exists "incidents_update_admin" on public.incidents;
create policy "incidents_update_admin"
  on public.incidents for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

grant update on public.incidents to authenticated;

-- Admin puede dar de alta recursos
drop policy if exists "resources_insert_admin" on public.resources;
create policy "resources_insert_admin"
  on public.resources for insert
  to authenticated
  with check (public.is_admin());

grant insert on public.resources to authenticated;

-- Alta con coordenadas (geography) sin exponer WKT al front
create or replace function public.admin_create_resource(
  p_type public.resource_type,
  p_name text,
  p_address text,
  p_lat double precision,
  p_lng double precision,
  p_accessibility text default null,
  p_capacity text default null,
  p_status public.resource_status default 'operativo',
  p_observations text default null
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
    raise exception 'Solo administradores pueden crear recursos';
  end if;

  if p_lat is null or p_lng is null then
    raise exception 'Ubicación obligatoria';
  end if;

  insert into public.resources (
    type, name, address, location, accessibility, capacity,
    status, observations, last_verified_at, last_verified_by_id
  )
  values (
    p_type,
    trim(p_name),
    trim(p_address),
    ST_SetSRID(ST_MakePoint(p_lng, p_lat), 4326)::geography,
    nullif(trim(p_accessibility), ''),
    nullif(trim(p_capacity), ''),
    p_status,
    nullif(trim(p_observations), ''),
    now(),
    auth.uid()
  )
  returning id into v_id;

  insert into public.resource_history (resource_id, user_id, action, payload)
  values (
    v_id,
    auth.uid(),
    'alta_recurso',
    jsonb_build_object(
      'type', p_type,
      'name', trim(p_name),
      'address', trim(p_address),
      'lat', p_lat,
      'lng', p_lng,
      'status', p_status
    )
  );

  return v_id;
end;
$$;

revoke all on function public.admin_create_resource(
  public.resource_type, text, text, double precision, double precision,
  text, text, public.resource_status, text
) from public;
revoke execute on function public.admin_create_resource(
  public.resource_type, text, text, double precision, double precision,
  text, text, public.resource_status, text
) from anon;
grant execute on function public.admin_create_resource(
  public.resource_type, text, text, double precision, double precision,
  text, text, public.resource_status, text
) to authenticated;

-- Vista incendios para Leaflet
drop view if exists public.fire_events_map;
create view public.fire_events_map
with (security_invoker = true)
as
select
  f.id,
  f.event_type,
  f.occurred_at,
  f.description,
  f.linked_resource_id,
  ST_Y(f.location::geometry) as lat,
  ST_X(f.location::geometry) as lng
from public.fire_events f;

grant select on public.fire_events_map to authenticated;

-- Los incendios de demostración están en 05b_demo_incendios.sql.
-- Este script no borra ni inserta eventos: reejecutarlo no toca datos reales.
