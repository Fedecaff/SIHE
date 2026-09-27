-- =============================================================================
-- SIHE — 04 permisos de operación (Sprints 7–10)
-- Corridas: después de 01–03. Idempotente.
-- =============================================================================

-- Helper: ¿el usuario autenticado es administrador activo?
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.app_role = 'administrador'
      and p.active = true
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- Perfil automático al crear usuario en Auth (alta desde panel admin)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_role public.user_role;
begin
  begin
    v_role := coalesce(
      (new.raw_user_meta_data->>'app_role')::public.user_role,
      'operador'::public.user_role
    );
  exception when others then
    v_role := 'operador'::public.user_role;
  end;

  insert into public.profiles (id, email, name, institution, app_role, active)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(nullif(new.raw_user_meta_data->>'name', ''), 'Sin nombre'),
    coalesce(nullif(new.raw_user_meta_data->>'institution', ''), 'Sin institución'),
    v_role,
    true
  )
  on conflict (id) do update
    set email = excluded.email,
        name = excluded.name,
        institution = excluded.institution,
        app_role = excluded.app_role;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Vista mapa: incluir verificación
-- DROP + CREATE: CREATE OR REPLACE no puede insertar columnas en el medio
-- (error 42P16: cannot change name of view column "lat" to "last_verified_at")
drop view if exists public.resources_map;

create view public.resources_map
with (security_invoker = true)
as
select
  r.id,
  r.type,
  r.name,
  r.address,
  r.status,
  r.accessibility,
  r.capacity,
  r.observations,
  r.last_verified_at,
  r.last_verified_by_id,
  ST_Y(r.location::geometry) as lat,
  ST_X(r.location::geometry) as lng
from public.resources r;

grant select on public.resources_map to authenticated;

-- —— RLS escritura ——

drop policy if exists "resources_update_authenticated" on public.resources;
drop policy if exists "resources_update_admin" on public.resources;
create policy "resources_update_admin"
  on public.resources for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "resource_history_insert_authenticated" on public.resource_history;
create policy "resource_history_insert_authenticated"
  on public.resource_history for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "incidents_insert_authenticated" on public.incidents;
create policy "incidents_insert_authenticated"
  on public.incidents for insert
  to authenticated
  with check (auth.uid() = reporter_id);

-- Lectura de perfiles para historial / nombres (además de profiles_select_own)
drop policy if exists "profiles_select_authenticated" on public.profiles;
create policy "profiles_select_authenticated"
  on public.profiles for select
  to authenticated
  using (true);

drop policy if exists "profiles_update_admin" on public.profiles;
create policy "profiles_update_admin"
  on public.profiles for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "profiles_insert_admin" on public.profiles;
create policy "profiles_insert_admin"
  on public.profiles for insert
  to authenticated
  with check (public.is_admin() or auth.uid() = id);

-- Storage: fotos de incidencias
drop policy if exists "incident_photos_insert" on storage.objects;
create policy "incident_photos_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'incident-photos');

drop policy if exists "incident_photos_select" on storage.objects;
create policy "incident_photos_select"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'incident-photos');

-- Grants DML
grant update on public.resources to authenticated;
grant insert on public.resource_history to authenticated;
grant insert on public.incidents to authenticated;
grant update on public.profiles to authenticated;
grant insert on public.profiles to authenticated;
