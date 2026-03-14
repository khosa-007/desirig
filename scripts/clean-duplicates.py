#!/usr/bin/env python3
"""
DesiRig.com — Duplicate Cleanup + Empty Shell Removal + Province Fix
Keeps highest-rated entry per (name, city_id) group, deletes the rest.
Also removes empty shells and fixes province format inconsistencies.
"""

import os
import json
from collections import defaultdict
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env.local'))

from supabase import create_client

URL = os.environ['NEXT_PUBLIC_SUPABASE_URL']
KEY = os.environ['SUPABASE_SERVICE_ROLE_KEY']
sb = create_client(URL, KEY)

def fetch_all(table, columns='*', batch=1000):
    rows = []
    offset = 0
    while True:
        resp = sb.table(table).select(columns).range(offset, offset + batch - 1).execute()
        rows.extend(resp.data)
        if len(resp.data) < batch:
            break
        offset += batch
    return rows

# ============================================================
# 1. FIX PROVINCE CODES (full names → abbreviations)
# ============================================================
PROVINCE_FIX = {
    "Alberta": "AB",
    "Saskatchewan": "SK",
    "Ontario": "ON",
    "Nova Scotia": "NS",
    "Manitoba": "MB",
    "Quebec": "QC",
    "British Columbia": "BC",
    "New Brunswick": "NB",
    "Newfoundland and Labrador": "NL",
    "Prince Edward Island": "PE",
}

print("Fixing province format inconsistencies...")
fixed_prov = 0
for full_name, code in PROVINCE_FIX.items():
    resp = sb.table("businesses").select("id").eq("province", full_name).execute()
    if resp.data:
        ids = [r["id"] for r in resp.data]
        for bid in ids:
            sb.table("businesses").update({"province": code}).eq("id", bid).execute()
        fixed_prov += len(ids)
        print(f"  {full_name} → {code}: {len(ids)} rows")

print(f"Province fixes applied: {fixed_prov}")

# ============================================================
# 2. REMOVE EMPTY SHELLS (no phone + no website + no rating)
# ============================================================
print("\nRemoving empty shell businesses...")
businesses = fetch_all('businesses',
    'id,name,slug,category_id,city_id,phone,website,google_rating,google_review_count')
total_before = len(businesses)

shells = [b for b in businesses
          if not b.get('phone')
          and not b.get('website')
          and not b.get('google_rating')]

if shells:
    shell_ids = [s['id'] for s in shells]
    # Delete in batches of 100
    for i in range(0, len(shell_ids), 100):
        batch = shell_ids[i:i+100]
        for sid in batch:
            sb.table("businesses").delete().eq("id", sid).execute()
    print(f"Removed {len(shells)} empty shells")
else:
    print("No empty shells found")

# ============================================================
# 3. DEDUPLICATE (same name + city_id → keep best rated)
# ============================================================
print("\nDeduplicating businesses (same name + city)...")

# Re-fetch after shell removal
businesses = fetch_all('businesses',
    'id,name,slug,category_id,city_id,phone,website,google_rating,google_review_count')

name_city = defaultdict(list)
for b in businesses:
    key = (b.get('name', '').strip().lower(), b.get('city_id'))
    name_city[key].append(b)

dupes = {k: v for k, v in name_city.items() if len(v) > 1}
print(f"Found {len(dupes)} duplicate groups ({sum(len(v) for v in dupes.values())} total rows)")

ids_to_delete = []
for (name, city_id), items in dupes.items():
    # Score: prefer entries with more data
    def score(b):
        s = 0
        if b.get('phone'): s += 10
        if b.get('website'): s += 10
        if b.get('google_rating'): s += b['google_rating']  # 0-5 points
        if b.get('google_review_count'): s += min(b['google_review_count'] / 10, 5)  # up to 5 points
        return s

    items.sort(key=score, reverse=True)
    keeper = items[0]
    for dupe in items[1:]:
        ids_to_delete.append(dupe['id'])

print(f"Keeping {len(dupes)} best entries, deleting {len(ids_to_delete)} duplicates")

# Delete in batches
deleted = 0
for i in range(0, len(ids_to_delete), 100):
    batch = ids_to_delete[i:i+100]
    for did in batch:
        sb.table("businesses").delete().eq("id", did).execute()
    deleted += len(batch)
    if deleted % 500 == 0:
        print(f"  Deleted {deleted}/{len(ids_to_delete)}...")

print(f"Deleted {deleted} duplicate rows")

# ============================================================
# 4. UPDATE CITY LISTING COUNTS
# ============================================================
print("\nUpdating city listing counts...")
remaining = fetch_all('businesses', 'id,city_id')
city_counts = defaultdict(int)
for b in remaining:
    if b.get('city_id'):
        city_counts[b['city_id']] += 1

cities = fetch_all('cities', 'id,name,listing_count')
updated_cities = 0
for city in cities:
    new_count = city_counts.get(city['id'], 0)
    if new_count != city.get('listing_count', 0):
        sb.table("cities").update({"listing_count": new_count}).eq("id", city['id']).execute()
        updated_cities += 1

print(f"Updated listing counts for {updated_cities} cities")

# ============================================================
# SUMMARY
# ============================================================
total_after = len(remaining)
print(f"""
============================================================
  CLEANUP SUMMARY
============================================================
Before:           {total_before:,} businesses
Province fixes:   {fixed_prov}
Shells removed:   {len(shells)}
Duplicates removed: {deleted}
After:            {total_after:,} businesses
Net removed:      {total_before - total_after:,}
""")
