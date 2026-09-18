-- =============================================================================
-- SIHE — 01 esquema completo 
-- Incluye: PostGIS, enums, tablas, RLS, storage, vista mapa, grants.
-- =============================================================================

-- Extensiones y enums
create extension if not exists postgis with schema extensions;

do $$ begin
  create type public.user_role as enum ('operador', 'administrador');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.resource_type as enum ('hidrante', 'espejo', 'tanque');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.resource_status as enum ('operativo', 'observaciones', 'no_utilizable');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.incident_type as enum ('dano', 'obstruccion', 'datos_incorrectos', 'otro');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.incident_status as enum ('pendiente', 'aprobada', 'rechazada');
exception when duplicate_object then null;
end $$;

-- profiles (1:1 con auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  name text not null,
  institution text not null,
  app_role public.user_role not null default 'operador',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

-- resources
create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  type public.resource_type not null,
  name text not null,
  address text not null,
  location geography(point, 4326) not null,
  accessibility text,
  capacity text,
  status public.resource_status not null default 'operativo',
  observations text,
  last_verified_at timestamptz,
  last_verified_by_id uuid references public.profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists resources_location_gix on public.resources using gist (location);

drop trigger if exists resources_set_updated_at on public.resources;
create trigger resources_set_updated_at
before update on public.resources
for each row execute function public.set_updated_at();

-- resource_history
create table if not exists public.resource_history (
  id uuid primary key default gen_random_uuid(),
  resource_id uuid not null references public.resources (id) on delete cascade,
  user_id uuid not null references public.profiles (id),
  action text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists resource_history_resource_id_idx on public.resource_history (resource_id);
create index if not exists resource_history_created_at_idx on public.resource_history (created_at desc);

-- incidents
create table if not exists public.incidents (
  id uuid primary key default gen_random_uuid(),
  resource_id uuid not null references public.resources (id) on delete cascade,
  reporter_id uuid not null references public.profiles (id),
  type public.incident_type not null,
  description text not null,
  suggested_status public.resource_status,
  photo_path text,
  status public.incident_status not null default 'pendiente',
  reviewer_id uuid references public.profiles (id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists incidents_status_idx on public.incidents (status);
create index if not exists incidents_resource_id_idx on public.incidents (resource_id);

-- fire_events
create table if not exists public.fire_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  occurred_at timestamptz not null,
  location geography(point, 4326) not null,
  description text,
  linked_resource_id uuid references public.resources (id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists fire_events_location_gix on public.fire_events using gist (location);
create index if not exists fire_events_occurred_at_idx on public.fire_events (occurred_at desc);

-- RLS
alter table public.profiles enable row level security;
alter table public.resources enable row level security;
alter table public.resource_history enable row level security;
alter table public.incidents enable row level security;
alter table public.fire_events enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

drop policy if exists "resources_select_authenticated" on public.resources;
create policy "resources_select_authenticated"
  on public.resources for select
  to authenticated
  using (true);

drop policy if exists "resource_history_select_authenticated" on public.resource_history;
create policy "resource_history_select_authenticated"
  on public.resource_history for select
  to authenticated
  using (true);

drop policy if exists "incidents_select_authenticated" on public.incidents;
create policy "incidents_select_authenticated"
  on public.incidents for select
  to authenticated
  using (true);

drop policy if exists "fire_events_select_authenticated" on public.fire_events;
create policy "fire_events_select_authenticated"
  on public.fire_events for select
  to authenticated
  using (true);

-- Storage
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'incident-photos',
  'incident-photos',
  false,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do nothing;

-- Vista mapa (lat/lng para Leaflet)
create or replace view public.resources_map
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
  ST_Y(r.location::geometry) as lat,
  ST_X(r.location::geometry) as lng
from public.resources r;

-- Grants (front habla con anon key + sesión; RLS aplica)
grant usage on schema public to authenticated;
grant select on public.profiles to authenticated;
grant select on public.resources to authenticated;
grant select on public.resource_history to authenticated;
grant select on public.incidents to authenticated;
grant select on public.fire_events to authenticated;
grant select on public.resources_map to authenticated;
