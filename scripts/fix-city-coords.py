#!/usr/bin/env python3
"""
Populate latitude/longitude for all cities in the database.
Uses OpenStreetMap Nominatim geocoding API (free, no key needed).
Rate limited to 1 request per second per Nominatim policy.
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

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

HEADERS = {
    "User-Agent": "DesiRig/1.0 (desirig.com; directory geocoding)",
    "Accept-Language": "en",
}

# Known coordinates for major cities (skip API call)
KNOWN = {
    "brampton-on": (43.7315, -79.7624),
    "mississauga-on": (43.589, -79.6441),
    "toronto-on": (43.6532, -79.3832),
    "surrey-bc": (49.1913, -122.849),
    "vancouver-bc": (49.2827, -123.1207),
    "edmonton-ab": (53.5461, -113.4938),
    "calgary-ab": (51.0447, -114.0719),
    "winnipeg-mb": (49.8951, -97.1384),
    "ottawa-on": (45.4215, -75.6972),
    "montreal-qc": (45.5017, -73.5673),
    "hamilton-on": (43.2557, -79.8711),
    "london-on": (42.9849, -81.2453),
    "kitchener-on": (43.4516, -80.4925),
    "windsor-on": (42.3149, -83.0364),
    "regina-sk": (50.4452, -104.6189),
    "saskatoon-sk": (52.1332, -106.67),
    "halifax-ns": (44.6488, -63.5752),
    "victoria-bc": (48.4284, -123.3656),
    "kelowna-bc": (49.888, -119.496),
    "abbotsford-bc": (49.0504, -122.3045),
    "guelph-on": (43.5448, -80.2482),
    "quebec-city-qc": (46.8139, -71.2080),
}

PROVINCE_TO_COUNTRY = {
    "ON": "Canada", "BC": "Canada", "AB": "Canada", "SK": "Canada",
    "MB": "Canada", "QC": "Canada", "NB": "Canada", "NS": "Canada",
    "PE": "Canada", "NL": "Canada", "NT": "Canada", "YT": "Canada", "NU": "Canada",
}


def geocode(city_name, province):
    """Geocode a city using Nominatim."""
    country = PROVINCE_TO_COUNTRY.get(province, "Canada")
    query = f"{city_name}, {province}, {country}"

    url = "https://nominatim.openstreetmap.org/search"
    params = {
        "q": query,
        "format": "json",
        "limit": 1,
        "addressdetails": 0,
    }

    try:
        resp = requests.get(url, params=params, headers=HEADERS, timeout=10)
        if resp.status_code == 200 and resp.json():
            result = resp.json()[0]
            return float(result["lat"]), float(result["lon"])
    except Exception as e:
        print(f"  Error geocoding {query}: {e}")

    return None, None


def main():
    # Fetch all cities missing coordinates
    result = supabase.table("cities").select("id, name, slug, province").is_("latitude", "null").execute()
    cities = result.data

    print(f"=== Fix City Coordinates ===")
    print(f"Cities missing lat/lng: {len(cities)}")

    updated = 0
    failed = []

    for i, city in enumerate(cities):
        slug = city["slug"]
        name = city["name"]
        province = city["province"]

        # Check known coordinates first
        if slug in KNOWN:
            lat, lng = KNOWN[slug]
            print(f"[{i+1}/{len(cities)}] {name}, {province} — known ({lat}, {lng})")
        else:
            # Geocode via Nominatim
            lat, lng = geocode(name, province)
            if lat is None:
                print(f"[{i+1}/{len(cities)}] {name}, {province} — FAILED")
                failed.append(f"{name}, {province}")
                continue
            print(f"[{i+1}/{len(cities)}] {name}, {province} — geocoded ({lat}, {lng})")
            time.sleep(1.1)  # Nominatim rate limit: 1 req/sec

        # Update database
        supabase.table("cities").update({
            "latitude": lat,
            "longitude": lng,
        }).eq("id", city["id"]).execute()
        updated += 1

    print(f"\n=== Done ===")
    print(f"Updated: {updated}")
    print(f"Failed: {len(failed)}")
    if failed:
        print(f"Failed cities: {', '.join(failed)}")


if __name__ == "__main__":
    main()
