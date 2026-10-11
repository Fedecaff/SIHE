-- =============================================================================
-- SIHE — 05b incendios de demostración (OPCIONAL)
--
-- ADVERTENCIA: estos eventos son ficticios, solo para ver el mapa de calor
-- en una base vacía. No los cargues si ya hay incendios reales.
--
-- Este script NUNCA borra filas. Si fire_events tiene al menos un evento,
-- no inserta nada.
--
-- Correr después de 05_admin_incendios.sql, y solo en una base de prueba.
-- =============================================================================

insert into public.fire_events (event_type, occurred_at, location, description)
select
  demo.event_type,
  demo.occurred_at,
  demo.location,
  demo.description
from (
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
    )
) as demo(event_type, occurred_at, location, description)
where not exists (select 1 from public.fire_events);
