#!/usr/bin/env python3
"""
DesiRig.com — Data Quality Audit (READ ONLY)
Checks 38k+ businesses in Supabase for quality issues.
"""

import os
from collections import Counter, defaultdict
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env.local'))

from supabase import create_client

URL = os.environ['NEXT_PUBLIC_SUPABASE_URL']
KEY = os.environ['SUPABASE_SERVICE_ROLE_KEY']
sb = create_client(URL, KEY)

# ---------- helpers ----------

def fetch_all(table, columns='*', batch=1000):
    """Fetch all rows using pagination (Supabase caps at 1000 per request)."""
    rows = []
    offset = 0
    while True:
        resp = sb.table(table).select(columns).range(offset, offset + batch - 1).execute()
        rows.extend(resp.data)
        if len(resp.data) < batch:
            break
        offset += batch
    return rows

def divider(title):
    print(f"\n{'='*60}")
    print(f"  {title}")
    print(f"{'='*60}")

# ---------- fetch data ----------

print("Fetching all businesses (this may take a moment)...")
businesses = fetch_all('businesses',
    'id,name,slug,category_id,city_id,phone,website,google_rating,google_review_count,business_status,province,country')
total = len(businesses)
print(f"Total businesses fetched: {total:,}")

# Also fetch categories and cities for readable names
categories = fetch_all('categories', 'id,name,slug')
cat_map = {c['id']: c['name'] for c in categories}

cities = fetch_all('cities', 'id,name,province')
city_map = {c['id']: c['name'] for c in cities}

# ============================================================
# 1. DEAD BUSINESSES (business_status != 'OPERATIONAL')
# ============================================================
divider("1. BUSINESS STATUS BREAKDOWN")

status_counts = Counter(b.get('business_status') or 'NULL' for b in businesses)
operational = status_counts.get('OPERATIONAL', 0)
print(f"\n{'Status':<30} {'Count':>8} {'%':>7}")
print("-" * 47)
for status, count in status_counts.most_common():
    print(f"{status:<30} {count:>8,} {count/total*100:>6.1f}%")
non_op = total - operational
print(f"\n>>> Non-OPERATIONAL total: {non_op:,} ({non_op/total*100:.1f}%)")

# ============================================================
# 2. MISSING PHONES
# ============================================================
divider("2. MISSING PHONE NUMBERS")

no_phone = [b for b in businesses if not b.get('phone')]
print(f"Businesses without phone: {len(no_phone):,} / {total:,} ({len(no_phone)/total*100:.1f}%)")

# ============================================================
# 3. MISSING WEBSITES
# ============================================================
divider("3. MISSING WEBSITES")

no_website = [b for b in businesses if not b.get('website')]
print(f"Businesses without website: {len(no_website):,} / {total:,} ({len(no_website)/total*100:.1f}%)")

# ============================================================
# 4. DUPLICATE DETECTION (same name + city_id)
# ============================================================
divider("4. DUPLICATE DETECTION (same name + city)")

name_city = defaultdict(list)
for b in businesses:
    key = (b.get('name', '').strip().lower(), b.get('city_id'))
    name_city[key].append(b)

dupes = {k: v for k, v in name_city.items() if len(v) > 1}
dupe_count = sum(len(v) for v in dupes.values())
print(f"Duplicate groups: {len(dupes):,}")
print(f"Total duplicate rows: {dupe_count:,}")
print(f"\nTop 20 duplicate groups:")
print(f"{'Business Name':<45} {'City':<20} {'Count':>5}")
print("-" * 72)
sorted_dupes = sorted(dupes.items(), key=lambda x: -len(x[1]))[:20]
for (name, city_id), items in sorted_dupes:
    city_name = city_map.get(city_id, str(city_id))
    print(f"{name[:44]:<45} {city_name:<20} {len(items):>5}")

# ============================================================
# 5. LOW QUALITY LISTINGS (empty shells)
# ============================================================
divider("5. LOW QUALITY LISTINGS (no phone + no website + no rating)")

shells = [b for b in businesses
          if not b.get('phone')
          and not b.get('website')
          and not b.get('google_rating')]
print(f"Empty shell businesses: {len(shells):,} / {total:,} ({len(shells)/total*100:.1f}%)")
if shells:
    print(f"\nSample (first 10):")
    for b in shells[:10]:
        city_name = city_map.get(b.get('city_id'), '?')
        cat_name = cat_map.get(b.get('category_id'), '?')
        print(f"  - {b.get('name', '?')} | {city_name} | {cat_name}")

# ============================================================
# 6. CATEGORY DISTRIBUTION (top 20)
# ============================================================
divider("6. CATEGORY DISTRIBUTION (top 20)")

cat_counts = Counter(b.get('category_id') for b in businesses)
print(f"\n{'Category':<45} {'Count':>8} {'%':>7}")
print("-" * 62)
for cat_id, count in cat_counts.most_common(20):
    name = cat_map.get(cat_id, f'NULL/Unknown ({cat_id})')
    print(f"{name[:44]:<45} {count:>8,} {count/total*100:>6.1f}%")

no_cat = cat_counts.get(None, 0)
if no_cat:
    print(f"\n>>> Businesses with NO category: {no_cat:,}")

# ============================================================
# 7. PROVINCE DISTRIBUTION
# ============================================================
divider("7. PROVINCE DISTRIBUTION")

prov_counts = Counter(b.get('province') or 'NULL' for b in businesses)
print(f"\n{'Province':<25} {'Count':>8} {'%':>7}")
print("-" * 42)
for prov, count in prov_counts.most_common():
    print(f"{prov:<25} {count:>8,} {count/total*100:>6.1f}%")

# ============================================================
# 8. GOOGLE RATING DISTRIBUTION
# ============================================================
divider("8. GOOGLE RATING DISTRIBUTION")

no_rating = 0
buckets = {'0-2': 0, '2-3': 0, '3-4': 0, '4-5': 0}
for b in businesses:
    r = b.get('google_rating')
    if r is None:
        no_rating += 1
    elif r < 2:
        buckets['0-2'] += 1
    elif r < 3:
        buckets['2-3'] += 1
    elif r < 4:
        buckets['3-4'] += 1
    else:
        buckets['4-5'] += 1

has_rating = total - no_rating
print(f"\nBusinesses WITH rating:    {has_rating:,} ({has_rating/total*100:.1f}%)")
print(f"Businesses WITHOUT rating: {no_rating:,} ({no_rating/total*100:.1f}%)")
print(f"\n{'Range':<10} {'Count':>8} {'%':>7}")
print("-" * 27)
for rng, count in buckets.items():
    pct = count / has_rating * 100 if has_rating else 0
    print(f"{rng:<10} {count:>8,} {pct:>6.1f}%")

# Also check google_review_count
no_reviews = sum(1 for b in businesses if not b.get('google_review_count'))
print(f"\nBusinesses with NO review count: {no_reviews:,} ({no_reviews/total*100:.1f}%)")

# ============================================================
# SUMMARY
# ============================================================
divider("SUMMARY — ACTION ITEMS")
print(f"""
Total businesses:           {total:,}
Non-operational:            {non_op:,} ({non_op/total*100:.1f}%) — consider removing or flagging
Missing phone:              {len(no_phone):,} ({len(no_phone)/total*100:.1f}%)
Missing website:            {len(no_website):,} ({len(no_website)/total*100:.1f}%)
Duplicate groups:           {len(dupes):,} ({dupe_count:,} rows)
Empty shells:               {len(shells):,} ({len(shells)/total*100:.1f}%) — lowest value, consider purging
No Google rating:           {no_rating:,} ({no_rating/total*100:.1f}%)
""")
