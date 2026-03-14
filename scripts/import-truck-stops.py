#!/usr/bin/env python3
"""
Import truck stops, rest areas, and weigh stations from OpenStreetMap Overpass API
into Supabase. Queries region-by-region to avoid Overpass timeouts.
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

CHECKPOINT_FILE = Path(__file__).parent.parent / "data" / "review" / ".truck-stops-checkpoint.json"

# Each region is (label, state_code, country, south, west, north, east)
REGIONS = [
    # Canadian provinces
    ("British Columbia", "BC", "CA", 48.0, -139.0, 60.0, -114.0),
    ("Alberta", "AB", "CA", 49.0, -120.0, 60.0, -110.0),
    ("Saskatchewan", "SK", "CA", 49.0, -110.0, 60.0, -101.5),
    ("Manitoba", "MB", "CA", 49.0, -101.5, 60.0, -88.0),
    ("Ontario", "ON", "CA", 42.0, -95.0, 56.0, -74.0),
    ("Quebec", "QC", "CA", 45.0, -80.0, 62.0, -57.0),
    ("New Brunswick", "NB", "CA", 44.5, -69.0, 48.1, -63.5),
    ("Nova Scotia", "NS", "CA", 43.3, -66.5, 47.1, -59.5),
    ("PEI", "PE", "CA", 45.9, -64.5, 47.1, -61.9),
    ("Newfoundland", "NL", "CA", 46.5, -59.5, 60.5, -52.5),
    # US states — all 48 continental
    ("New York", "NY", "US", 40.5, -79.8, 45.0, -71.8),
    ("Pennsylvania", "PA", "US", 39.7, -80.6, 42.3, -74.7),
    ("Ohio", "OH", "US", 38.4, -84.8, 42.0, -80.5),
    ("Michigan", "MI", "US", 41.7, -90.4, 48.3, -82.1),
    ("Indiana", "IN", "US", 37.8, -88.1, 41.8, -84.8),
    ("Illinois", "IL", "US", 36.9, -91.5, 42.5, -87.0),
    ("Wisconsin", "WI", "US", 42.5, -92.9, 47.1, -86.2),
    ("Minnesota", "MN", "US", 43.5, -97.2, 49.4, -89.5),
    ("Iowa", "IA", "US", 40.4, -96.6, 43.5, -90.1),
    ("Missouri", "MO", "US", 36.0, -95.8, 40.6, -89.1),
    ("New Jersey", "NJ", "US", 38.9, -75.6, 41.4, -73.9),
    ("Connecticut", "CT", "US", 41.0, -73.7, 42.1, -71.8),
    ("Massachusetts", "MA", "US", 41.2, -73.5, 42.9, -69.9),
    ("Vermont", "VT", "US", 42.7, -73.4, 45.0, -71.5),
    ("New Hampshire", "NH", "US", 42.7, -72.6, 45.3, -71.0),
    ("Maine", "ME", "US", 43.0, -71.1, 47.5, -67.0),
    ("Texas", "TX", "US", 25.8, -106.6, 36.5, -93.5),
    ("Georgia", "GA", "US", 30.4, -85.6, 35.0, -80.8),
    ("Florida", "FL", "US", 24.4, -87.6, 31.0, -80.0),
    ("Tennessee", "TN", "US", 35.0, -90.3, 36.7, -81.6),
    ("Kentucky", "KY", "US", 36.5, -89.6, 39.1, -82.0),
    ("West Virginia", "WV", "US", 37.2, -82.6, 40.6, -77.7),
    ("Virginia", "VA", "US", 36.5, -83.7, 39.5, -75.2),
    ("North Carolina", "NC", "US", 33.8, -84.3, 36.6, -75.5),
    ("South Carolina", "SC", "US", 32.0, -83.4, 35.2, -78.5),
    ("Alabama", "AL", "US", 30.2, -88.5, 35.0, -84.9),
    ("Mississippi", "MS", "US", 30.2, -91.7, 35.0, -88.1),
    ("Louisiana", "LA", "US", 29.0, -94.0, 33.0, -89.0),
    ("Arkansas", "AR", "US", 33.0, -94.6, 36.5, -89.6),
    ("Oklahoma", "OK", "US", 33.6, -103.0, 37.0, -94.4),
    ("Kansas", "KS", "US", 37.0, -102.1, 40.0, -94.6),
    ("Nebraska", "NE", "US", 40.0, -104.1, 43.0, -95.3),
    ("South Dakota", "SD", "US", 42.5, -104.1, 46.0, -96.4),
    ("North Dakota", "ND", "US", 45.9, -104.1, 49.0, -96.6),
    ("Montana", "MT", "US", 44.4, -116.0, 49.0, -104.0),
    ("Wyoming", "WY", "US", 41.0, -111.1, 45.0, -104.1),
    ("Colorado", "CO", "US", 37.0, -109.1, 41.0, -102.0),
    ("New Mexico", "NM", "US", 31.3, -109.1, 37.0, -103.0),
    ("Arizona", "AZ", "US", 31.3, -114.8, 37.0, -109.0),
    ("Utah", "UT", "US", 37.0, -114.1, 42.0, -109.0),
    ("Nevada", "NV", "US", 35.0, -120.0, 42.0, -114.0),
    ("Idaho", "ID", "US", 42.0, -117.2, 49.0, -111.0),
    ("Washington", "WA", "US", 45.5, -124.8, 49.0, -116.9),
    ("Oregon", "OR", "US", 42.0, -124.6, 46.3, -116.5),
    ("California", "CA", "US", 32.5, -124.4, 42.0, -114.1),
    ("Maryland", "MD", "US", 37.9, -79.5, 39.7, -75.0),
    ("Delaware", "DE", "US", 38.5, -75.8, 39.8, -75.0),
    ("Rhode Island", "RI", "US", 41.1, -71.9, 42.0, -71.1),
]

CHAIN_PATTERNS = {
    "pilot": "Pilot", "flying j": "Flying J", "love's": "Love's", "loves": "Love's",
    "ta ": "TA", "ta travel": "TA", "travelcenters": "TA", "petro stopping": "Petro",
    "petro-canada": "Petro-Canada", "husky": "Husky", "shell": "Shell", "esso": "Esso",
    "circle k": "Circle K", "onroute": "ONroute", "irving": "Irving",
    "ultramar": "Ultramar", "kwik trip": "Kwik Trip", "buc-ee": "Buc-ee's",
    "sheetz": "Sheetz", "wawa": "Wawa", "speedway": "Speedway", "casey": "Casey's",
    "sapp bros": "Sapp Bros", "ambest": "Ambest",
}


def detect_chain(name):
    if not name:
        return None
    lower = name.lower()
    for pattern, chain in CHAIN_PATTERNS.items():
        if pattern in lower:
            return chain
    return None


def fetch_overpass(query):
    for attempt in range(3):
        try:
            r = requests.post(OVERPASS_URL, data={"data": query}, timeout=120)
            if r.status_code == 429:
                wait = 60 * (attempt + 1)
                print(f"    Rate limited, waiting {wait}s...")
                time.sleep(wait)
                continue
            if r.status_code == 504:
                print(f"    Timeout, retrying...")
                time.sleep(15)
                continue
            r.raise_for_status()
            return r.json().get("elements", [])
        except requests.exceptions.Timeout:
            print(f"    Request timeout, retrying...")
            time.sleep(15)
        except Exception as e:
            print(f"    Attempt {attempt+1} failed: {e}")
            time.sleep(15)
    return []


def fetch_region(label, state, country, s, w, n, e):
    """Fetch truck stops + rest areas for a single region."""
    bbox = f"{s},{w},{n},{e}"

    # Truck stops
    query = f"""
    [out:json][timeout:90];
    (
      node["amenity"="fuel"]["hgv"~"yes|designated"]({bbox});
      way["amenity"="fuel"]["hgv"~"yes|designated"]({bbox});
      node["amenity"="fuel"]["fuel:HGV_diesel"="yes"]({bbox});
      way["amenity"="fuel"]["fuel:HGV_diesel"="yes"]({bbox});
      node["amenity"="fuel"]["name"~"Pilot|Flying J|Love|TA Travel|Petro|Husky|Buc-ee|Sapp Bros|Ambest",i]({bbox});
      way["amenity"="fuel"]["name"~"Pilot|Flying J|Love|TA Travel|Petro|Husky|Buc-ee|Sapp Bros|Ambest",i]({bbox});
    );
    out center tags;
    """
    truck_elements = fetch_overpass(query)

    # Rest areas
    query2 = f"""
    [out:json][timeout:60];
    (
      node["highway"="rest_area"]({bbox});
      way["highway"="rest_area"]({bbox});
      node["highway"="services"]({bbox});
      way["highway"="services"]({bbox});
    );
    out center tags;
    """
    rest_elements = fetch_overpass(query2)

    stops = []
    for el in truck_elements:
        tags = el.get("tags", {})
        lat = el.get("lat") or el.get("center", {}).get("lat")
        lng = el.get("lon") or el.get("center", {}).get("lon")
        if not lat or not lng:
            continue
        name = tags.get("name", tags.get("brand", "Unnamed Fuel Stop")).strip()[:200]
        stops.append({
            "osm_id": el["id"],
            "name": name,
            "type": "truck_stop",
            "chain": detect_chain(name) or detect_chain(tags.get("brand", "")),
            "city": tags.get("addr:city", ""),
            "state_province": state,
            "country": country,
            "highway": tags.get("ref", ""),
            "lat": round(lat, 6),
            "lng": round(lng, 6),
            "phone": (tags.get("phone") or tags.get("contact:phone", ""))[:30] or None,
            "has_diesel": True,
            "has_showers": tags.get("shower") == "yes" or tags.get("showers") == "yes",
            "has_wifi": tags.get("internet_access") in ("yes", "wlan"),
            "has_food": tags.get("food") == "yes" or tags.get("restaurant") == "yes",
            "has_parking": True,
            "has_scales": tags.get("weighbridge") == "yes",
            "source": "osm",
        })

    for el in rest_elements:
        tags = el.get("tags", {})
        lat = el.get("lat") or el.get("center", {}).get("lat")
        lng = el.get("lon") or el.get("center", {}).get("lon")
        if not lat or not lng:
            continue
        name = tags.get("name", "Rest Area").strip()[:200]
        stops.append({
            "osm_id": el["id"],
            "name": name,
            "type": "rest_area",
            "chain": None,
            "city": tags.get("addr:city", ""),
            "state_province": state,
            "country": country,
            "highway": tags.get("ref", ""),
            "lat": round(lat, 6),
            "lng": round(lng, 6),
            "phone": None,
            "has_diesel": False,
            "has_showers": tags.get("shower") == "yes",
            "has_wifi": tags.get("internet_access") in ("yes", "wlan"),
            "has_food": tags.get("food") == "yes",
            "has_parking": True,
            "has_scales": False,
            "source": "osm",
        })

    return stops


def fetch_weigh_stations_region(state, country, s, w, n, e):
    bbox = f"{s},{w},{n},{e}"
    query = f"""
    [out:json][timeout:60];
    (
      node["amenity"="weighbridge"]({bbox});
      way["amenity"="weighbridge"]({bbox});
      node["man_made"="weighbridge"]({bbox});
      way["man_made"="weighbridge"]({bbox});
    );
    out center tags;
    """
    elements = fetch_overpass(query)
    stations = []
    for el in elements:
        tags = el.get("tags", {})
        lat = el.get("lat") or el.get("center", {}).get("lat")
        lng = el.get("lon") or el.get("center", {}).get("lon")
        if not lat or not lng:
            continue
        stations.append({
            "osm_id": el["id"],
            "name": tags.get("name", "Weigh Station").strip()[:200],
            "highway": tags.get("ref", ""),
            "direction": tags.get("direction", ""),
            "state_province": state,
            "country": country,
            "lat": round(lat, 6),
            "lng": round(lng, 6),
            "phone": (tags.get("phone", ""))[:30] or None,
            "source": "osm",
        })
    return stations


def upsert_batch(supabase, table, rows):
    """Upsert a batch into Supabase."""
    if not rows:
        return 0
    batch_size = 500
    total = 0
    for i in range(0, len(rows), batch_size):
        batch = rows[i:i + batch_size]
        try:
            supabase.table(table).upsert(batch, on_conflict="osm_id").execute()
            total += len(batch)
        except Exception as e:
            print(f"    Batch error: {e}")
            # Try one by one
            for row in batch:
                try:
                    supabase.table(table).upsert(row, on_conflict="osm_id").execute()
                    total += 1
                except:
                    pass
    return total


def main():
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

    # Load checkpoint
    checkpoint = {}
    if CHECKPOINT_FILE.exists():
        checkpoint = json.loads(CHECKPOINT_FILE.read_text())

    completed_regions = set(checkpoint.get("completed_regions", []))
    total_stops = checkpoint.get("total_stops", 0)
    total_weigh = checkpoint.get("total_weigh", 0)

    print(f"=== Truck Stop Import — Region by Region ===")
    print(f"Already completed: {len(completed_regions)} regions")
    print(f"Total so far: {total_stops} stops, {total_weigh} weigh stations\n")

    for label, state, country, s, w, n, e in REGIONS:
        region_key = f"{country}_{state}"
        if region_key in completed_regions:
            continue

        print(f"[{len(completed_regions)+1}/{len(REGIONS)}] {label} ({state}, {country})...")

        # Fetch truck stops + rest areas
        stops = fetch_region(label, state, country, s, w, n, e)
        print(f"  Truck stops/rest areas: {len(stops)}")

        # Fetch weigh stations
        weigh = fetch_weigh_stations_region(state, country, s, w, n, e)
        print(f"  Weigh stations: {len(weigh)}")

        # Upsert
        if stops:
            n_stops = upsert_batch(supabase, "truck_stops", stops)
            total_stops += n_stops
        if weigh:
            n_weigh = upsert_batch(supabase, "weigh_stations", weigh)
            total_weigh += n_weigh

        completed_regions.add(region_key)

        # Save checkpoint
        checkpoint["completed_regions"] = list(completed_regions)
        checkpoint["total_stops"] = total_stops
        checkpoint["total_weigh"] = total_weigh
        CHECKPOINT_FILE.parent.mkdir(parents=True, exist_ok=True)
        CHECKPOINT_FILE.write_text(json.dumps(checkpoint, indent=2))

        print(f"  Running total: {total_stops} stops, {total_weigh} weigh stations")

        # Be nice to Overpass — 5s between regions
        time.sleep(5)

    print(f"\n=== DONE ===")
    print(f"Total truck stops/rest areas: {total_stops}")
    print(f"Total weigh stations: {total_weigh}")
    print(f"Regions completed: {len(completed_regions)}")


if __name__ == "__main__":
    main()
