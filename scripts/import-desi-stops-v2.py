#!/usr/bin/env python3
"""
Import desi restaurants, gurdwaras, and Indian groceries across North America.
Uses region-by-region Overpass queries to avoid timeouts.
Builds on the 707 grocery/gurdwara results from v1 — this adds the restaurants.
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
CHECKPOINT_FILE = Path(__file__).parent / ".desi-stops-checkpoint.json"

DESI_KEYWORDS = [
    "indian", "punjabi", "desi", "dhaba", "tandoori", "biryani", "curry",
    "naan", "roti", "tikka", "masala", "samosa", "chaat", "pakora",
    "gurudwara", "gurdwara", "sikh", "temple", "mandir",
    "halal", "pakistani", "bangladeshi", "sri lankan",
    "patiala", "amritsari", "ludhiana", "lahori",
    "bollywood", "bombay", "mumbai", "delhi", "calcutta", "madras",
    "himalayan", "maharaja", "mughal", "nawab",
    "butter chicken", "dal", "paneer", "chai",
]

DESI_NAME_PATTERNS = "Indian|Punjabi|Desi|Dhaba|Tandoori|Biryani|Curry|Naan|Tikka|Masala|Halal|Pakistani|Bangladeshi|Himalayan|Maharaja|Mughal|Bombay|Mumbai|Delhi|Patiala|Amritsari|Lahori|Nawab"

REGIONS = [
    ("BC", "CA", 48.0, -139.0, 60.0, -114.0),
    ("AB", "CA", 49.0, -120.0, 60.0, -110.0),
    ("SK", "CA", 49.0, -110.0, 60.0, -101.5),
    ("MB", "CA", 49.0, -101.5, 60.0, -88.0),
    ("ON", "CA", 42.0, -95.0, 56.0, -74.0),
    ("QC", "CA", 45.0, -80.0, 62.0, -57.0),
    ("NB", "CA", 44.5, -69.0, 48.1, -63.5),
    ("NS", "CA", 43.3, -66.5, 47.1, -59.5),
    ("PE", "CA", 45.9, -64.5, 47.1, -61.9),
    ("NL", "CA", 46.5, -59.5, 60.5, -52.5),
    ("NY", "US", 40.5, -79.8, 45.0, -71.8),
    ("PA", "US", 39.7, -80.6, 42.3, -74.7),
    ("OH", "US", 38.4, -84.8, 42.0, -80.5),
    ("MI", "US", 41.7, -90.4, 48.3, -82.1),
    ("IN", "US", 37.8, -88.1, 41.8, -84.8),
    ("IL", "US", 36.9, -91.5, 42.5, -87.0),
    ("WI", "US", 42.5, -92.9, 47.1, -86.2),
    ("MN", "US", 43.5, -97.2, 49.4, -89.5),
    ("IA", "US", 40.4, -96.6, 43.5, -90.1),
    ("MO", "US", 36.0, -95.8, 40.6, -89.1),
    ("NJ", "US", 38.9, -75.6, 41.4, -73.9),
    ("CT", "US", 41.0, -73.7, 42.1, -71.8),
    ("MA", "US", 41.2, -73.5, 42.9, -69.9),
    ("TX", "US", 25.8, -106.6, 36.5, -93.5),
    ("GA", "US", 30.4, -85.6, 35.0, -80.8),
    ("FL", "US", 24.4, -87.6, 31.0, -80.0),
    ("TN", "US", 35.0, -90.3, 36.7, -81.6),
    ("KY", "US", 36.5, -89.6, 39.1, -82.0),
    ("VA", "US", 36.5, -83.7, 39.5, -75.2),
    ("NC", "US", 33.8, -84.3, 36.6, -75.5),
    ("SC", "US", 32.0, -83.4, 35.2, -78.5),
    ("AL", "US", 30.2, -88.5, 35.0, -84.9),
    ("LA", "US", 29.0, -94.0, 33.0, -89.0),
    ("OK", "US", 33.6, -103.0, 37.0, -94.4),
    ("KS", "US", 37.0, -102.1, 40.0, -94.6),
    ("NE", "US", 40.0, -104.1, 43.0, -95.3),
    ("CO", "US", 37.0, -109.1, 41.0, -102.0),
    ("NM", "US", 31.3, -109.1, 37.0, -103.0),
    ("AZ", "US", 31.3, -114.8, 37.0, -109.0),
    ("UT", "US", 37.0, -114.1, 42.0, -109.0),
    ("NV", "US", 35.0, -120.0, 42.0, -114.0),
    ("CA", "US", 32.5, -124.4, 42.0, -114.1),
    ("WA", "US", 45.5, -124.8, 49.0, -116.9),
    ("OR", "US", 42.0, -124.6, 46.3, -116.5),
    ("ID", "US", 42.0, -117.2, 49.0, -111.0),
    ("MD", "US", 37.9, -79.5, 39.7, -75.0),
    ("WY", "US", 41.0, -111.1, 45.0, -104.1),
    ("MT", "US", 44.4, -116.0, 49.0, -104.0),
]


def fetch_overpass(query):
    for attempt in range(3):
        try:
            r = requests.post(OVERPASS_URL, data={"data": query}, timeout=120)
            if r.status_code == 429:
                print(f"    Rate limited, waiting 60s...")
                time.sleep(60)
                continue
            if r.status_code == 504:
                print(f"    Timeout, retrying...")
                time.sleep(15)
                continue
            r.raise_for_status()
            return r.json().get("elements", [])
        except requests.exceptions.Timeout:
            print(f"    Timeout, retrying...")
            time.sleep(15)
        except Exception as e:
            print(f"    Attempt {attempt+1} failed: {e}")
            time.sleep(15)
    return []


def load_checkpoint():
    if CHECKPOINT_FILE.exists():
        return json.loads(CHECKPOINT_FILE.read_text())
    return {"completed_regions": [], "total_restaurants": 0}


def save_checkpoint(data):
    CHECKPOINT_FILE.write_text(json.dumps(data, indent=2))


def main():
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    checkpoint = load_checkpoint()
    completed = set(checkpoint.get("completed_regions", []))

    print("=== Desi Restaurant Import — Region by Region ===")
    print(f"Already completed: {len(completed)} regions")

    total = checkpoint.get("total_restaurants", 0)

    for i, (state, country, s, w, n, e) in enumerate(REGIONS):
        region_key = f"{state}-{country}"
        if region_key in completed:
            continue

        bbox = f"{s},{w},{n},{e}"
        print(f"\n[{i+1}/{len(REGIONS)}] {state} ({country})...")

        # Query 1: By cuisine tag
        q1 = f"""
        [out:json][timeout:90];
        (
          node["amenity"="restaurant"]["cuisine"~"indian|punjabi|pakistani|bangladeshi|south_asian|curry",i]({bbox});
          way["amenity"="restaurant"]["cuisine"~"indian|punjabi|pakistani|bangladeshi|south_asian|curry",i]({bbox});
          node["amenity"="fast_food"]["cuisine"~"indian|punjabi|pakistani|bangladeshi|south_asian|curry",i]({bbox});
        );
        out center tags;
        """
        elements1 = fetch_overpass(q1)
        time.sleep(3)

        # Query 2: By name patterns (catches places without cuisine tag)
        q2 = f"""
        [out:json][timeout:90];
        (
          node["amenity"~"restaurant|fast_food|cafe"]["name"~"{DESI_NAME_PATTERNS}",i]({bbox});
          way["amenity"~"restaurant|fast_food|cafe"]["name"~"{DESI_NAME_PATTERNS}",i]({bbox});
        );
        out center tags;
        """
        elements2 = fetch_overpass(q2)

        # Deduplicate by OSM ID
        seen_ids = set()
        places = []
        for el in elements1 + elements2:
            osm_id = el.get("id")
            if osm_id in seen_ids:
                continue
            seen_ids.add(osm_id)

            tags = el.get("tags", {})
            lat = el.get("lat") or el.get("center", {}).get("lat")
            lng = el.get("lon") or el.get("center", {}).get("lon")
            if not lat or not lng:
                continue

            name = tags.get("name", "").strip()
            if not name:
                continue

            # Determine type
            stop_type = "restaurant"
            name_lower = name.lower()
            if "dhaba" in name_lower or "truck" in name_lower:
                stop_type = "truck_stop"

            places.append({
                "osm_id": osm_id,
                "name": name[:200],
                "type": stop_type,
                "chain": None,
                "address": tags.get("addr:street", ""),
                "city": tags.get("addr:city", ""),
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
        completed.add(region_key)
        save_checkpoint({
            "completed_regions": list(completed),
            "total_restaurants": total,
        })

        time.sleep(5)  # Be nice to Overpass

    print(f"\n=== DONE ===")
    print(f"Total desi restaurants imported: {total}")
    print(f"(Plus 515 grocery stores + 187 gurdwaras from v1)")


if __name__ == "__main__":
    main()
