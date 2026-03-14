#!/usr/bin/env python3
"""
Import desi restaurants across North America using focused metro area queries.
State-wide bounding boxes are too large for cuisine queries —
we target populated metro areas where Indian restaurants actually exist.
"""

import os
import sys
import json
import time
import requests
from pathlib import Path
from dotenv import load_dotenv
from supabase import create_client

env_path = Path(__file__).parent.parent / ".env.local"
load_dotenv(env_path)

SUPABASE_URL = os.environ["NEXT_PUBLIC_SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]

OVERPASS_URL = "https://overpass-api.de/api/interpreter"
CHECKPOINT_FILE = Path(__file__).parent / ".desi-restaurants-checkpoint.json"

DESI_NAME_PATTERN = "Indian|Punjabi|Desi|Dhaba|Tandoori|Biryani|Curry|Naan|Tikka|Masala|Halal|Pakistani|Bangladeshi|Himalayan|Maharaja|Mughal|Bombay|Mumbai|Delhi|Patiala|Amritsari|Lahori|Nawab|Karahi|Kebab|Roti|Chapati"

# Metro areas with significant desi populations (s,w,n,e bounding boxes)
# Focused on cities where truckers stop AND where desi restaurants exist
METROS = [
    # CANADA
    ("Vancouver Metro", "BC", "CA", 49.0, -123.3, 49.4, -122.5),
    ("Victoria", "BC", "CA", 48.3, -123.6, 48.6, -123.2),
    ("Kelowna-Kamloops", "BC", "CA", 49.8, -120.6, 51.0, -119.3),
    ("Abbotsford-Chilliwack", "BC", "CA", 49.0, -122.5, 49.3, -121.5),
    ("Calgary", "AB", "CA", 50.8, -114.3, 51.2, -113.8),
    ("Edmonton", "AB", "CA", 53.3, -113.7, 53.7, -113.2),
    ("Saskatoon-Regina", "SK", "CA", 50.3, -107.0, 52.3, -104.4),
    ("Winnipeg", "MB", "CA", 49.7, -97.4, 50.0, -96.9),
    ("GTA West (Brampton-Mississauga)", "ON", "CA", 43.5, -80.0, 43.9, -79.5),
    ("GTA East (Toronto-Scarborough)", "ON", "CA", 43.6, -79.5, 43.9, -79.1),
    ("GTA North (Markham-Vaughan)", "ON", "CA", 43.8, -79.6, 44.0, -79.2),
    ("Hamilton-Burlington", "ON", "CA", 43.2, -80.0, 43.4, -79.6),
    ("Kitchener-Waterloo-Cambridge", "ON", "CA", 43.3, -80.7, 43.6, -80.2),
    ("London ON", "ON", "CA", 42.8, -81.4, 43.1, -81.1),
    ("Ottawa-Gatineau", "ON", "CA", 45.2, -76.0, 45.6, -75.4),
    ("Windsor", "ON", "CA", 42.2, -83.2, 42.4, -82.9),
    ("Montreal", "QC", "CA", 45.3, -73.8, 45.7, -73.3),
    ("Quebec City", "QC", "CA", 46.7, -71.4, 46.9, -71.1),
    ("Halifax", "NS", "CA", 44.5, -63.7, 44.8, -63.4),

    # USA — Major trucking corridors + desi population centers
    # Northeast
    ("NYC Metro", "NY", "US", 40.5, -74.3, 41.0, -73.7),
    ("Long Island-CT", "NY", "US", 40.6, -73.7, 41.3, -72.5),
    ("Albany-Schenectady", "NY", "US", 42.5, -74.0, 42.8, -73.5),
    ("Buffalo-Rochester", "NY", "US", 42.8, -79.0, 43.3, -77.4),
    ("Syracuse-Utica", "NY", "US", 42.9, -76.3, 43.2, -75.0),
    ("NJ North (Edison-Jersey City)", "NJ", "US", 40.4, -74.5, 40.9, -74.0),
    ("NJ South (Cherry Hill-Trenton)", "NJ", "US", 39.8, -75.1, 40.3, -74.4),
    ("Philadelphia Metro", "PA", "US", 39.8, -75.4, 40.2, -74.9),
    ("Pittsburgh", "PA", "US", 40.3, -80.1, 40.6, -79.8),
    ("Boston Metro", "MA", "US", 42.2, -71.3, 42.5, -70.9),
    ("Hartford-New Haven", "CT", "US", 41.2, -73.0, 41.8, -72.5),
    ("Baltimore-DC", "MD", "US", 38.7, -77.3, 39.4, -76.4),

    # Southeast
    ("Atlanta Metro", "GA", "US", 33.5, -84.6, 34.0, -84.0),
    ("Charlotte", "NC", "US", 35.0, -81.0, 35.4, -80.6),
    ("Raleigh-Durham", "NC", "US", 35.7, -79.1, 36.1, -78.5),
    ("Tampa-Orlando", "FL", "US", 27.8, -82.6, 28.7, -81.0),
    ("Miami-Fort Lauderdale", "FL", "US", 25.7, -80.5, 26.3, -80.0),
    ("Nashville", "TN", "US", 36.0, -87.0, 36.3, -86.5),

    # Midwest
    ("Chicago Metro", "IL", "US", 41.6, -88.0, 42.1, -87.5),
    ("Chicago Suburbs (Naperville-Schaumburg)", "IL", "US", 41.7, -88.4, 42.1, -88.0),
    ("Detroit Metro", "MI", "US", 42.2, -83.5, 42.6, -82.9),
    ("Grand Rapids", "MI", "US", 42.8, -85.8, 43.1, -85.5),
    ("Indianapolis", "IN", "US", 39.6, -86.3, 39.9, -85.9),
    ("Columbus OH", "OH", "US", 39.8, -83.2, 40.1, -82.8),
    ("Cleveland", "OH", "US", 41.3, -82.0, 41.6, -81.5),
    ("Cincinnati", "OH", "US", 39.0, -84.7, 39.3, -84.3),
    ("Minneapolis-St Paul", "MN", "US", 44.8, -93.5, 45.1, -93.0),
    ("Milwaukee", "WI", "US", 42.8, -88.1, 43.2, -87.8),
    ("St Louis", "MO", "US", 38.4, -90.5, 38.8, -90.1),
    ("Kansas City", "MO", "US", 38.9, -94.8, 39.2, -94.4),

    # South Central
    ("Dallas-Fort Worth", "TX", "US", 32.6, -97.1, 33.1, -96.5),
    ("Houston", "TX", "US", 29.5, -95.7, 30.0, -95.1),
    ("Austin-San Antonio", "TX", "US", 29.3, -98.6, 30.5, -97.5),
    ("New Orleans", "LA", "US", 29.8, -90.3, 30.1, -89.9),
    ("Oklahoma City-Tulsa", "OK", "US", 35.3, -97.7, 36.3, -95.8),

    # Mountain/West
    ("Denver Metro", "CO", "US", 39.5, -105.2, 39.9, -104.7),
    ("Phoenix Metro", "AZ", "US", 33.2, -112.3, 33.7, -111.7),
    ("Salt Lake City", "UT", "US", 40.5, -112.1, 40.9, -111.7),
    ("Las Vegas", "NV", "US", 35.9, -115.4, 36.3, -115.0),
    ("Albuquerque", "NM", "US", 35.0, -106.8, 35.2, -106.4),

    # West Coast
    ("LA Metro", "CA", "US", 33.7, -118.5, 34.2, -117.8),
    ("LA East (Riverside-San Bernardino)", "CA", "US", 33.8, -117.8, 34.2, -117.0),
    ("San Diego", "CA", "US", 32.6, -117.3, 33.0, -116.9),
    ("Bay Area (SF-Oakland-SJ)", "CA", "US", 37.2, -122.5, 37.8, -121.7),
    ("Sacramento-Stockton", "CA", "US", 37.8, -121.7, 38.7, -121.0),
    ("Fresno-Bakersfield", "CA", "US", 35.2, -119.3, 37.0, -118.9),
    ("Seattle-Tacoma", "WA", "US", 47.1, -122.5, 47.8, -122.1),
    ("Portland OR", "OR", "US", 45.3, -122.9, 45.7, -122.4),

    # I-90/I-80 corridor stops (trucker route — Toronto to California)
    ("Erie PA", "PA", "US", 42.0, -80.2, 42.2, -79.8),
    ("South Bend-Fort Wayne", "IN", "US", 40.9, -86.4, 41.7, -85.0),
    ("Des Moines", "IA", "US", 41.5, -93.8, 41.7, -93.4),
    ("Omaha-Lincoln", "NE", "US", 40.7, -96.2, 41.4, -95.8),
    ("Reno", "NV", "US", 39.4, -120.0, 39.7, -119.6),
]


def fetch_overpass(query):
    for attempt in range(3):
        try:
            r = requests.post(OVERPASS_URL, data={"data": query}, timeout=90)
            if r.status_code == 429:
                print(f"    Rate limited, waiting 60s...")
                time.sleep(60)
                continue
            if r.status_code == 504:
                print(f"    Timeout, retrying...")
                time.sleep(10)
                continue
            r.raise_for_status()
            return r.json().get("elements", [])
        except requests.exceptions.Timeout:
            print(f"    Timeout, retrying...")
            time.sleep(10)
        except Exception as e:
            print(f"    Attempt {attempt+1} failed: {e}")
            time.sleep(10)
    return []


def load_checkpoint():
    if CHECKPOINT_FILE.exists():
        return json.loads(CHECKPOINT_FILE.read_text())
    return {"completed": [], "total": 0}


def save_checkpoint(data):
    CHECKPOINT_FILE.write_text(json.dumps(data, indent=2))


def main():
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    checkpoint = load_checkpoint()
    completed = set(checkpoint.get("completed", []))
    total = checkpoint.get("total", 0)

    print(f"=== Desi Restaurant Import — Metro Area Queries ===")
    print(f"Targeting {len(METROS)} metro areas across North America")
    print(f"Already completed: {len(completed)} areas, {total} restaurants\n")

    for i, (name, state, country, s, w, n, e) in enumerate(METROS):
        if name in completed:
            continue

        bbox = f"{s},{w},{n},{e}"
        print(f"[{i+1}/{len(METROS)}] {name} ({state}, {country})...")

        # Combined query: cuisine tag + name patterns
        query = f"""
        [out:json][timeout:60];
        (
          node["amenity"="restaurant"]["cuisine"~"indian|punjabi|pakistani|bangladeshi|south_asian|curry",i]({bbox});
          way["amenity"="restaurant"]["cuisine"~"indian|punjabi|pakistani|bangladeshi|south_asian|curry",i]({bbox});
          node["amenity"="fast_food"]["cuisine"~"indian|punjabi|pakistani|bangladeshi|south_asian|curry",i]({bbox});
          node["amenity"~"restaurant|fast_food|cafe"]["name"~"{DESI_NAME_PATTERN}",i]({bbox});
          way["amenity"~"restaurant|fast_food|cafe"]["name"~"{DESI_NAME_PATTERN}",i]({bbox});
        );
        out center tags;
        """

        elements = fetch_overpass(query)

        # Deduplicate and build records
        seen_ids = set()
        places = []
        for el in elements:
            osm_id = el.get("id")
            if osm_id in seen_ids:
                continue
            seen_ids.add(osm_id)

            tags = el.get("tags", {})
            lat = el.get("lat") or el.get("center", {}).get("lat")
            lng = el.get("lon") or el.get("center", {}).get("lon")
            if not lat or not lng:
                continue

            el_name = tags.get("name", "").strip()
            if not el_name:
                continue

            name_lower = el_name.lower()
            stop_type = "restaurant"
            if "dhaba" in name_lower or "truck" in name_lower:
                stop_type = "truck_stop"

            places.append({
                "osm_id": osm_id,
                "name": el_name[:200],
                "type": stop_type,
                "chain": None,
                "address": tags.get("addr:street", ""),
                "city": tags.get("addr:city", "") or name.split("(")[0].strip().split("-")[0].strip(),
                "state_province": state,
                "country": country,
                "highway": "",
                "lat": round(lat, 6),
                "lng": round(lng, 6),
                "phone": (tags.get("phone") or tags.get("contact:phone", ""))[:30] or None,
                "has_diesel": False,
                "has_showers": False,
                "has_wifi": tags.get("internet_access") in ("yes", "wlan"),
                "has_food": True,
                "has_parking": False,
                "has_scales": False,
                "has_desi_food": True,
                "is_desi_owned": True,
                "notes": f"Cuisine: {tags.get('cuisine', 'Indian/South Asian')}",
                "source": "osm",
            })

        print(f"  Found {len(places)} desi restaurants")

        if places:
            try:
                supabase.table("truck_stops").upsert(
                    places, on_conflict="osm_id"
                ).execute()
            except Exception as e:
                print(f"  Upsert error: {e}")
                for p in places:
                    try:
                        supabase.table("truck_stops").upsert(
                            p, on_conflict="osm_id"
                        ).execute()
                    except:
                        pass

        total += len(places)
        completed.add(name)
        save_checkpoint({"completed": list(completed), "total": total})

        time.sleep(3)  # Respectful delay

    print(f"\n=== DONE ===")
    print(f"Total desi restaurants imported: {total}")


if __name__ == "__main__":
    main()
