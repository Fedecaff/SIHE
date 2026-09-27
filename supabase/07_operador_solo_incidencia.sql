-- =============================================================================
-- SIHE — 07 operador solo reporta incidencia
-- La ficha oficial la cambia el administrador (aprobación o edición).
-- =============================================================================

drop policy if exists "resources_update_authenticated" on public.resources;
drop policy if exists "resources_update_admin" on public.resources;
create policy "resources_update_admin"
  on public.resources for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());
