-- =============================================================================
-- SIHE - hidrantes reales convertidos de EPSG:22183 (GeoJSON) a WGS84
-- Fuente: bombero/datos/hidrantespoints.geojson
-- 850 puntos. 
-- =============================================================================

delete from public.resources;

insert into public.resources (
  type, name, address, location, accessibility, capacity, status, observations
)
values
  (
    'hidrante'::public.resource_type,
    'Hidrante 1',
    'Hidrante 1 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7950628695, -28.5054978753), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 2',
    'Hidrante 2 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7967008673, -28.5071491115), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 3',
    'Hidrante 3 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7964939410, -28.5080973364), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 4',
    'Hidrante 4 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8090576358, -28.4874814040), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 5',
    'Hidrante 5 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8095352912, -28.4886760089), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 6',
    'Hidrante 6 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8082793071, -28.4885461212), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 7',
    'Hidrante 7 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7993624689, -28.4923091198), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 8',
    'Hidrante 8 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7983600477, -28.4910137246), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 9',
    'Hidrante 9 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7997198475, -28.4901561067), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 10',
    'Hidrante 10 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7714711881, -28.4294480250), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 11',
    'Hidrante 11 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7706343345, -28.4293857985), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 12',
    'Hidrante 12 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7698078618, -28.4305078048), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 13',
    'Hidrante 13 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7680257421, -28.4313157593), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 14',
    'Hidrante 14 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7783245024, -28.4469242524), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 15',
    'Hidrante 15 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7793170608, -28.4476431907), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 16',
    'Hidrante 16 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7841482270, -28.4516338174), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 17',
    'Hidrante 17 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7826478253, -28.4512466918), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 18',
    'Hidrante 18 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7846327283, -28.4532609096), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 19',
    'Hidrante 19 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7779525081, -28.4533772687), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 20',
    'Hidrante 20 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7636155544, -28.4337593488), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 21',
    'Hidrante 21 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7621916648, -28.4333785236), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 22',
    'Hidrante 22 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7618958805, -28.4318405122), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 23',
    'Hidrante 23 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7625692744, -28.4304929636), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 24',
    'Hidrante 24 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7614380246, -28.4325416762), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 25',
    'Hidrante 25 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7657278088, -28.4263746495), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 26',
    'Hidrante 26 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7654177226, -28.4252973504), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 27',
    'Hidrante 27 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7654923746, -28.4270576542), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 28',
    'Hidrante 28 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7659322787, -28.4276638742), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 29',
    'Hidrante 29 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7746652448, -28.4250225501), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 30',
    'Hidrante 30 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7744759009, -28.4273208519), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 31',
    'Hidrante 31 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7688969777, -28.4256884239), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 32',
    'Hidrante 32 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7682763582, -28.4262831776), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 33',
    'Hidrante 33 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7673401095, -28.4269729255), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 34',
    'Hidrante 34 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7675328347, -28.4280884705), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 35',
    'Hidrante 35 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7682781860, -28.4270205871), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 36',
    'Hidrante 36 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7689303656, -28.4262490764), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 37',
    'Hidrante 37 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7699680524, -28.4261909266), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 38',
    'Hidrante 38 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7698019699, -28.4256055370), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 39',
    'Hidrante 39 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7693417702, -28.4278807664), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 40',
    'Hidrante 40 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7729320837, -28.4234962928), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 41',
    'Hidrante 41 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7723949527, -28.4246959724), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 42',
    'Hidrante 42 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7732442180, -28.4257124315), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 43',
    'Hidrante 43 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7733598903, -28.4268662538), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 44',
    'Hidrante 44 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7721845787, -28.4275732083), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 45',
    'Hidrante 45 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7622699069, -28.4343105411), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 46',
    'Hidrante 46 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7625990552, -28.4363497228), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 47',
    'Hidrante 47 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7666417557, -28.4367827090), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 48',
    'Hidrante 48 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7641486710, -28.4353972418), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 49',
    'Hidrante 49 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7670139340, -28.4344895503), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 50',
    'Hidrante 50 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7653356722, -28.4330019439), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 51',
    'Hidrante 51 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7662985303, -28.4300146214), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 52',
    'Hidrante 52 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7672959666, -28.4287719896), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 53',
    'Hidrante 53 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7678858635, -28.4298423412), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 54',
    'Hidrante 54 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7685009090, -28.4282164276), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 55',
    'Hidrante 55 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7694968554, -28.4286606794), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 56',
    'Hidrante 56 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7697346802, -28.4295444855), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 58',
    'Hidrante 58 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7291449351, -28.4329985578), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 59',
    'Hidrante 59 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7312452357, -28.4368308105), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 60',
    'Hidrante 60 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7339182243, -28.4416179203), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 61',
    'Hidrante 61 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7724856521, -28.4309177220), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 62',
    'Hidrante 62 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7710387828, -28.4309307814), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 63',
    'Hidrante 63 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7722052558, -28.4302726217), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 64',
    'Hidrante 64 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7719466069, -28.4282488438), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 65',
    'Hidrante 65 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7722959765, -28.4291365141), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 66',
    'Hidrante 66 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7759905256, -28.4324306495), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 67',
    'Hidrante 67 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7766238247, -28.4321728545), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 68',
    'Hidrante 68 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7772249381, -28.4318650312), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 69',
    'Hidrante 69 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7775811476, -28.4324699827), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 70',
    'Hidrante 70 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7786920947, -28.4322265566), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 71',
    'Hidrante 71 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7756975690, -28.4260062735), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 72',
    'Hidrante 72 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7868699246, -28.4360697946), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 73',
    'Hidrante 73 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7856155793, -28.4352894187), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 74',
    'Hidrante 74 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7868470326, -28.4343655138), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 75',
    'Hidrante 75 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7856355020, -28.4339873841), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 76',
    'Hidrante 76 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7854784457, -28.4331994198), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 77',
    'Hidrante 77 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7867082521, -28.4326637880), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 78',
    'Hidrante 78 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7852079429, -28.4321864591), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 79',
    'Hidrante 79 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7864317208, -28.4318753851), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 80',
    'Hidrante 80 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7848908646, -28.4313785629), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 81',
    'Hidrante 81 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7854331493, -28.4304754765), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 82',
    'Hidrante 82 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7863277265, -28.4312238684), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 83',
    'Hidrante 83 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7865577808, -28.4376116010), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 84',
    'Hidrante 84 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7857251709, -28.4364427115), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 85',
    'Hidrante 85 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7888182235, -28.4427568125), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 86',
    'Hidrante 86 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7847729675, -28.4302462398), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 87',
    'Hidrante 87 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7865380320, -28.4277318147), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 88',
    'Hidrante 88 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7842243453, -28.4370799957), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 89',
    'Hidrante 89 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7763416547, -28.4272060327), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 90',
    'Hidrante 90 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7747800159, -28.4249318584), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 91',
    'Hidrante 91 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7753971831, -28.4250223648), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 92',
    'Hidrante 92 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7750145492, -28.4262771786), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 93',
    'Hidrante 93 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7757630864, -28.4271009303), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 94',
    'Hidrante 94 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7743484696, -28.4334839652), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 95',
    'Hidrante 95 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7768580991, -28.4411385193), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 96',
    'Hidrante 96 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7745812432, -28.4305386246), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 97',
    'Hidrante 97 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7854877604, -28.4363027904), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 98',
    'Hidrante 98 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7779758114, -28.4363171812), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 99',
    'Hidrante 99 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7767799098, -28.4368051249), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 100',
    'Hidrante 100 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7728996547, -28.4291817708), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 101',
    'Hidrante 101 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7737730981, -28.4290608942), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 102',
    'Hidrante 102 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7779225790, -28.4268051876), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 103',
    'Hidrante 103 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7840348315, -28.4348581770), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 104',
    'Hidrante 104 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7825444336, -28.4365792594), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 105',
    'Hidrante 105 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7812942361, -28.4338803227), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 106',
    'Hidrante 106 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7707233801, -28.4399208431), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 107',
    'Hidrante 107 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7718553316, -28.4411471661), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 108',
    'Hidrante 108 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7721604002, -28.4429468896), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 109',
    'Hidrante 109 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7730663060, -28.4422811066), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 110',
    'Hidrante 110 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7714241892, -28.4421482259), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 111',
    'Hidrante 111 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7831020069, -28.4293194768), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 112',
    'Hidrante 112 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7837417310, -28.4305788726), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 113',
    'Hidrante 113 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7847024712, -28.4322025190), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 114',
    'Hidrante 114 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7819705359, -28.4326102466), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 115',
    'Hidrante 115 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7681610594, -28.4650043639), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 116',
    'Hidrante 116 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7557343149, -28.4567717583), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 117',
    'Hidrante 117 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7656432841, -28.4622631419), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 118',
    'Hidrante 118 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7469937952, -28.4600220879), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 119',
    'Hidrante 119 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7527432294, -28.4604862791), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 120',
    'Hidrante 120 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7597733750, -28.4665840783), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 121',
    'Hidrante 121 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7437081425, -28.4522481862), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 122',
    'Hidrante 122 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7351649392, -28.4544240543), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 123',
    'Hidrante 123 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7445701269, -28.4544412920), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 124',
    'Hidrante 124 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7547390925, -28.4614362319), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 125',
    'Hidrante 125 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7672251382, -28.4428893667), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 126',
    'Hidrante 126 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7320336622, -28.4487694172), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 127',
    'Hidrante 127 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7375719554, -28.4504457602), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 128',
    'Hidrante 128 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7384903818, -28.4499351665), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 129',
    'Hidrante 129 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7376576887, -28.4489466951), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 130',
    'Hidrante 130 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7349047332, -28.4520933267), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 131',
    'Hidrante 131 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7420565227, -28.4563553907), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 132',
    'Hidrante 132 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7426928969, -28.4532092160), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 133',
    'Hidrante 133 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7421733263, -28.4528250909), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 134',
    'Hidrante 134 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7415769042, -28.4523580691), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 135',
    'Hidrante 135 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7472413596, -28.4540357540), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 136',
    'Hidrante 136 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7453365372, -28.4530262590), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 137',
    'Hidrante 137 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7472766595, -28.4561104770), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 138',
    'Hidrante 138 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7506912203, -28.4594956777), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 139',
    'Hidrante 139 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7497207702, -28.4639281514), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 140',
    'Hidrante 140 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7507706614, -28.4644913532), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 141',
    'Hidrante 141 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7519610926, -28.4643389988), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 142',
    'Hidrante 142 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7523129113, -28.4625992512), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 143',
    'Hidrante 143 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7555508271, -28.4659398463), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 144',
    'Hidrante 144 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7609025508, -28.4630482850), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 145',
    'Hidrante 145 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7600164134, -28.4618286660), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 146',
    'Hidrante 146 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7623065190, -28.4632355829), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 147',
    'Hidrante 147 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7596584853, -28.4635111097), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 148',
    'Hidrante 148 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7574100574, -28.4610469567), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 149',
    'Hidrante 149 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7565161152, -28.4645347546), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 150',
    'Hidrante 150 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7587099722, -28.4647521056), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 151',
    'Hidrante 151 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7638644809, -28.4714191544), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 152',
    'Hidrante 152 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7600279732, -28.4680022317), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 153',
    'Hidrante 153 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7651999568, -28.4670505071), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 154',
    'Hidrante 154 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7673969208, -28.4672598085), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 155',
    'Hidrante 155 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7661639169, -28.4631197218), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 156',
    'Hidrante 156 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7671206216, -28.4627864396), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 157',
    'Hidrante 157 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7666161530, -28.4630831402), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 158',
    'Hidrante 158 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7683809802, -28.4631414777), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 159',
    'Hidrante 159 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7697567966, -28.4632022337), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 160',
    'Hidrante 160 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7685842024, -28.4619131608), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 161',
    'Hidrante 161 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7704760386, -28.4620767613), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 162',
    'Hidrante 162 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7698891470, -28.4604982535), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 163',
    'Hidrante 163 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7550534605, -28.4607642115), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 164',
    'Hidrante 164 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7561318198, -28.4641758004), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 165',
    'Hidrante 165 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7570652013, -28.4648834569), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 166',
    'Hidrante 166 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7568124333, -28.4633071908), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 167',
    'Hidrante 167 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7575349547, -28.4647516481), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 168',
    'Hidrante 168 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7595168107, -28.4612133463), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 169',
    'Hidrante 169 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7601495644, -28.4625007552), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 170',
    'Hidrante 170 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7599014012, -28.4643842299), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 171',
    'Hidrante 171 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7613485101, -28.4656643621), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 172',
    'Hidrante 172 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7615037956, -28.4687017866), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 173',
    'Hidrante 173 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7633339963, -28.4689436467), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 174',
    'Hidrante 174 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7653964843, -28.4691232420), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 175',
    'Hidrante 175 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7624382391, -28.4682206664), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 176',
    'Hidrante 176 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7612807235, -28.4681105401), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 177',
    'Hidrante 177 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7651852094, -28.4684599298), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 178',
    'Hidrante 178 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7613952313, -28.4674668942), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 179',
    'Hidrante 179 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7634413419, -28.4676327004), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 180',
    'Hidrante 180 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7664063153, -28.4692840008), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 181',
    'Hidrante 181 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7657312474, -28.4686695360), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 182',
    'Hidrante 182 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7655456990, -28.4680056928), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 183',
    'Hidrante 183 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7658672804, -28.4757443490), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 184',
    'Hidrante 184 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7665406735, -28.4752610738), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 185',
    'Hidrante 185 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7668803812, -28.4742066262), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 186',
    'Hidrante 186 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7695902938, -28.4743058246), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 187',
    'Hidrante 187 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7677284490, -28.4731844063), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 188',
    'Hidrante 188 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7660757966, -28.4739168022), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 189',
    'Hidrante 189 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7663557496, -28.4717820521), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 190',
    'Hidrante 190 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7667674721, -28.4725675654), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 191',
    'Hidrante 191 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7694157081, -28.4719000291), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 192',
    'Hidrante 192 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7696098763, -28.4676079305), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 193',
    'Hidrante 193 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7685591317, -28.4762712927), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 194',
    'Hidrante 194 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7683319447, -28.4783793837), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 195',
    'Hidrante 195 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7680525335, -28.4775105109), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 196',
    'Hidrante 196 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7671312979, -28.4769244649), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 197',
    'Hidrante 197 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7983234278, -28.4656324272), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 198',
    'Hidrante 198 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7832208369, -28.4468928516), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 199',
    'Hidrante 199 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7850897643, -28.4481449376), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 200',
    'Hidrante 200 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7851763638, -28.4493435881), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 201',
    'Hidrante 201 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7832687306, -28.4487062192), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 202',
    'Hidrante 202 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7833830002, -28.4507782277), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 203',
    'Hidrante 203 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8149110848, -28.4715832313), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 204',
    'Hidrante 204 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8016712402, -28.4612391218), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 205',
    'Hidrante 205 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8019227645, -28.4618996632), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 206',
    'Hidrante 206 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8048758515, -28.4614285152), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 207',
    'Hidrante 207 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8032816969, -28.4630656694), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 208',
    'Hidrante 208 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7961849148, -28.4631906498), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 209',
    'Hidrante 209 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7872431332, -28.4648843923), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 210',
    'Hidrante 210 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8173570933, -28.4718203212), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 211',
    'Hidrante 211 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8195010668, -28.4739203213), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 212',
    'Hidrante 212 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8184205191, -28.4749003106), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 213',
    'Hidrante 213 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8153825772, -28.4724937257), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 214',
    'Hidrante 214 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8109345013, -28.4706135844), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 215',
    'Hidrante 215 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8167905506, -28.4723272027), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 216',
    'Hidrante 216 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7948228351, -28.4595544381), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 217',
    'Hidrante 217 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8010655886, -28.4707718406), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 218',
    'Hidrante 218 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8009850531, -28.4718683370), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 219',
    'Hidrante 219 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7923825173, -28.4697621130), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 220',
    'Hidrante 220 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7931315817, -28.4667266472), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 221',
    'Hidrante 221 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7933882360, -28.4699067582), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 222',
    'Hidrante 222 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7941167054, -28.4689303948), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 223',
    'Hidrante 223 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7957287447, -28.4683405204), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 224',
    'Hidrante 224 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7958103716, -28.4675887301), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 225',
    'Hidrante 225 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8043755425, -28.4656523959), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 226',
    'Hidrante 226 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7742960086, -28.4434519465), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 227',
    'Hidrante 227 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8108935083, -28.4722075983), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 228',
    'Hidrante 228 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8141578589, -28.4753932616), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 229',
    'Hidrante 229 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8138936080, -28.4747493281), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 230',
    'Hidrante 230 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8116436616, -28.4747616375), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 231',
    'Hidrante 231 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8126558874, -28.4745091349), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 232',
    'Hidrante 232 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8063752172, -28.4737338999), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 233',
    'Hidrante 233 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8110363414, -28.4689647394), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 234',
    'Hidrante 234 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8183971330, -28.4711488012), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 235',
    'Hidrante 235 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8161739380, -28.4687945408), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 236',
    'Hidrante 236 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8165192383, -28.4681133471), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 237',
    'Hidrante 237 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8168165349, -28.4674889830), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 238',
    'Hidrante 238 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7873979487, -28.4503189849), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 239',
    'Hidrante 239 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7871287050, -28.4520083333), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 240',
    'Hidrante 240 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7841208241, -28.4539623417), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 241',
    'Hidrante 241 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7831852799, -28.4549201630), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 242',
    'Hidrante 242 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7837064100, -28.4553556936), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 243',
    'Hidrante 243 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7835462764, -28.4558311588), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 244',
    'Hidrante 244 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7827982713, -28.4564579249), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 245',
    'Hidrante 245 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7876929392, -28.4529994431), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 246',
    'Hidrante 246 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7901203834, -28.4498009116), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 247',
    'Hidrante 247 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7909298478, -28.4523433576), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 248',
    'Hidrante 248 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7917068241, -28.4524262630), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 249',
    'Hidrante 249 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7923436158, -28.4523822592), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 250',
    'Hidrante 250 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7929956376, -28.4519863047), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 251',
    'Hidrante 251 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7931421332, -28.4498159485), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 252',
    'Hidrante 252 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8053206080, -28.4696290895), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 253',
    'Hidrante 253 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8084591128, -28.4678598173), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 254',
    'Hidrante 254 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8158205007, -28.4711683517), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 255',
    'Hidrante 255 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8098832790, -28.4723869456), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 256',
    'Hidrante 256 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7971706390, -28.4662344485), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 257',
    'Hidrante 257 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8035169781, -28.4646899615), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 258',
    'Hidrante 258 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8037536400, -28.4611310325), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 259',
    'Hidrante 259 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7956345410, -28.4588588715), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 260',
    'Hidrante 260 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7779371680, -28.4558808698), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 261',
    'Hidrante 261 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7706059439, -28.4627105911), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 262',
    'Hidrante 262 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7746141134, -28.4704440532), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 263',
    'Hidrante 263 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7715686710, -28.4632301716), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 264',
    'Hidrante 264 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7721009469, -28.4631434428), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 265',
    'Hidrante 265 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7707546349, -28.4608921832), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 266',
    'Hidrante 266 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7741957527, -28.4625691990), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 267',
    'Hidrante 267 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7722075840, -28.4617785535), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 268',
    'Hidrante 268 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7718645360, -28.4610437755), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 269',
    'Hidrante 269 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7868338478, -28.4661964462), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 270',
    'Hidrante 270 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8015442619, -28.4726383293), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 271',
    'Hidrante 271 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8014486584, -28.4706604140), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 272',
    'Hidrante 272 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8027609476, -28.4707659563), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 273',
    'Hidrante 273 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8031306617, -28.4707833191), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 274',
    'Hidrante 274 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7986830868, -28.4706538949), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 275',
    'Hidrante 275 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7984761511, -28.4725130668), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 276',
    'Hidrante 276 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7985658678, -28.4713901133), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 277',
    'Hidrante 277 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7985777337, -28.4715611294), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 278',
    'Hidrante 278 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7984804838, -28.4722425264), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 279',
    'Hidrante 279 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7986470563, -28.4707803197), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 280',
    'Hidrante 280 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7985331358, -28.4718569431), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 281',
    'Hidrante 281 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7986130672, -28.4711292004), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 282',
    'Hidrante 282 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8010710712, -28.4692898058), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 283',
    'Hidrante 283 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8011250335, -28.4699173025), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 284',
    'Hidrante 284 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8010962928, -28.4672993078), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 285',
    'Hidrante 285 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8050735229, -28.4607040208), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 286',
    'Hidrante 286 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8057562288, -28.4600114682), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 287',
    'Hidrante 287 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8051431025, -28.4593194763), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 288',
    'Hidrante 288 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8056215026, -28.4612233152), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 289',
    'Hidrante 289 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8028105831, -28.4592084904), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 290',
    'Hidrante 290 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8045668079, -28.4599678102), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 291',
    'Hidrante 291 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8037090108, -28.4592327211), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 292',
    'Hidrante 292 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8028169810, -28.4644485002), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 293',
    'Hidrante 293 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8022835794, -28.4637517389), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 294',
    'Hidrante 294 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8041866034, -28.4631230875), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 295',
    'Hidrante 295 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8038032553, -28.4637886624), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 296',
    'Hidrante 296 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8020485392, -28.4670729602), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 297',
    'Hidrante 297 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8018645337, -28.4666569423), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 298',
    'Hidrante 298 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8020216266, -28.4649644643), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 299',
    'Hidrante 299 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8037565840, -28.4650140092), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 300',
    'Hidrante 300 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8082727404, -28.4662053059), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 301',
    'Hidrante 301 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8082748104, -28.4670683640), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 302',
    'Hidrante 302 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8045923332, -28.4668494072), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 303',
    'Hidrante 303 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8061575271, -28.4665112114), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 304',
    'Hidrante 304 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8067274427, -28.4657215876), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 305',
    'Hidrante 305 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8065321449, -28.4648507891), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 306',
    'Hidrante 306 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8060938528, -28.4674541075), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 307',
    'Hidrante 307 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8080857560, -28.4729778731), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 308',
    'Hidrante 308 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8082958893, -28.4728712334), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 309',
    'Hidrante 309 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8090728152, -28.4711945825), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 310',
    'Hidrante 310 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8141079287, -28.4711913973), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 311',
    'Hidrante 311 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8202509316, -28.4675633758), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 312',
    'Hidrante 312 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8190103663, -28.4689006614), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 313',
    'Hidrante 313 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8215287559, -28.4684115861), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 314',
    'Hidrante 314 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8002312272, -28.4708607170), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 315',
    'Hidrante 315 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7989465636, -28.4589355973), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 316',
    'Hidrante 316 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7705457812, -28.4696345750), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 317',
    'Hidrante 317 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7967115646, -28.4755342508), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 318',
    'Hidrante 318 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7973274134, -28.4745451158), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 319',
    'Hidrante 319 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7948714443, -28.4742053973), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 320',
    'Hidrante 320 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7931985080, -28.4731372002), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 321',
    'Hidrante 321 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7949672300, -28.4731716037), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 322',
    'Hidrante 322 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7942590499, -28.4722751735), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 323',
    'Hidrante 323 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7959620512, -28.4719870020), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 324',
    'Hidrante 324 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7965780580, -28.4720252457), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 325',
    'Hidrante 325 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7975883005, -28.4719386245), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 326',
    'Hidrante 326 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7972524248, -28.4710862255), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 327',
    'Hidrante 327 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7914905589, -28.4730666055), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 328',
    'Hidrante 328 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7926171651, -28.4713894164), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 329',
    'Hidrante 329 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7900471617, -28.4737783660), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 330',
    'Hidrante 330 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7892148264, -28.4728552494), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 331',
    'Hidrante 331 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7879317941, -28.4738625690), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 332',
    'Hidrante 332 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7879717426, -28.4716671993), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 333',
    'Hidrante 333 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7885637996, -28.4657182373), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 334',
    'Hidrante 334 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7886183077, -28.4647528721), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 335',
    'Hidrante 335 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7888438856, -28.4637503270), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 336',
    'Hidrante 336 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7874248193, -28.4634571133), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 337',
    'Hidrante 337 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7707692523, -28.4754494439), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 338',
    'Hidrante 338 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7866148486, -28.4753924031), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 339',
    'Hidrante 339 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7719650275, -28.4743719461), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 340',
    'Hidrante 340 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7708761281, -28.4731885182), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 341',
    'Hidrante 341 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7725019747, -28.4737499992), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 342',
    'Hidrante 342 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7740497897, -28.4745451542), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 343',
    'Hidrante 343 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7768711975, -28.4746773586), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 344',
    'Hidrante 344 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7857321269, -28.4750865623), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 345',
    'Hidrante 345 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7720474629, -28.4730857402), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 346',
    'Hidrante 346 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7754666144, -28.4732553595), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 347',
    'Hidrante 347 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7784878771, -28.4734309469), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 348',
    'Hidrante 348 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7812420782, -28.4735643121), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 349',
    'Hidrante 349 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7842061801, -28.4737328877), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 350',
    'Hidrante 350 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7865444220, -28.4738926277), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 351',
    'Hidrante 351 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7740404301, -28.4719098156), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 352',
    'Hidrante 352 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7770116027, -28.4720391689), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 353',
    'Hidrante 353 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7782042826, -28.4719063059), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 354',
    'Hidrante 354 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7799063327, -28.4721558955), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 355',
    'Hidrante 355 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7826746676, -28.4723112693), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 356',
    'Hidrante 356 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7853080791, -28.4725417489), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 357',
    'Hidrante 357 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7722168848, -28.4704727263), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 358',
    'Hidrante 358 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7795151365, -28.4696099837), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 359',
    'Hidrante 359 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7786555065, -28.4708380523), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 360',
    'Hidrante 360 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7808582655, -28.4709837355), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 361',
    'Hidrante 361 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7854926176, -28.4702347617), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 362',
    'Hidrante 362 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7712941451, -28.4689584720), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 363',
    'Hidrante 363 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7741718923, -28.4691655232), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 364',
    'Hidrante 364 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7770739467, -28.4693553299), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 365',
    'Hidrante 365 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7727183818, -28.4677264120), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 366',
    'Hidrante 366 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7796057489, -28.4683323519), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 367',
    'Hidrante 367 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7797635858, -28.4671877107), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 368',
    'Hidrante 368 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7843147383, -28.4686867093), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 369',
    'Hidrante 369 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7714013218, -28.4664513779), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 370',
    'Hidrante 370 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7742916807, -28.4666611503), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 371',
    'Hidrante 371 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7771813921, -28.4668393308), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 372',
    'Hidrante 372 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7800956799, -28.4670327929), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 373',
    'Hidrante 373 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7757023002, -28.4654549242), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 374',
    'Hidrante 374 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7786522158, -28.4656016308), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 375',
    'Hidrante 375 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7816653955, -28.4658407315), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 376',
    'Hidrante 376 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7846088666, -28.4660301535), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 377',
    'Hidrante 377 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7800739434, -28.4644401627), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 378',
    'Hidrante 378 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7831196107, -28.4646463555), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 379',
    'Hidrante 379 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7853332738, -28.4641324779), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 380',
    'Hidrante 380 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7815990309, -28.4629517504), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 381',
    'Hidrante 381 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7751869921, -28.4617328089), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 382',
    'Hidrante 382 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7758698653, -28.4603840588), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 383',
    'Hidrante 383 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7799196206, -28.4615541554), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 384',
    'Hidrante 384 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7828200883, -28.4619374386), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 385',
    'Hidrante 385 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7829856443, -28.4616610581), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 386',
    'Hidrante 386 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7859700664, -28.4623874277), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 387',
    'Hidrante 387 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7756635181, -28.4576371914), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 388',
    'Hidrante 388 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7808720536, -28.4574817306), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 389',
    'Hidrante 389 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7862220545, -28.4550045489), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 390',
    'Hidrante 390 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7875547474, -28.4557448482), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 391',
    'Hidrante 391 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7929089847, -28.4550038674), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 392',
    'Hidrante 392 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7918613898, -28.4567009114), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 393',
    'Hidrante 393 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7919072776, -28.4562627394), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 394',
    'Hidrante 394 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7860624382, -28.4585113451), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 395',
    'Hidrante 395 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7852884913, -28.4595026332), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 396',
    'Hidrante 396 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7882974397, -28.4584285343), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 397',
    'Hidrante 397 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7890268851, -28.4573848911), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 398',
    'Hidrante 398 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7890543661, -28.4563654658), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 399',
    'Hidrante 399 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7897500738, -28.4570290871), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 400',
    'Hidrante 400 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7895781955, -28.4578888021), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 401',
    'Hidrante 401 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7893995433, -28.4591915473), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 402',
    'Hidrante 402 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7936198202, -28.4560901847), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 403',
    'Hidrante 403 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7931739211, -28.4573688199), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 404',
    'Hidrante 404 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7943318163, -28.4582982430), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 405',
    'Hidrante 405 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7950309883, -28.4576385927), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 406',
    'Hidrante 406 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7995311657, -28.4679897326), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 407',
    'Hidrante 407 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8005331395, -28.4680391186), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 408',
    'Hidrante 408 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7997684329, -28.4672815056), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 409',
    'Hidrante 409 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7966574264, -28.4668460868), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 410',
    'Hidrante 410 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7973744379, -28.4650651020), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 411',
    'Hidrante 411 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7984780973, -28.4645193851), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 412',
    'Hidrante 412 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7974990761, -28.4639091053), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 413',
    'Hidrante 413 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7958347122, -28.4655359552), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 414',
    'Hidrante 414 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7958140941, -28.4661423881), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 415',
    'Hidrante 415 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7959166353, -28.4649299664), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 416',
    'Hidrante 416 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7959938586, -28.4642759420), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 417',
    'Hidrante 417 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7960324660, -28.4637371886), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 418',
    'Hidrante 418 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7923087089, -28.4636843706), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 419',
    'Hidrante 419 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7933128609, -28.4629667527), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 420',
    'Hidrante 420 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7951673771, -28.4629413355), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 421',
    'Hidrante 421 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7963569022, -28.4625818981), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 422',
    'Hidrante 422 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7924905923, -28.4619936496), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 423',
    'Hidrante 423 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7909246730, -28.4654008806), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 424',
    'Hidrante 424 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7908488600, -28.4644431736), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 425',
    'Hidrante 425 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7909234415, -28.4634005380), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 426',
    'Hidrante 426 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7900525517, -28.4633544045), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 427',
    'Hidrante 427 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7911997915, -28.4623323498), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 428',
    'Hidrante 428 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7922950837, -28.4624720311), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 429',
    'Hidrante 429 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7948415347, -28.5030188859), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 430',
    'Hidrante 430 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7932115198, -28.5044225740), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 431',
    'Hidrante 431 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7965514257, -28.5029760136), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 432',
    'Hidrante 432 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7927644806, -28.5033053219), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 433',
    'Hidrante 433 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7945962548, -28.5021496306), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 434',
    'Hidrante 434 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7955325321, -28.5014521159), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 435',
    'Hidrante 435 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7953788406, -28.5041499882), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 436',
    'Hidrante 436 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7974049576, -28.5018456875), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 437',
    'Hidrante 437 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7863799516, -28.5083287175), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 438',
    'Hidrante 438 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7888870951, -28.5079349920), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 439',
    'Hidrante 439 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7912959881, -28.5068409075), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 440',
    'Hidrante 440 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7923261992, -28.5060888070), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 441',
    'Hidrante 441 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7872258154, -28.5071461137), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 442',
    'Hidrante 442 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7876281415, -28.5074901316), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 443',
    'Hidrante 443 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7895290263, -28.5070115806), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 444',
    'Hidrante 444 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7904046834, -28.5048662501), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 445',
    'Hidrante 445 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7881042548, -28.5062113498), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 446',
    'Hidrante 446 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7900199227, -28.5058852042), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 447',
    'Hidrante 447 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7915883953, -28.5053408375), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 448',
    'Hidrante 448 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7889368205, -28.5053632878), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 449',
    'Hidrante 449 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7874693918, -28.5046198842), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 450',
    'Hidrante 450 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7963232286, -28.4979084112), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 451',
    'Hidrante 451 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8025483656, -28.5060148860), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 452',
    'Hidrante 452 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8012980369, -28.5064520680), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 453',
    'Hidrante 453 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8012540641, -28.5054810429), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 454',
    'Hidrante 454 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8008913932, -28.5042660469), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 455',
    'Hidrante 455 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8023006002, -28.5047289383), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 456',
    'Hidrante 456 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8019559843, -28.5035703241), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 457',
    'Hidrante 457 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7982993979, -28.5060881318), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 458',
    'Hidrante 458 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7998791808, -28.5068889796), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 459',
    'Hidrante 459 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7984415744, -28.5071677151), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 460',
    'Hidrante 460 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7958537832, -28.5084078529), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 461',
    'Hidrante 461 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7957002793, -28.5074544732), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 462',
    'Hidrante 462 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7943576785, -28.5074906616), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 463',
    'Hidrante 463 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7968201567, -28.4964627410), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 464',
    'Hidrante 464 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8017568080, -28.4902660344), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 465',
    'Hidrante 465 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7852142004, -28.4945891439), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 466',
    'Hidrante 466 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7843999304, -28.4952956502), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 467',
    'Hidrante 467 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7856338047, -28.4955652779), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 468',
    'Hidrante 468 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7978948143, -28.4819166916), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 469',
    'Hidrante 469 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7970450668, -28.4812457515), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 470',
    'Hidrante 470 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7765814285, -28.4869491591), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 471',
    'Hidrante 471 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7968645615, -28.4806620367), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 472',
    'Hidrante 472 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7970474375, -28.4860571305), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 473',
    'Hidrante 473 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7986537548, -28.5014073465), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 474',
    'Hidrante 474 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7994697294, -28.5010639933), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 475',
    'Hidrante 475 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7973669944, -28.5013154685), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 476',
    'Hidrante 476 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7999801456, -28.5001609602), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 477',
    'Hidrante 477 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7970087808, -28.5006967678), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 478',
    'Hidrante 478 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7989929738, -28.4992506022), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 479',
    'Hidrante 479 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7983243162, -28.4983385020), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 480',
    'Hidrante 480 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7953804332, -28.4976932258), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 481',
    'Hidrante 481 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7950850095, -28.4972392508), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 482',
    'Hidrante 482 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7948865452, -28.4967196893), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 483',
    'Hidrante 483 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7897334516, -28.4835265909), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 484',
    'Hidrante 484 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8006097096, -28.4932626295), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 485',
    'Hidrante 485 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8013959729, -28.4926434505), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 486',
    'Hidrante 486 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8004764170, -28.4917578932), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 487',
    'Hidrante 487 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8003901508, -28.4924199670), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 488',
    'Hidrante 488 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7997276301, -28.4912977643), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 489',
    'Hidrante 489 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8008164927, -28.4910409945), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 490',
    'Hidrante 490 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8035054942, -28.4937576608), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 491',
    'Hidrante 491 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8142571596, -28.4763046134), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 492',
    'Hidrante 492 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8079630674, -28.4791727117), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 493',
    'Hidrante 493 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7979916935, -28.4808178591), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 494',
    'Hidrante 494 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7984982701, -28.4787795002), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 495',
    'Hidrante 495 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7868380556, -28.5034390181), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 496',
    'Hidrante 496 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7881257890, -28.5032879345), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 497',
    'Hidrante 497 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7872197724, -28.5015525948), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 498',
    'Hidrante 498 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7839648312, -28.5011297756), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 499',
    'Hidrante 499 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7859068252, -28.5010056663), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 500',
    'Hidrante 500 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7923356868, -28.5014476081), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 501',
    'Hidrante 501 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7935612538, -28.5001979902), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 502',
    'Hidrante 502 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7952612580, -28.5001820824), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 503',
    'Hidrante 503 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7958588420, -28.4993963903), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 504',
    'Hidrante 504 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7964669436, -28.4997366483), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 505',
    'Hidrante 505 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7962287903, -28.4992312121), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 506',
    'Hidrante 506 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7959875044, -28.4986916498), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 507',
    'Hidrante 507 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7960702844, -28.4955604715), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 508',
    'Hidrante 508 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7945170310, -28.4956345215), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 509',
    'Hidrante 509 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7871766173, -28.4837004581), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 510',
    'Hidrante 510 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7913670048, -28.4850366185), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 511',
    'Hidrante 511 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7788879978, -28.4784664291), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 512',
    'Hidrante 512 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8001280861, -28.4784936616), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 513',
    'Hidrante 513 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7839623014, -28.4999695495), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 514',
    'Hidrante 514 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7849392325, -28.4994456373), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 515',
    'Hidrante 515 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7984325231, -28.4849549406), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 516',
    'Hidrante 516 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7977833836, -28.4849181639), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 517',
    'Hidrante 517 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7956619574, -28.4865116292), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 518',
    'Hidrante 518 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7960062876, -28.4855899054), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 519',
    'Hidrante 519 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7954291495, -28.4857248125), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 520',
    'Hidrante 520 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7947946191, -28.4863573598), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 521',
    'Hidrante 521 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7953214299, -28.4873283831), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 522',
    'Hidrante 522 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7946261438, -28.4875836419), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 523',
    'Hidrante 523 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7931203218, -28.4883390598), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 524',
    'Hidrante 524 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7932024308, -28.4873910745), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 525',
    'Hidrante 525 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7931931819, -28.4861065443), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 526',
    'Hidrante 526 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7925517296, -28.4863077184), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 527',
    'Hidrante 527 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7924216477, -28.4877359871), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 528',
    'Hidrante 528 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7918047092, -28.4892922241), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 529',
    'Hidrante 529 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7910258740, -28.4882488085), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 530',
    'Hidrante 530 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7905563486, -28.4871416115), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 531',
    'Hidrante 531 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7917716286, -28.4872146369), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 532',
    'Hidrante 532 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7911539538, -28.4864219776), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 533',
    'Hidrante 533 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7876746807, -28.4848922502), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 534',
    'Hidrante 534 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7861736104, -28.4843913203), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 535',
    'Hidrante 535 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7856050964, -28.4854516419), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 536',
    'Hidrante 536 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7842508079, -28.4865061157), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 537',
    'Hidrante 537 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7829662867, -28.4868410771), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 538',
    'Hidrante 538 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7840815174, -28.4873318244), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 539',
    'Hidrante 539 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7858525462, -28.4880283878), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 540',
    'Hidrante 540 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7999291009, -28.4959698163), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 541',
    'Hidrante 541 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8023213887, -28.4966498390), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 542',
    'Hidrante 542 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8024140864, -28.4961230571), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 543',
    'Hidrante 543 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8024533121, -28.4954601275), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 544',
    'Hidrante 544 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8025137409, -28.4948934851), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 545',
    'Hidrante 545 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8039442563, -28.4955970750), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 546',
    'Hidrante 546 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8046820098, -28.4962441127), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 547',
    'Hidrante 547 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8029965979, -28.4948819910), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 548',
    'Hidrante 548 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8051900776, -28.4950841536), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 549',
    'Hidrante 549 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8027389381, -28.4966742511), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 550',
    'Hidrante 550 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8037085704, -28.4943683826), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 551',
    'Hidrante 551 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8055282372, -28.4945034666), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 552',
    'Hidrante 552 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8053093038, -28.4939208534), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 553',
    'Hidrante 553 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7847987924, -28.4922614795), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 554',
    'Hidrante 554 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7862276863, -28.4893396596), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 555',
    'Hidrante 555 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7876269675, -28.4887853248), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 556',
    'Hidrante 556 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7886632736, -28.4888745641), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 557',
    'Hidrante 557 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7894411230, -28.4889113674), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 558',
    'Hidrante 558 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7860738233, -28.4861330638), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 559',
    'Hidrante 559 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7884329148, -28.4867964743), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 560',
    'Hidrante 560 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7869056938, -28.4860867124), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 561',
    'Hidrante 561 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7886832101, -28.4872705726), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 562',
    'Hidrante 562 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7894075321, -28.4872038130), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 563',
    'Hidrante 563 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7961137559, -28.4833657957), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 564',
    'Hidrante 564 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7936078654, -28.4805812305), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 565',
    'Hidrante 565 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7944474679, -28.4797675016), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 566',
    'Hidrante 566 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7937495750, -28.4787507519), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 567',
    'Hidrante 567 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7947504422, -28.4779397640), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 568',
    'Hidrante 568 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7969427508, -28.4788376256), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 569',
    'Hidrante 569 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7928281539, -28.4777001989), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 570',
    'Hidrante 570 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7938493276, -28.4772019705), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 571',
    'Hidrante 571 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7917847322, -28.4804352032), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 572',
    'Hidrante 572 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7917195404, -28.4817082792), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 573',
    'Hidrante 573 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7898104763, -28.4840396198), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 574',
    'Hidrante 574 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7928648705, -28.4832541318), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 575',
    'Hidrante 575 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7929546081, -28.4826574954), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 576',
    'Hidrante 576 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7928474047, -28.4820161457), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 577',
    'Hidrante 577 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7911948773, -28.4831837827), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 578',
    'Hidrante 578 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7920370997, -28.4835271065), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 579',
    'Hidrante 579 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7914457807, -28.4835521140), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 580',
    'Hidrante 580 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7912380580, -28.4839282283), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 581',
    'Hidrante 581 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7898594196, -28.4831363518), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 582',
    'Hidrante 582 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7898652664, -28.4824836213), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 583',
    'Hidrante 583 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7905501458, -28.4820548975), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 584',
    'Hidrante 584 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7918764085, -28.4828417455), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 585',
    'Hidrante 585 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7914146669, -28.4824086311), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 586',
    'Hidrante 586 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7799649772, -28.4906142262), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 587',
    'Hidrante 587 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7830577010, -28.4898083606), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 588',
    'Hidrante 588 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7789819363, -28.4883554502), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 589',
    'Hidrante 589 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7808602885, -28.4891061710), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 590',
    'Hidrante 590 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7804181993, -28.4876187052), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 591',
    'Hidrante 591 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7809111070, -28.4873015214), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 592',
    'Hidrante 592 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7823567556, -28.4873357311), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 593',
    'Hidrante 593 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7807554300, -28.4853470672), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 594',
    'Hidrante 594 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7809441788, -28.4856042282), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 595',
    'Hidrante 595 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7787796248, -28.4873070146), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 596',
    'Hidrante 596 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7781882539, -28.4855577794), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 597',
    'Hidrante 597 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7778252408, -28.4848606340), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 598',
    'Hidrante 598 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7879079184, -28.4820710649), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 599',
    'Hidrante 599 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7864206417, -28.4821804743), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 600',
    'Hidrante 600 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7919695055, -28.4778366156), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 601',
    'Hidrante 601 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7879362303, -28.4788111806), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 602',
    'Hidrante 602 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7869467776, -28.4788188721), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 603',
    'Hidrante 603 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7708930073, -28.4824764749), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 604',
    'Hidrante 604 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7721356863, -28.4831921843), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 605',
    'Hidrante 605 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7737359723, -28.4827639270), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 606',
    'Hidrante 606 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7709208812, -28.4817760687), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 607',
    'Hidrante 607 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7715265044, -28.4803122940), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 608',
    'Hidrante 608 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7708261970, -28.4783818845), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 609',
    'Hidrante 609 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7740700438, -28.4783964131), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 610',
    'Hidrante 610 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7765545802, -28.4783287556), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 611',
    'Hidrante 611 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7721799154, -28.4768697999), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 612',
    'Hidrante 612 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7763531843, -28.4771826879), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 613',
    'Hidrante 613 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7779185049, -28.4763197187), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 614',
    'Hidrante 614 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7814480101, -28.4821010717), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 615',
    'Hidrante 615 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7814304381, -28.4816204927), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 616',
    'Hidrante 616 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7798763696, -28.4825650491), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 617',
    'Hidrante 617 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7795187013, -28.4809930638), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 618',
    'Hidrante 618 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7814231814, -28.4808001105), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 619',
    'Hidrante 619 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7843515108, -28.4807288996), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 620',
    'Hidrante 620 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7854178552, -28.4821986759), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 621',
    'Hidrante 621 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7826588143, -28.4790430702), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 622',
    'Hidrante 622 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7808172981, -28.4790555657), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 623',
    'Hidrante 623 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7856821923, -28.4777151126), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 624',
    'Hidrante 624 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7795554627, -28.4762991937), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 625',
    'Hidrante 625 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7949920004, -28.4767569261), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 626',
    'Hidrante 626 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7897140080, -28.4763020560), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 627',
    'Hidrante 627 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7876321696, -28.4763699011), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 628',
    'Hidrante 628 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7991975895, -28.4748310206), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 629',
    'Hidrante 629 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8113005382, -28.4775697721), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 630',
    'Hidrante 630 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7998672779, -28.4768292831), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 631',
    'Hidrante 631 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7892327961, -28.5041483649), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 632',
    'Hidrante 632 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7942549785, -28.5065799212), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 633',
    'Hidrante 633 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7970708248, -28.5065856561), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 634',
    'Hidrante 634 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7958869780, -28.5052669172), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 635',
    'Hidrante 635 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7970772695, -28.5056087602), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 636',
    'Hidrante 636 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7486694635, -28.4545644849), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 637',
    'Hidrante 637 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7919036938, -28.4541410879), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 638',
    'Hidrante 638 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7878087625, -28.4318888867), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 639',
    'Hidrante 639 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7877929852, -28.4318599724), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 640',
    'Hidrante 640 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7710625954, -28.4581314802), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 641',
    'Hidrante 641 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7901927562, -28.4367399840), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 642',
    'Hidrante 642 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7886121904, -28.4357820841), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 643',
    'Hidrante 643 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7884676663, -28.4342127805), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 644',
    'Hidrante 644 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7884164050, -28.4328998750), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 645',
    'Hidrante 645 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7842661494, -28.4914236908), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 646',
    'Hidrante 646 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7870170557, -28.4951486494), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 647',
    'Hidrante 647 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7863421086, -28.4964622104), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 648',
    'Hidrante 648 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7882045046, -28.4970663986), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 649',
    'Hidrante 649 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7900546597, -28.4964894307), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 650',
    'Hidrante 650 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7889374608, -28.4981881290), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 651',
    'Hidrante 651 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7904127106, -28.4994408436), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 652',
    'Hidrante 652 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7893083607, -28.4999442099), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 653',
    'Hidrante 653 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7882983055, -28.5009635068), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 654',
    'Hidrante 654 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7902083594, -28.5035215153), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 655',
    'Hidrante 655 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7912333299, -28.5014959367), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 656',
    'Hidrante 656 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7922788851, -28.5042698328), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 657',
    'Hidrante 657 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7934078003, -28.4939406844), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 658',
    'Hidrante 658 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7918422256, -28.4929213082), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 659',
    'Hidrante 659 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7952168275, -28.4932311039), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 660',
    'Hidrante 660 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7934700900, -28.4961645780), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 661',
    'Hidrante 661 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7899556020, -28.4956489097), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 662',
    'Hidrante 662 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7938982516, -28.4995472562), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 663',
    'Hidrante 663 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7925796192, -28.4988154917), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 664',
    'Hidrante 664 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7918827628, -28.5003969332), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 665',
    'Hidrante 665 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7910262272, -28.4981800819), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 666',
    'Hidrante 666 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7678366552, -28.4323276906), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 667',
    'Hidrante 667 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7687318005, -28.4369404743), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 668',
    'Hidrante 668 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8050704137, -28.4619851893), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 669',
    'Hidrante 669 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7952280566, -28.5003606575), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 670',
    'Hidrante 670 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7945389185, -28.5017509529), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 671',
    'Hidrante 671 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7930209482, -28.5020611021), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 672',
    'Hidrante 672 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7952428773, -28.4928804108), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 673',
    'Hidrante 673 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7930428669, -28.4927343750), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 674',
    'Hidrante 674 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7941757417, -28.4920190222), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 675',
    'Hidrante 675 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7938808076, -28.4904566161), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 676',
    'Hidrante 676 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7649589099, -28.4755976607), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 677',
    'Hidrante 677 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7680375450, -28.4332004682), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 678',
    'Hidrante 678 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7758011315, -28.4610499298), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 679',
    'Hidrante 679 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8035651993, -28.4668799673), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 680',
    'Hidrante 680 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8119933403, -28.4758324341), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 681',
    'Hidrante 681 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7665833829, -28.4758236784), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 682',
    'Hidrante 682 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7096826376, -28.4205473711), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 683',
    'Hidrante 683 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7119803013, -28.4225210494), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 684',
    'Hidrante 684 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7202482841, -28.4267342427), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 685',
    'Hidrante 685 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7188035320, -28.4289271028), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 686',
    'Hidrante 686 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7048874048, -28.4238945404), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 687',
    'Hidrante 687 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7043086111, -28.4267224126), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 688',
    'Hidrante 688 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7010648142, -28.4213540968), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 689',
    'Hidrante 689 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.6964168612, -28.4192240211), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 690',
    'Hidrante 690 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7164868387, -28.3699507510), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 691',
    'Hidrante 691 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7025282896, -28.3949283089), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 692',
    'Hidrante 692 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7004121941, -28.3868440010), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 693',
    'Hidrante 693 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7050000070, -28.3991610430), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 694',
    'Hidrante 694 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7028371515, -28.3856269746), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 695',
    'Hidrante 695 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7033291589, -28.3850656253), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 696',
    'Hidrante 696 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7017247819, -28.3860423935), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 697',
    'Hidrante 697 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7013754710, -28.3845508046), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 698',
    'Hidrante 698 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7015197382, -28.3793285878), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 699',
    'Hidrante 699 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7072218405, -28.3410706417), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 700',
    'Hidrante 700 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.6933983835, -28.4248158655), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 701',
    'Hidrante 701 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.6970358662, -28.3872514827), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 702',
    'Hidrante 702 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.6936643263, -28.3873186584), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 703',
    'Hidrante 703 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.6998184145, -28.3885086449), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 704',
    'Hidrante 704 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7036081009, -28.3886106231), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 705',
    'Hidrante 705 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7026439493, -28.3866338760), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 706',
    'Hidrante 706 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7012200525, -28.3792378199), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 707',
    'Hidrante 707 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7006975047, -28.3879738617), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 708',
    'Hidrante 708 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7021034815, -28.3817231251), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 709',
    'Hidrante 709 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.6973924654, -28.4249561597), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 710',
    'Hidrante 710 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7214249660, -28.4366164659), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 711',
    'Hidrante 711 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7206984530, -28.4367467977), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 712',
    'Hidrante 712 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7184479078, -28.4470388185), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 713',
    'Hidrante 713 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7233169229, -28.4483089292), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 714',
    'Hidrante 714 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7221284107, -28.4549114482), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 715',
    'Hidrante 715 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7210383907, -28.4557478008), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 716',
    'Hidrante 716 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7231303352, -28.4567879448), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 717',
    'Hidrante 717 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7093517520, -28.4581508812), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 718',
    'Hidrante 718 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.6980426207, -28.4617100926), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 719',
    'Hidrante 719 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.6982040383, -28.4597637801), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 720',
    'Hidrante 720 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7244051410, -28.4740389785), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 721',
    'Hidrante 721 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7217991832, -28.4744865108), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 722',
    'Hidrante 722 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7203642837, -28.4274121504), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 723',
    'Hidrante 723 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7188241351, -28.4302944764), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 724',
    'Hidrante 724 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7187046806, -28.4297620803), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 727',
    'Hidrante 727 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7193042477, -28.4369420641), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 728',
    'Hidrante 728 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7691227473, -28.4324579265), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 729',
    'Hidrante 729 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7684465974, -28.4340404117), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 730',
    'Hidrante 730 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7701054605, -28.4344167800), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 731',
    'Hidrante 731 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7688124929, -28.4357566700), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 732',
    'Hidrante 732 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7699687416, -28.4368084425), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 733',
    'Hidrante 733 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7760846746, -28.4334747635), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 734',
    'Hidrante 734 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7741895448, -28.4344258291), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 735',
    'Hidrante 735 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7749998224, -28.4343071580), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 736',
    'Hidrante 736 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7742546195, -28.4358723359), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 737',
    'Hidrante 737 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7740094959, -28.4370551414), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 738',
    'Hidrante 738 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7766431357, -28.4371477187), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 739',
    'Hidrante 739 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7763913341, -28.4361567643), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 740',
    'Hidrante 740 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7750702659, -28.4365988341), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 742',
    'Hidrante 742 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7729525086, -28.4359987356), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 743',
    'Hidrante 743 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7805058208, -28.4449783475), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 744',
    'Hidrante 744 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7797544902, -28.4455845971), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 745',
    'Hidrante 745 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7821252886, -28.4460204862), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 746',
    'Hidrante 746 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7836072234, -28.4449528856), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 747',
    'Hidrante 747 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7794574174, -28.4467523972), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 748',
    'Hidrante 748 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7845512974, -28.4463602882), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 749',
    'Hidrante 749 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7880175743, -28.4957151179), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 750',
    'Hidrante 750 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8061950958, -28.4614018115), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 751',
    'Hidrante 751 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8125970792, -28.4668078543), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 752',
    'Hidrante 752 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8115428367, -28.4659654274), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 753',
    'Hidrante 753 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8100389525, -28.4654779479), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 754',
    'Hidrante 754 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8111194621, -28.4677851399), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 755',
    'Hidrante 755 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8024353432, -28.4577434470), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 756',
    'Hidrante 756 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7636490114, -28.4328046929), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 757',
    'Hidrante 757 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7662525514, -28.4314061663), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 758',
    'Hidrante 758 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8069077101, -28.4884524469), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 759',
    'Hidrante 759 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8073859503, -28.4895173106), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 760',
    'Hidrante 760 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8076649417, -28.4906269339), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 761',
    'Hidrante 761 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7980361327, -28.4564123925), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 762',
    'Hidrante 762 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7953646555, -28.4561929043), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 763',
    'Hidrante 763 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7999947658, -28.4577762343), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 764',
    'Hidrante 764 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7981262275, -28.4576754682), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 765',
    'Hidrante 765 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7964351899, -28.4586590800), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 766',
    'Hidrante 766 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8137315183, -28.4658681271), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 767',
    'Hidrante 767 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8123083413, -28.4652738489), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 768',
    'Hidrante 768 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7842103256, -28.4277136222), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 769',
    'Hidrante 769 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7857293736, -28.4275129104), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 770',
    'Hidrante 770 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7847190985, -28.4253042148), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 771',
    'Hidrante 771 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7835253465, -28.4259677637), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 772',
    'Hidrante 772 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7849739601, -28.4940705753), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 773',
    'Hidrante 773 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7387706680, -28.4738316316), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 774',
    'Hidrante 774 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7376943699, -28.4746644881), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 776',
    'Hidrante 776 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7391294817, -28.4751211903), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 777',
    'Hidrante 777 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7056370386, -28.3709985192), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 778',
    'Hidrante 778 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7366517606, -28.4753704019), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 779',
    'Hidrante 779 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7354133055, -28.4767675776), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 780',
    'Hidrante 780 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7374129949, -28.4771199892), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 781',
    'Hidrante 781 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8054303599, -28.4735588831), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 782',
    'Hidrante 782 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7879740079, -28.4516768405), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 783',
    'Hidrante 783 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7889075494, -28.4509732738), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 784',
    'Hidrante 784 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7905228896, -28.4514706941), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 785',
    'Hidrante 785 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7898687737, -28.4522759647), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 786',
    'Hidrante 786 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7770766308, -28.4544035360), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 787',
    'Hidrante 787 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7778913173, -28.4552674459), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 788',
    'Hidrante 788 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7771445317, -28.4560206657), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 789',
    'Hidrante 789 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7758129266, -28.4558130019), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 790',
    'Hidrante 790 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7008472091, -28.4464394510), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 791',
    'Hidrante 791 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7004123034, -28.4453383574), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 792',
    'Hidrante 792 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.6989253277, -28.4464090908), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 795',
    'Hidrante 795 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7081615966, -28.4165649588), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 796',
    'Hidrante 796 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7077083974, -28.4148081377), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 798',
    'Hidrante 798 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7351321264, -28.4747318754), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 799',
    'Hidrante 799 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7369277923, -28.4737401655), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 800',
    'Hidrante 800 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7800530012, -28.4265828512), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 801',
    'Hidrante 801 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7818798428, -28.4263491850), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 802',
    'Hidrante 802 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7796579721, -28.4244293833), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 803',
    'Hidrante 803 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7803185977, -28.4253666848), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 804',
    'Hidrante 804 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7823968827, -28.4250933405), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 805',
    'Hidrante 805 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.6993926624, -28.4530994530), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 806',
    'Hidrante 806 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.6984135042, -28.4531955844), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 807',
    'Hidrante 807 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.6981319427, -28.4523644905), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 808',
    'Hidrante 808 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.6965311000, -28.4530716766), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 809',
    'Hidrante 809 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.6969333817, -28.4186844300), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 810',
    'Hidrante 810 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.6958189987, -28.4184487127), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 811',
    'Hidrante 811 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7783516597, -28.4399286076), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 812',
    'Hidrante 812 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7769888382, -28.4405058188), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 813',
    'Hidrante 813 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7768991271, -28.4396829008), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 814',
    'Hidrante 814 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7770652674, -28.4374388794), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 815',
    'Hidrante 815 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7339952394, -28.4692705726), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 816',
    'Hidrante 816 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7342244542, -28.4712312991), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 817',
    'Hidrante 817 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7347270469, -28.4731270385), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 818',
    'Hidrante 818 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7331588712, -28.4726626120), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 819',
    'Hidrante 819 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7344438931, -28.4746736138), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 820',
    'Hidrante 820 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7065549587, -28.4404646911), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 821',
    'Hidrante 821 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7088810472, -28.4400019275), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 822',
    'Hidrante 822 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7074722797, -28.4426943458), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 823',
    'Hidrante 823 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7113878327, -28.4566384022), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 824',
    'Hidrante 824 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7567725056, -28.4515050228), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 825',
    'Hidrante 825 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7558095211, -28.4528282863), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 826',
    'Hidrante 826 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7575148350, -28.4527848920), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 827',
    'Hidrante 827 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7537584543, -28.4529204506), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 828',
    'Hidrante 828 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7706159370, -28.4380053251), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 829',
    'Hidrante 829 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7720443231, -28.4377576296), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 830',
    'Hidrante 830 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7746205789, -28.4238023871), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 831',
    'Hidrante 831 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7736514822, -28.4229041748), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 832',
    'Hidrante 832 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7749243426, -28.4226715997), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 833',
    'Hidrante 833 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7739699183, -28.4248108267), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 834',
    'Hidrante 834 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7301727164, -28.4228789549), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 835',
    'Hidrante 835 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7353702649, -28.4551258043), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 836',
    'Hidrante 836 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7369280000, -28.4545244207), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 837',
    'Hidrante 837 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7375014320, -28.4558057555), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 838',
    'Hidrante 838 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.6913487676, -28.4495747368), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 839',
    'Hidrante 839 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.6896467110, -28.4493610560), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 840',
    'Hidrante 840 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7361180531, -28.4782860485), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 841',
    'Hidrante 841 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7383444932, -28.4760636153), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 844',
    'Hidrante 844 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7675856664, -28.4396892570), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 845',
    'Hidrante 845 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7667484054, -28.4398332219), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 846',
    'Hidrante 846 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7675612814, -28.4370073862), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 847',
    'Hidrante 847 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7384376770, -28.4781946623), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 848',
    'Hidrante 848 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7136155508, -28.4271835517), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 849',
    'Hidrante 849 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7072076923, -28.3477352896), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 850',
    'Hidrante 850 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7405570491, -28.4776300293), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 851',
    'Hidrante 851 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7423155070, -28.4756623200), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 852',
    'Hidrante 852 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7416202741, -28.4738545715), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 853',
    'Hidrante 853 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7402360965, -28.4755485376), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 854',
    'Hidrante 854 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.6966859598, -28.4466890241), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 855',
    'Hidrante 855 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.6990084195, -28.4436945196), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 856',
    'Hidrante 856 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.6999706473, -28.4442057271), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 857',
    'Hidrante 857 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.6983123466, -28.4446987824), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 858',
    'Hidrante 858 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7011179550, -28.3773737788), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 859',
    'Hidrante 859 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.7019959126, -28.3792056431), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  ),
  (
    'hidrante'::public.resource_type,
    'Hidrante 860',
    'Hidrante 860 - Catamarca',
    ST_SetSRID(ST_MakePoint(-65.8100617173, -28.4645031686), 4326)::geography,
    null,
    null,
    'operativo'::public.resource_status,
    null
  );

select count(*) as total_hidrantes from public.resources where type = 'hidrante';
