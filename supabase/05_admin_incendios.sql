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

-- Demo: eventos de incendio en Catamarca (Sprint 12)
delete from public.fire_events;

insert into public.fire_events (event_type, occurred_at, location, description)
values
  (
    'incendio_forestal',
    now() - interval '2 months',
    ST_SetSRID(ST_MakePoint(-65.7795, -28.4696), 4326)::geography,
    'Foco cercano al centro — demo Sprint 12'
  ),
  (
    'incendio_urbano',
    now() - interval '5 months',
    ST_SetSRID(ST_MakePoint(-65.7850, -28.4720), 4326)::geography,
    'Incendio en vivienda — demo'
  ),
  (
    'incendio_forestal',
    now() - interval '14 months',
    ST_SetSRID(ST_MakePoint(-65.7700, -28.4600), 4326)::geography,
    'Pastizal — hace más de un año'
  ),
  (
    'incendio_forestal',
    now() - interval '3 years',
    ST_SetSRID(ST_MakePoint(-65.7900, -28.4550), 4326)::geography,
    'Cerros — histórico 3 años'
  ),
  (
    'incendio_urbano',
    now() - interval '8 months',
    ST_SetSRID(ST_MakePoint(-65.7750, -28.4780), 4326)::geography,
    'Galpón — demo'
  ),
  (
    'incendio_forestal',
    now() - interval '1 month',
    ST_SetSRID(ST_MakePoint(-65.7680, -28.4650), 4326)::geography,
    'Foco reciente — demo'
  ),
  (
    'incendio_forestal',
    now() - interval '6 years',
    ST_SetSRID(ST_MakePoint(-65.8000, -28.4800), 4326)::geography,
    'Histórico antiguo — fuera de 5 años'
  );
