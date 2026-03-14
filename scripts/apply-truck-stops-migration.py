#!/usr/bin/env python3
"""Apply truck_stops and weigh_stations tables via Supabase REST API."""

import os
from pathlib import Path
from dotenv import load_dotenv
import requests

env_path = Path(__file__).parent.parent / ".env.local"
load_dotenv(env_path)

SUPABASE_URL = os.environ["NEXT_PUBLIC_SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]

SQL = """
-- Truck stops, rest areas across North America
CREATE TABLE IF NOT EXISTS truck_stops (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  osm_id bigint UNIQUE,
  name text NOT NULL,
  type text NOT NULL DEFAULT 'truck_stop',
  chain text,
  address text,
  city text,
  state_province text,
  country text NOT NULL DEFAULT 'CA',
  highway text,
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
  parking_spaces int,
  has_desi_food boolean DEFAULT false,
  is_desi_owned boolean DEFAULT false,
  notes text,
  source text DEFAULT 'osm',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_truck_stops_country ON truck_stops (country);
CREATE INDEX IF NOT EXISTS idx_truck_stops_state ON truck_stops (state_province);
CREATE INDEX IF NOT EXISTS idx_truck_stops_type ON truck_stops (type);
CREATE INDEX IF NOT EXISTS idx_truck_stops_chain ON truck_stops (chain);
CREATE INDEX IF NOT EXISTS idx_truck_stops_location ON truck_stops (lat, lng);
CREATE INDEX IF NOT EXISTS idx_truck_stops_country_state ON truck_stops (country, state_province);

ALTER TABLE truck_stops ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  CREATE POLICY "Public read access" ON truck_stops FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Weigh stations
CREATE TABLE IF NOT EXISTS weigh_stations (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  osm_id bigint UNIQUE,
  name text NOT NULL,
  highway text,
  direction text,
  state_province text,
  country text NOT NULL DEFAULT 'US',
  lat double precision NOT NULL,
  lng double precision NOT NULL,
  phone text,
  has_prepass boolean DEFAULT false,
  has_drivewyze boolean DEFAULT false,
  enforcement_level text,
  notes text,
  source text DEFAULT 'osm',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_weigh_stations_country ON weigh_stations (country);
CREATE INDEX IF NOT EXISTS idx_weigh_stations_state ON weigh_stations (state_province);
CREATE INDEX IF NOT EXISTS idx_weigh_stations_location ON weigh_stations (lat, lng);

ALTER TABLE weigh_stations ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  CREATE POLICY "Public read access" ON weigh_stations FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
"""

def main():
    # Use Supabase REST SQL endpoint
    url = f"{SUPABASE_URL}/rest/v1/rpc/exec_sql"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
    }

    # Try the SQL endpoint
    # Supabase doesn't have exec_sql by default, so let's use the management API
    # Actually, let's just check if the tables exist first
    from supabase import create_client
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

    # Check if truck_stops exists
    try:
        supabase.table("truck_stops").select("id").limit(1).execute()
        print("truck_stops table: already exists ✓")
    except Exception as e:
        print(f"truck_stops table: DOES NOT EXIST")
        print(f"  Error: {e}")
        print(f"\n  Please run this SQL in Supabase dashboard → SQL Editor:")
        print(f"  File: supabase/migrations/20260315000000_truck_stops.sql")
        print(f"\n  Or paste this SQL directly:")
        print(SQL)
        return

    # Check if weigh_stations exists
    try:
        supabase.table("weigh_stations").select("id").limit(1).execute()
        print("weigh_stations table: already exists ✓")
    except Exception as e:
        print(f"weigh_stations table: DOES NOT EXIST")
        print(f"  Same migration file creates both tables.")
        return

    print("\nBoth tables exist! Ready to import data.")
    print("Run: python3 scripts/import-truck-stops.py")


if __name__ == "__main__":
    main()
