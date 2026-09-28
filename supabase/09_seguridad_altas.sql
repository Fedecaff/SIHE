-- =============================================================================
-- SIHE — 09 seguridad de altas (rol no viene del signUp)
-- Correr después de 08_admin_alta_incendio.sql. Idempotente.
-- =============================================================================

-- El alta en Auth ya no puede elegir rol ni activarse sola:
-- el perfil nace como operador inactivo. El admin lo activa y asigna el rol.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, name, institution, app_role, active)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(nullif(new.raw_user_meta_data->>'name', ''), 'Sin nombre'),
    coalesce(nullif(new.raw_user_meta_data->>'institution', ''), 'Sin institución'),
    'operador'::public.user_role,
    false
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

drop policy if exists "profiles_insert_admin" on public.profiles;
create policy "profiles_insert_admin"
  on public.profiles for insert
  to authenticated
  with check (public.is_admin());

create or replace function public.is_active_user()
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
      and p.active = true
  );
$$;

revoke all on function public.is_active_user() from public;
grant execute on function public.is_active_user() to authenticated;

drop policy if exists "resources_select_authenticated" on public.resources;
create policy "resources_select_authenticated"
  on public.resources for select
  to authenticated
  using (public.is_active_user());

drop policy if exists "resource_history_select_authenticated" on public.resource_history;
create policy "resource_history_select_authenticated"
  on public.resource_history for select
  to authenticated
  using (public.is_active_user());

drop policy if exists "incidents_select_authenticated" on public.incidents;
create policy "incidents_select_authenticated"
  on public.incidents for select
  to authenticated
  using (public.is_active_user());

drop policy if exists "fire_events_select_authenticated" on public.fire_events;
create policy "fire_events_select_authenticated"
  on public.fire_events for select
  to authenticated
  using (public.is_active_user());

drop policy if exists "incidents_insert_authenticated" on public.incidents;
create policy "incidents_insert_authenticated"
  on public.incidents for insert
  to authenticated
  with check (auth.uid() = reporter_id and public.is_active_user());
