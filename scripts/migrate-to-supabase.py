#!/usr/bin/env python3
"""
Migrate DesiRig data from local CSVs → Supabase.
Step 1: Seed categories
Step 2: Seed cities (extracted from data)
Step 3: Load businesses (scrape-canada.csv)
Step 4: Load FMCSA carriers (fmcsa-canada.csv, active only)
"""
import csv, os, re, sys, json
from datetime import datetime

# pip install supabase
from supabase import create_client

DATA_DIR = os.path.expanduser("~/Library/Mobile Documents/com~apple~CloudDocs/Vault/DesiRig.com/data")

# Load env vars from .env.local
env_path = os.path.expanduser("~/Projects/desirig/.env.local")
with open(env_path) as f:
    for line in f:
        line = line.strip()
        if line and not line.startswith('#') and '=' in line:
            key, val = line.split('=', 1)
            os.environ[key.strip()] = val.strip()

SUPABASE_URL = os.environ["NEXT_PUBLIC_SUPABASE_URL"]
# Use service role key for migration (bypasses RLS)
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", os.environ["NEXT_PUBLIC_SUPABASE_ANON_KEY"])

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# ============================================
# PROVINCE MAPPING
# ============================================
PROVINCE_NAMES = {
    'ON': 'Ontario', 'BC': 'British Columbia', 'AB': 'Alberta',
    'QC': 'Quebec', 'SK': 'Saskatchewan', 'MB': 'Manitoba',
    'NB': 'New Brunswick', 'NS': 'Nova Scotia', 'NL': 'Newfoundland and Labrador',
    'PE': 'Prince Edward Island', 'YT': 'Yukon', 'NT': 'Northwest Territories',
    'NU': 'Nunavut',
}

# ============================================
# CATEGORIES
# ============================================
CATEGORIES = [
    # Trucking categories (is_trucking=True)
    {"name": "Trucking Company", "slug": "trucking-company", "icon": "truck", "is_trucking": True, "display_order": 1},
    {"name": "Truck Mechanic", "slug": "truck-mechanic", "icon": "wrench", "is_trucking": True, "display_order": 2},
    {"name": "Truck Stop", "slug": "truck-stop", "icon": "fuel", "is_trucking": True, "display_order": 3},
    {"name": "Driving School", "slug": "driving-school", "icon": "graduation-cap", "is_trucking": True, "display_order": 4},
    {"name": "Insurance Broker", "slug": "insurance-broker", "icon": "shield-check", "is_trucking": True, "display_order": 5},
    {"name": "Drug/Alcohol Testing", "slug": "drug-alcohol-testing", "icon": "flask-conical", "is_trucking": True, "display_order": 6},
    {"name": "Medical Exam", "slug": "medical-exam", "icon": "stethoscope", "is_trucking": True, "display_order": 7},
    {"name": "Truck Tires", "slug": "truck-tires", "icon": "circle", "is_trucking": True, "display_order": 8},
    {"name": "Towing Service", "slug": "towing-service", "icon": "anchor", "is_trucking": True, "display_order": 9},
    {"name": "Truck Parts", "slug": "truck-parts", "icon": "cog", "is_trucking": True, "display_order": 10},
    {"name": "Truck Wash", "slug": "truck-wash", "icon": "droplets", "is_trucking": True, "display_order": 11},
    {"name": "Physiotherapy", "slug": "physiotherapy", "icon": "activity", "is_trucking": True, "display_order": 12},
    {"name": "Ticket Lawyer", "slug": "ticket-lawyer", "icon": "scale", "is_trucking": True, "display_order": 13},
    {"name": "Truck Dealer", "slug": "truck-dealer", "icon": "store", "is_trucking": True, "display_order": 14},
    {"name": "Truck Parking", "slug": "truck-parking", "icon": "parking-circle", "is_trucking": True, "display_order": 15},
    {"name": "Freight Broker", "slug": "freight-broker", "icon": "package", "is_trucking": True, "display_order": 16},
    {"name": "Truck Finance", "slug": "truck-finance", "icon": "banknote", "is_trucking": True, "display_order": 17},
    {"name": "Truck Lease", "slug": "truck-lease", "icon": "file-text", "is_trucking": True, "display_order": 18},
    {"name": "Truck Leasing", "slug": "truck-leasing", "icon": "file-text", "is_trucking": True, "display_order": 18},
    {"name": "Truck Body Shop", "slug": "truck-body-shop", "icon": "paint-bucket", "is_trucking": True, "display_order": 19},
    {"name": "Truck Accessories", "slug": "truck-accessories", "icon": "settings", "is_trucking": True, "display_order": 20},
    {"name": "Truck Auction", "slug": "truck-auction", "icon": "gavel", "is_trucking": True, "display_order": 21},
    {"name": "Truck GPS", "slug": "truck-gps", "icon": "map-pin", "is_trucking": True, "display_order": 22},
    {"name": "ELD Supplier", "slug": "eld-supplier", "icon": "tablet", "is_trucking": True, "display_order": 23},
    {"name": "DriveTest Centre", "slug": "drivetest-centre", "icon": "clipboard-check", "is_trucking": True, "display_order": 24},
    {"name": "Test Centre", "slug": "test-centre", "icon": "clipboard", "is_trucking": True, "display_order": 24},
    {"name": "Dispatch Service", "slug": "dispatch-service", "icon": "radio", "is_trucking": True, "display_order": 25},
    {"name": "Safety/Compliance", "slug": "safety-compliance", "icon": "shield", "is_trucking": True, "display_order": 26},
    {"name": "Permit Service", "slug": "permit-service", "icon": "file-badge", "is_trucking": True, "display_order": 27},
    {"name": "Fleet Management", "slug": "fleet-management", "icon": "layout-grid", "is_trucking": True, "display_order": 28},
    {"name": "Fleet Card", "slug": "fleet-card", "icon": "credit-card", "is_trucking": True, "display_order": 29},
    {"name": "Trucking Accountant", "slug": "trucking-accountant", "icon": "calculator", "is_trucking": True, "display_order": 30},
    {"name": "Trucking Association", "slug": "trucking-association", "icon": "users", "is_trucking": True, "display_order": 31},
    {"name": "Trucking Staffing", "slug": "trucking-staffing", "icon": "user-plus", "is_trucking": True, "display_order": 32},
    {"name": "Scale/Weigh Station", "slug": "scale-weigh-station", "icon": "scale", "is_trucking": True, "display_order": 33},
    {"name": "Weigh Station", "slug": "weigh-station", "icon": "scale", "is_trucking": True, "display_order": 33},
    {"name": "Rest Area", "slug": "rest-area", "icon": "bed", "is_trucking": True, "display_order": 34},
    {"name": "Customs Broker", "slug": "customs-broker", "icon": "briefcase", "is_trucking": True, "display_order": 35},
    {"name": "Border Crossing", "slug": "border-crossing", "icon": "flag", "is_trucking": True, "display_order": 36},
    {"name": "Fuel Station", "slug": "fuel-station", "icon": "fuel", "is_trucking": True, "display_order": 37},
    {"name": "Welding Service", "slug": "welding-service", "icon": "flame", "is_trucking": True, "display_order": 38},

    # Desi community categories
    {"name": "Dhaba/Restaurant", "slug": "dhaba-restaurant", "icon": "utensils", "is_trucking": False, "display_order": 50},
    {"name": "Restaurant", "slug": "restaurant", "icon": "utensils", "is_trucking": False, "display_order": 51},
    {"name": "Indian Grocery", "slug": "indian-grocery", "icon": "shopping-cart", "is_trucking": False, "display_order": 52},
    {"name": "Gurdwara", "slug": "gurdwara", "icon": "landmark", "is_trucking": False, "display_order": 53},
    {"name": "Indian Sweets", "slug": "indian-sweets", "icon": "cake", "is_trucking": False, "display_order": 54},
    {"name": "Indian Clothing", "slug": "indian-clothing", "icon": "shirt", "is_trucking": False, "display_order": 55},
    {"name": "Indian Jewellery", "slug": "indian-jewellery", "icon": "gem", "is_trucking": False, "display_order": 56},
    {"name": "Halal Meat", "slug": "halal-meat", "icon": "beef", "is_trucking": False, "display_order": 57},
    {"name": "Banquet Hall", "slug": "banquet-hall", "icon": "party-popper", "is_trucking": False, "display_order": 58},
    {"name": "Community Hall", "slug": "community-hall", "icon": "building", "is_trucking": False, "display_order": 59},
    {"name": "Punjabi Media", "slug": "punjabi-media", "icon": "tv", "is_trucking": False, "display_order": 60},
    {"name": "Catering", "slug": "catering", "icon": "chef-hat", "is_trucking": False, "display_order": 61},

    # Professional services
    {"name": "Lawyer", "slug": "lawyer", "icon": "scale", "is_trucking": False, "display_order": 70},
    {"name": "Accountant", "slug": "accountant", "icon": "calculator", "is_trucking": False, "display_order": 71},
    {"name": "Immigration Consultant", "slug": "immigration-consultant", "icon": "plane", "is_trucking": False, "display_order": 72},
    {"name": "Real Estate", "slug": "real-estate", "icon": "home", "is_trucking": False, "display_order": 73},
    {"name": "Tax Service", "slug": "tax-service", "icon": "receipt", "is_trucking": False, "display_order": 74},
    {"name": "Financial Services", "slug": "financial-services", "icon": "dollar-sign", "is_trucking": False, "display_order": 75},
    {"name": "Money Transfer", "slug": "money-transfer", "icon": "send", "is_trucking": False, "display_order": 76},
    {"name": "Travel Agency", "slug": "travel-agency", "icon": "plane", "is_trucking": False, "display_order": 77},

    # Health & wellness
    {"name": "Walk-in Clinic", "slug": "walk-in-clinic", "icon": "hospital", "is_trucking": False, "display_order": 80},
    {"name": "Dentist", "slug": "dentist", "icon": "smile", "is_trucking": False, "display_order": 81},
    {"name": "Pharmacy", "slug": "pharmacy", "icon": "pill", "is_trucking": False, "display_order": 82},
    {"name": "Optician", "slug": "optician", "icon": "eye", "is_trucking": False, "display_order": 83},
    {"name": "Gym", "slug": "gym", "icon": "dumbbell", "is_trucking": False, "display_order": 84},

    # Auto & other services
    {"name": "Auto Body Shop", "slug": "auto-body-shop", "icon": "car", "is_trucking": False, "display_order": 90},
    {"name": "Car Dealer", "slug": "car-dealer", "icon": "car", "is_trucking": False, "display_order": 91},
    {"name": "Car Wash", "slug": "car-wash", "icon": "droplets", "is_trucking": False, "display_order": 92},
    {"name": "Gas Station", "slug": "gas-station", "icon": "fuel", "is_trucking": False, "display_order": 93},
    {"name": "Oil Change", "slug": "oil-change", "icon": "droplet", "is_trucking": False, "display_order": 94},
    {"name": "Moving Company", "slug": "moving-company", "icon": "truck", "is_trucking": False, "display_order": 95},
    {"name": "Motel", "slug": "motel", "icon": "bed", "is_trucking": False, "display_order": 96},
    {"name": "Barber Shop", "slug": "barber-shop", "icon": "scissors", "is_trucking": False, "display_order": 97},
    {"name": "Hair Salon", "slug": "hair-salon", "icon": "scissors", "is_trucking": False, "display_order": 98},
    {"name": "Phone Shop", "slug": "phone-shop", "icon": "smartphone", "is_trucking": False, "display_order": 99},
    {"name": "Phone Repair", "slug": "phone-repair", "icon": "smartphone", "is_trucking": False, "display_order": 100},
    {"name": "Landscaping", "slug": "landscaping", "icon": "tree-pine", "is_trucking": False, "display_order": 101},
    {"name": "Laundromat", "slug": "laundromat", "icon": "shirt", "is_trucking": False, "display_order": 102},
    {"name": "Storage", "slug": "storage", "icon": "box", "is_trucking": False, "display_order": 103},
    {"name": "Warehouse", "slug": "warehouse", "icon": "warehouse", "is_trucking": False, "display_order": 104},
    {"name": "Wholesale Store", "slug": "wholesale-store", "icon": "shopping-bag", "is_trucking": False, "display_order": 105},
    {"name": "Work Wear", "slug": "work-wear", "icon": "hard-hat", "is_trucking": False, "display_order": 106},
    {"name": "Recruitment Agency", "slug": "recruitment-agency", "icon": "user-search", "is_trucking": False, "display_order": 107},
]


def slugify(text):
    """Convert text to URL-friendly slug."""
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_]+', '-', text)
    text = re.sub(r'-+', '-', text)
    return text.strip('-')


def extract_province(address):
    """Extract 2-letter province code from address string."""
    if not address:
        return ''
    m = re.search(r',\s*([A-Z]{2})\s+[A-Z]\d[A-Z]', address)
    if m:
        return m.group(1)
    # Try pattern: "City, ON, Canada"
    m = re.search(r',\s*([A-Z]{2}),?\s*Canada', address)
    if m:
        return m.group(1)
    return ''


def extract_postal(address):
    """Extract postal code from address."""
    if not address:
        return ''
    m = re.search(r'([A-Z]\d[A-Z]\s*\d[A-Z]\d)', address)
    return m.group(1) if m else ''


def normalize_city(city_raw):
    """Normalize city name: 'Toronto ON' → 'Toronto', 'Calgary AB' → 'Calgary'."""
    if not city_raw:
        return ''
    # Remove trailing province codes
    city = re.sub(r'\s+(ON|BC|AB|QC|SK|MB|NB|NS|NL|PE|YT|NT|NU)$', '', city_raw.strip())
    return city.strip()


def seed_categories():
    """Insert all categories into Supabase."""
    print("Seeding categories...")
    # Clear existing
    supabase.table("categories").delete().neq("id", 0).execute()

    batch = []
    for cat in CATEGORIES:
        batch.append(cat)

    result = supabase.table("categories").upsert(batch, on_conflict="slug").execute()
    print(f"  ✓ {len(result.data)} categories seeded")
    return {cat["name"]: cat["id"] for cat in result.data}


def seed_cities(businesses_data):
    """Extract unique cities from business data and insert."""
    print("Extracting cities from data...")
    city_map = {}  # (city, province) → count

    for row in businesses_data:
        city = normalize_city(row.get('city', ''))
        province = extract_province(row.get('address', ''))
        if city and province:
            key = (city, province)
            city_map[key] = city_map.get(key, 0) + 1

    print(f"  Found {len(city_map)} unique city+province combos")

    # Clear existing
    supabase.table("cities").delete().neq("id", 0).execute()

    cities_to_insert = []
    seen_slugs = set()
    for (city, province), count in sorted(city_map.items(), key=lambda x: -x[1]):
        slug = slugify(f"{city}-{province.lower()}")
        if slug in seen_slugs:
            slug = f"{slug}-{len(seen_slugs)}"
        seen_slugs.add(slug)
        cities_to_insert.append({
            "name": city,
            "slug": slug,
            "province": province,
            "province_name": PROVINCE_NAMES.get(province, province),
            "country": "CA",
            "listing_count": count,
            "is_featured": count >= 100,
        })

    # Insert in batches of 500
    total = 0
    for i in range(0, len(cities_to_insert), 500):
        batch = cities_to_insert[i:i+500]
        result = supabase.table("cities").upsert(batch, on_conflict="slug").execute()
        total += len(result.data)

    print(f"  ✓ {total} cities seeded ({sum(1 for c in cities_to_insert if c['is_featured'])} featured)")

    # Fetch back city IDs
    all_cities = supabase.table("cities").select("id, name, province").execute()
    return {(c["name"], c["province"]): c["id"] for c in all_cities.data}


def load_businesses(category_map, city_ids):
    """Load scrape-canada.csv into businesses table."""
    print("\nLoading businesses from scrape-canada.csv...")

    csv_path = os.path.join(DATA_DIR, "scrape-canada.csv")
    rows = []
    with open(csv_path, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            rows.append(row)

    print(f"  Read {len(rows)} rows from CSV")

    # Clear existing businesses
    supabase.table("businesses").delete().neq("id", "00000000-0000-0000-0000-000000000000").execute()

    batch = []
    skipped = 0
    slug_counts = {}  # track duplicates within same city

    for row in rows:
        name = (row.get('name') or '').strip()
        if not name:
            skipped += 1
            continue

        category_name = (row.get('category') or '').strip()
        cat_id = category_map.get(category_name)
        if not cat_id:
            skipped += 1
            continue

        city_raw = normalize_city(row.get('city', ''))
        address = (row.get('address') or '').strip()
        province = extract_province(address)
        city_id = city_ids.get((city_raw, province))

        base_slug = slugify(name)
        if not base_slug:
            base_slug = 'business'

        # Ensure unique slug per city
        slug_key = (base_slug, city_id)
        if slug_key in slug_counts:
            slug_counts[slug_key] += 1
            slug = f"{base_slug}-{slug_counts[slug_key]}"
        else:
            slug_counts[slug_key] = 0
            slug = base_slug

        rating = row.get('rating', '')
        review_count = row.get('reviews', '')

        biz = {
            "name": name,
            "slug": slug,
            "category_id": cat_id,
            "city_id": city_id,
            "address": address,
            "postal_code": extract_postal(address),
            "phone": (row.get('phone') or '').strip() or None,
            "website": (row.get('website') or '').strip() or None,
            "google_place_id": (row.get('place_id') or '').strip() or None,
            "google_rating": float(rating) if rating else None,
            "google_review_count": int(float(review_count)) if review_count else 0,
            "is_desi_owned": row.get('desi_flag', '').strip() == '1',
            "source": "google-places-api",
            "province": province or None,
            "country": "CA",
            "tags": [],
        }
        batch.append(biz)

    print(f"  Prepared {len(batch)} businesses ({skipped} skipped)")

    # Insert in batches of 500
    total = 0
    errors = 0
    for i in range(0, len(batch), 500):
        chunk = batch[i:i+500]
        try:
            result = supabase.table("businesses").insert(chunk).execute()
            total += len(result.data)
        except Exception as e:
            # Try one by one for failed batch
            for item in chunk:
                try:
                    supabase.table("businesses").insert(item).execute()
                    total += 1
                except Exception as e2:
                    errors += 1
                    if errors <= 5:
                        print(f"    Error: {item['name'][:40]}: {str(e2)[:80]}")

        if (i // 500 + 1) % 10 == 0:
            print(f"    [{i+500}/{len(batch)}] {total} inserted...", flush=True)

    print(f"  ✓ {total} businesses loaded ({errors} errors)")
    return total


def load_fmcsa(category_map, city_ids):
    """Load active FMCSA Canada carriers into fmcsa_carriers table."""
    print("\nLoading FMCSA carriers from fmcsa-canada.csv...")

    csv_path = os.path.join(DATA_DIR, "fmcsa-canada.csv")
    rows = []
    with open(csv_path, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row.get('status_code', '').strip() == 'A':  # Active only
                rows.append(row)

    print(f"  Read {len(rows)} active carriers")

    # Load Desi surname list for flagging
    surname_path = os.path.join(DATA_DIR, "clean", "desi-surname-master-list.txt")
    surnames = set()
    with open(surname_path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#'):
                surnames.add(line.upper())

    # Clear existing
    supabase.table("fmcsa_carriers").delete().neq("id", "00000000-0000-0000-0000-000000000000").execute()

    batch = []
    for row in rows:
        dot = (row.get('dot_number') or '').strip()
        legal = (row.get('legal_name') or '').strip()
        if not dot or not legal:
            continue

        # Check if Desi-owned
        officer1 = (row.get('company_officer_1') or '').upper()
        officer2 = (row.get('company_officer_2') or '').upper()
        combined = f"{legal} {officer1} {officer2}".upper()
        words = set(re.findall(r'[A-Z]+', combined))
        is_desi = bool(words & surnames)

        carrier = {
            "dot_number": dot,
            "legal_name": legal,
            "dba_name": (row.get('dba_name') or '').strip() or None,
            "phone": (row.get('phone') or '').strip() or None,
            "email": (row.get('email_address') or '').strip() or None,
            "phy_street": (row.get('phy_street') or '').strip() or None,
            "phy_city": (row.get('phy_city') or '').strip() or None,
            "phy_state": (row.get('phy_state') or '').strip() or None,
            "phy_zip": (row.get('phy_zip') or '').strip() or None,
            "phy_country": (row.get('phy_country') or '').strip() or None,
            "total_drivers": int(row.get('total_drivers') or 0),
            "power_units": int(row.get('power_units') or 0),
            "fleetsize": (row.get('fleetsize') or '').strip() or None,
            "safety_rating": (row.get('safety_rating') or '').strip() or None,
            "safety_rating_date": (row.get('safety_rating_date') or '').strip() or None,
            "carrier_operation": (row.get('carrier_operation') or '').strip() or None,
            "status_code": "A",
            "company_officer_1": (row.get('company_officer_1') or '').strip() or None,
            "company_officer_2": (row.get('company_officer_2') or '').strip() or None,
            "is_desi_owned": is_desi,
        }
        batch.append(carrier)

    print(f"  Prepared {len(batch)} carriers ({sum(1 for c in batch if c['is_desi_owned'])} Desi-flagged)")

    # Insert in batches of 500
    total = 0
    errors = 0
    for i in range(0, len(batch), 500):
        chunk = batch[i:i+500]
        try:
            result = supabase.table("fmcsa_carriers").insert(chunk).execute()
            total += len(result.data)
        except Exception as e:
            for item in chunk:
                try:
                    supabase.table("fmcsa_carriers").insert(item).execute()
                    total += 1
                except Exception as e2:
                    errors += 1
                    if errors <= 5:
                        print(f"    Error: {item['legal_name'][:40]}: {str(e2)[:80]}")

        if (i // 500 + 1) % 10 == 0:
            print(f"    [{i+500}/{len(batch)}] {total} inserted...", flush=True)

    print(f"  ✓ {total} FMCSA carriers loaded ({errors} errors)")
    return total


def main():
    print("=" * 60)
    print("DesiRig.com — Data Migration to Supabase")
    print("=" * 60)
    start = datetime.now()

    # Step 1: Categories
    category_map = seed_categories()

    # Step 2: Read all business data first (need it for city extraction)
    csv_path = os.path.join(DATA_DIR, "scrape-canada.csv")
    businesses_data = []
    with open(csv_path, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            businesses_data.append(row)

    # Step 3: Cities
    city_ids = seed_cities(businesses_data)

    # Step 4: Businesses
    biz_count = load_businesses(category_map, city_ids)

    # Step 5: FMCSA Carriers
    fmcsa_count = load_fmcsa(category_map, city_ids)

    elapsed = (datetime.now() - start).total_seconds()
    print(f"\n{'=' * 60}")
    print(f"DONE in {elapsed:.1f}s")
    print(f"  Categories: {len(category_map)}")
    print(f"  Cities: {len(city_ids)}")
    print(f"  Businesses: {biz_count}")
    print(f"  FMCSA Carriers: {fmcsa_count}")
    print(f"{'=' * 60}")


if __name__ == "__main__":
    main()
