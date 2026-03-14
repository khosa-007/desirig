#!/usr/bin/env python3
"""
Find and import every Desi truck stop, dhaba, and Indian restaurant
along major trucking corridors across North America.

Uses OpenStreetMap Overpass API to find:
- Indian/Punjabi restaurants
- Desi truck stops
- South Asian grocery stores near truck routes

Corridors covered (Toronto to California + all major routes):
- I-90 (Toronto → Buffalo → Cleveland → Chicago)
- I-80 (Chicago → Omaha → Salt Lake → Reno → Sacramento)
- I-5 (Sacramento → LA → San Diego)
- I-94 (Toronto → Detroit → Chicago)
- I-81 (Syracuse → Harrisburg → Knoxville)
- I-40 (Knoxville → Nashville → Memphis → Oklahoma City → Albuquerque → LA)
- I-10 (LA → Phoenix → El Paso → Houston)
- I-95 (NJ → DC → Raleigh → Jacksonville → Miami)
- I-65 (Chicago → Indianapolis → Nashville → Birmingham)
- I-75 (Detroit → Cincinnati → Atlanta → Tampa)
- All Canadian routes (Trans-Canada, 401, 400 series)
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

# Desi keyword patterns for name matching
DESI_KEYWORDS = [
    "indian", "punjabi", "desi", "dhaba", "tandoori", "biryani", "curry",
    "naan", "roti", "tikka", "masala", "samosa", "chaat", "pakora",
    "gurudwara", "gurdwara", "sikh", "temple", "mandir",
    "halal", "pakistani", "bangladeshi", "sri lankan",
    "patiala", "amritsari", "ludhiana", "lahori",
    "bollywood", "bombay", "mumbai", "delhi", "calcutta", "madras",
    "himalayan", "maharaja", "mughal", "nawab",
    "butter chicken", "dal", "paneer", "chai",
    "sweets", "mithai", "jalebi", "gulab",
    "truck stop", "trucker", "driver",
]

DESI_NAME_PATTERNS = "|".join([
    "Indian", "Punjabi", "Desi", "Dhaba", "Tandoori", "Biryani", "Curry",
    "Naan", "Tikka", "Masala", "Halal", "Pakistani", "Bangladeshi",
    "Himalayan", "Maharaja", "Mughal", "Bombay", "Mumbai", "Delhi",
    "Patiala", "Amritsari", "Lahori", "Nawab",
])

# State/province detection (same as import-truck-stops.py)
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
    ("NE", "US", 40.0, -104.1, 43.0, -95.3),
    ("WY", "US", 41.0, -111.1, 45.0, -104.1),
    ("UT", "US", 37.0, -114.1, 42.0, -109.0),
    ("NV", "US", 35.0, -120.0, 42.0, -114.0),
    ("CA", "US", 32.5, -124.4, 42.0, -114.1),
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
    ("MS", "US", 30.2, -91.7, 35.0, -88.1),
    ("LA", "US", 29.0, -94.0, 33.0, -89.0),
    ("AR", "US", 33.0, -94.6, 36.5, -89.6),
    ("OK", "US", 33.6, -103.0, 37.0, -94.4),
    ("KS", "US", 37.0, -102.1, 40.0, -94.6),
    ("MO", "US", 36.0, -95.8, 40.6, -89.1),
    ("CO", "US", 37.0, -109.1, 41.0, -102.0),
    ("NM", "US", 31.3, -109.1, 37.0, -103.0),
    ("AZ", "US", 31.3, -114.8, 37.0, -109.0),
    ("MD", "US", 37.9, -79.5, 39.7, -75.0),
    ("WA", "US", 45.5, -124.8, 49.0, -116.9),
    ("OR", "US", 42.0, -124.6, 46.3, -116.5),
    ("ID", "US", 42.0, -117.2, 49.0, -111.0),
    ("MT", "US", 44.4, -116.0, 49.0, -104.0),
    ("SD", "US", 42.5, -104.1, 46.0, -96.4),
    ("ND", "US", 45.9, -104.1, 49.0, -96.6),
]


def get_state_province(lat, lng):
    for code, country, min_lat, min_lng, max_lat, max_lng in REGIONS:
        if min_lat <= lat <= max_lat and min_lng <= lng <= max_lng:
            return code, country
    return "??", "US" if lat < 49 else "CA"


def fetch_overpass(query):
    for attempt in range(3):
        try:
            r = requests.post(OVERPASS_URL, data={"data": query}, timeout=180)
            if r.status_code == 429:
                print(f"  Rate limited, waiting 60s...")
                time.sleep(60)
                continue
            r.raise_for_status()
            return r.json().get("elements", [])
        except Exception as e:
            print(f"  Attempt {attempt+1} failed: {e}")
            time.sleep(30)
    return []


def is_desi(name, tags):
    """Check if a place is desi/Indian/Punjabi."""
    text = f"{name} {tags.get('cuisine', '')} {tags.get('description', '')}".lower()
    return any(kw in text for kw in DESI_KEYWORDS)


def fetch_desi_restaurants():
    """Fetch Indian/Punjabi restaurants across North America."""
    queries = [
        # By cuisine tag
        (
            "Desi restaurants (cuisine tag) - Canada",
            """
            [out:json][timeout:120];
            (
              node["amenity"="restaurant"]["cuisine"~"indian|punjabi|pakistani|bangladeshi|south_asian|curry",i](42,-141,70,-52);
              way["amenity"="restaurant"]["cuisine"~"indian|punjabi|pakistani|bangladeshi|south_asian|curry",i](42,-141,70,-52);
            );
            out center tags;
            """,
        ),
        (
            "Desi restaurants (cuisine tag) - US East",
            """
            [out:json][timeout:120];
            (
              node["amenity"="restaurant"]["cuisine"~"indian|punjabi|pakistani|bangladeshi|south_asian|curry",i](24,-100,49,-66);
              way["amenity"="restaurant"]["cuisine"~"indian|punjabi|pakistani|bangladeshi|south_asian|curry",i](24,-100,49,-66);
            );
            out center tags;
            """,
        ),
        (
            "Desi restaurants (cuisine tag) - US West",
            """
            [out:json][timeout:120];
            (
              node["amenity"="restaurant"]["cuisine"~"indian|punjabi|pakistani|bangladeshi|south_asian|curry",i](24,-130,49,-100);
              way["amenity"="restaurant"]["cuisine"~"indian|punjabi|pakistani|bangladeshi|south_asian|curry",i](24,-130,49,-100);
            );
            out center tags;
            """,
        ),
        # By name patterns
        (
            "Desi restaurants (name match) - All NA",
            f"""
            [out:json][timeout:120];
            (
              node["amenity"~"restaurant|fast_food|cafe"]["name"~"{DESI_NAME_PATTERNS}",i](24,-141,70,-52);
              way["amenity"~"restaurant|fast_food|cafe"]["name"~"{DESI_NAME_PATTERNS}",i](24,-141,70,-52);
            );
            out center tags;
            """,
        ),
        # Indian grocery stores
        (
            "Indian grocery stores",
            """
            [out:json][timeout:120];
            (
              node["shop"~"supermarket|convenience|grocery"]["name"~"Indian|Punjabi|Desi|Halal|Patel|Singh|Spice",i](24,-141,70,-52);
              way["shop"~"supermarket|convenience|grocery"]["name"~"Indian|Punjabi|Desi|Halal|Patel|Singh|Spice",i](24,-141,70,-52);
            );
            out center tags;
            """,
        ),
        # Gurdwaras (free langar for truckers!)
        (
            "Gurdwaras",
            """
            [out:json][timeout:120];
            (
              node["amenity"="place_of_worship"]["religion"="sikh"](24,-141,70,-52);
              way["amenity"="place_of_worship"]["religion"="sikh"](24,-141,70,-52);
              node["amenity"="place_of_worship"]["name"~"Gurudwara|Gurdwara|Sikh",i](24,-141,70,-52);
              way["amenity"="place_of_worship"]["name"~"Gurudwara|Gurdwara|Sikh",i](24,-141,70,-52);
            );
            out center tags;
            """,
        ),
    ]

    all_places = []
    for label, query in queries:
        print(f"\nFetching {label}...")
        elements = fetch_overpass(query)
        print(f"  Got {len(elements)} elements")

        for el in elements:
            tags = el.get("tags", {})
            lat = el.get("lat") or el.get("center", {}).get("lat")
            lng = el.get("lon") or el.get("center", {}).get("lon")
            if not lat or not lng:
                continue

            name = tags.get("name", "").strip()
            if not name:
                continue

            state, country = get_state_province(lat, lng)

            # Determine type
            amenity = tags.get("amenity", "")
            shop = tags.get("shop", "")
            religion = tags.get("religion", "")

            if religion == "sikh" or "gurdwara" in name.lower() or "gurudwara" in name.lower():
                stop_type = "gurdwara"
            elif shop:
                stop_type = "grocery"
            elif "dhaba" in name.lower() or "truck" in name.lower():
                stop_type = "truck_stop"
            else:
                stop_type = "restaurant"

            place = {
                "osm_id": el.get("id"),
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
                "has_parking": tags.get("parking") == "yes",
                "has_scales": False,
                "has_desi_food": True,
                "is_desi_owned": True,
                "notes": f"Cuisine: {tags.get('cuisine', 'Indian/South Asian')}",
                "source": "osm",
            }
            all_places.append(place)

        time.sleep(10)  # Be nice to Overpass

    return all_places


def main():
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

    # Check table exists
    try:
        supabase.table("truck_stops").select("id").limit(1).execute()
    except Exception:
        print("ERROR: truck_stops table doesn't exist!")
        sys.exit(1)

    print("=== Importing Desi Stops Across North America ===")
    print("This covers: Indian restaurants, Punjabi dhabas, grocery stores, gurdwaras")
    print("From Toronto to California and everywhere in between\n")

    places = fetch_desi_restaurants()

    # Deduplicate by osm_id
    seen = set()
    unique = []
    for p in places:
        if p["osm_id"] not in seen:
            seen.add(p["osm_id"])
            unique.append(p)

    print(f"\n=== RESULTS ===")
    print(f"Total unique desi places: {len(unique)}")

    # Breakdown by type
    types = {}
    for p in unique:
        types[p["type"]] = types.get(p["type"], 0) + 1
    for t, c in sorted(types.items(), key=lambda x: -x[1]):
        print(f"  {t}: {c}")

    # Breakdown by country
    ca = sum(1 for p in unique if p["country"] == "CA")
    us = sum(1 for p in unique if p["country"] == "US")
    print(f"\n  Canada: {ca}")
    print(f"  US: {us}")

    # Top states/provinces
    states = {}
    for p in unique:
        key = f"{p['state_province']} ({p['country']})"
        states[key] = states.get(key, 0) + 1
    print("\nTop 15 states/provinces:")
    for state, count in sorted(states.items(), key=lambda x: -x[1])[:15]:
        print(f"  {state}: {count}")

    # Upsert into Supabase
    print(f"\nUpserting {len(unique)} desi places...")
    batch_size = 500
    inserted = 0
    for i in range(0, len(unique), batch_size):
        batch = unique[i : i + batch_size]
        try:
            supabase.table("truck_stops").upsert(
                batch, on_conflict="osm_id"
            ).execute()
            inserted += len(batch)
            print(f"  {inserted}/{len(unique)} upserted")
        except Exception as e:
            print(f"  Error at batch {i}: {e}")
            for p in batch:
                try:
                    supabase.table("truck_stops").upsert(
                        p, on_conflict="osm_id"
                    ).execute()
                    inserted += 1
                except:
                    pass

    print(f"\nDone! {inserted} desi places imported into truck_stops table.")
    print("These will show with 'Desi' badge on the truck stops page.")


if __name__ == "__main__":
    main()
