-- Truck stops, rest areas, and weigh stations across North America
CREATE TABLE IF NOT EXISTS truck_stops (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  osm_id bigint UNIQUE,              -- OpenStreetMap node/way ID
  name text NOT NULL,
  type text NOT NULL DEFAULT 'truck_stop', -- truck_stop, rest_area, weigh_station, fuel
  chain text,                          -- Pilot, Flying J, Love's, TA, Petro, etc.
  address text,
  city text,
  state_province text,                 -- ON, NY, MI, etc.
  country text NOT NULL DEFAULT 'CA',  -- CA or US
  highway text,                        -- I-90, Hwy 401, etc.
  lat double precision NOT NULL,
  lng double precision NOT NULL,
  phone text,
  has_diesel boolean DEFAULT true,
  has_showers boolean DEFAULT false,
  has_wifi boolean DEFAULT false,
  has_scales boolean DEFAULT false,
  has_laundry boolean DEFAULT false,
  has_food boolean DEFAULT false,
  has_parking boolean DEFAULT true,
  parking_spaces int,                  -- estimated truck parking spaces
  has_desi_food boolean DEFAULT false,
  is_desi_owned boolean DEFAULT false,
  notes text,
  source text DEFAULT 'osm',          -- osm, manual, chain_api
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_truck_stops_country ON truck_stops (country);
CREATE INDEX IF NOT EXISTS idx_truck_stops_state ON truck_stops (state_province);
CREATE INDEX IF NOT EXISTS idx_truck_stops_type ON truck_stops (type);
CREATE INDEX IF NOT EXISTS idx_truck_stops_chain ON truck_stops (chain);
CREATE INDEX IF NOT EXISTS idx_truck_stops_location ON truck_stops (lat, lng);
CREATE INDEX IF NOT EXISTS idx_truck_stops_country_state ON truck_stops (country, state_province);

-- Enable RLS
ALTER TABLE truck_stops ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON truck_stops FOR SELECT USING (true);

-- Weigh stations table (separate — different data structure)
CREATE TABLE IF NOT EXISTS weigh_stations (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  osm_id bigint UNIQUE,
  name text NOT NULL,
  highway text,
  direction text,                      -- Northbound, Southbound, Both
  state_province text,
  country text NOT NULL DEFAULT 'US',
  lat double precision NOT NULL,
  lng double precision NOT NULL,
  phone text,
  has_prepass boolean DEFAULT false,
  has_drivewyze boolean DEFAULT false,
  enforcement_level text,              -- high, medium, low
  notes text,
  source text DEFAULT 'osm',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_weigh_stations_country ON weigh_stations (country);
CREATE INDEX IF NOT EXISTS idx_weigh_stations_state ON weigh_stations (state_province);
CREATE INDEX IF NOT EXISTS idx_weigh_stations_location ON weigh_stations (lat, lng);

ALTER TABLE weigh_stations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON weigh_stations FOR SELECT USING (true);
