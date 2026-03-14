#!/usr/bin/env python3
"""
One-time bulk IndexNow ping for all important DesiRig pages.
Submits homepage, city pages, category pages, and tools to Bing/Yandex.
"""

import json
import os
import sys
import urllib.request

INDEXNOW_KEY = "8cc07a61afb342728b86dcd8d2e27515"
SITE_URL = "https://desirig.com"

# Load Supabase credentials
sys.path.insert(0, os.path.dirname(__file__))
from dotenv import load_dotenv
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env.local'))

SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

def supabase_get(table, select="*", params=""):
    url = f"{SUPABASE_URL}/rest/v1/{table}?select={select}{params}"
    req = urllib.request.Request(url, headers={
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
    })
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read())

def main():
    urls = [SITE_URL]

    # Static pages
    static = [
        "/categories", "/tools", "/news", "/safety", "/submit", "/about",
        "/tools/weight-limits", "/tools/hos-calculator", "/tools/license-quiz",
        "/tools/trip-planner", "/tools/fuel-cost-calculator", "/tools/speed-fuel-savings",
        "/tools/fuel-prices", "/tools/border-times", "/tools/truck-parking",
        "/tools/weigh-scales",
    ]
    urls.extend([f"{SITE_URL}{p}" for p in static])

    # City pages
    cities = supabase_get("cities", "slug", "&listing_count=gt.0")
    for c in cities:
        urls.append(f"{SITE_URL}/{c['slug']}")
    print(f"Cities: {len(cities)}")

    # Category pages
    cats = supabase_get("categories", "slug")
    for c in cats:
        urls.append(f"{SITE_URL}/categories/{c['slug']}")
    print(f"Categories: {len(cats)}")

    print(f"Total URLs to submit: {len(urls)}")

    # IndexNow payload (max 10,000 per batch)
    payload = {
        "host": "desirig.com",
        "key": INDEXNOW_KEY,
        "keyLocation": f"{SITE_URL}/{INDEXNOW_KEY}.txt",
        "urlList": urls[:10000],
    }

    data = json.dumps(payload).encode("utf-8")

    endpoints = [
        "https://api.indexnow.org/indexnow",
        "https://www.bing.com/indexnow",
    ]

    for endpoint in endpoints:
        try:
            req = urllib.request.Request(
                endpoint,
                data=data,
                headers={"Content-Type": "application/json; charset=utf-8"},
                method="POST",
            )
            with urllib.request.urlopen(req) as resp:
                print(f"{endpoint} → {resp.status}")
        except Exception as e:
            print(f"{endpoint} → ERROR: {e}")

    print("Done! URLs submitted to IndexNow.")

if __name__ == "__main__":
    main()
