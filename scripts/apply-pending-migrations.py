#!/usr/bin/env python3
"""Apply pending Supabase migrations: reviews, subscribers, driving school split."""

import os
from pathlib import Path
from dotenv import load_dotenv
from supabase import create_client

env_path = Path(__file__).parent.parent / ".env.local"
load_dotenv(env_path)

SUPABASE_URL = os.environ["NEXT_PUBLIC_SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]

def main():
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

    # Check if reviews table exists
    try:
        supabase.table("reviews").select("id").limit(1).execute()
        print("reviews table: already exists")
    except Exception:
        print("reviews table: NEEDS CREATION — run migration via Supabase dashboard SQL editor")

    # Check if subscribers table exists
    try:
        supabase.table("subscribers").select("id").limit(1).execute()
        print("subscribers table: already exists")
    except Exception:
        print("subscribers table: NEEDS CREATION — run migration via Supabase dashboard SQL editor")

    # Check driving school split
    cats = supabase.table("categories").select("slug").execute().data
    slugs = [c["slug"] for c in cats]
    if "truck-driving-school" in slugs:
        print("driving school split: already applied")
    else:
        print("driving school split: NEEDS APPLICATION")

    # Apply driving school split via API if needed
    if "truck-driving-school" not in slugs:
        print("\nApplying driving school split...")
        # Create truck driving school category
        supabase.table("categories").insert({
            "name": "Truck Driving School",
            "slug": "truck-driving-school",
            "icon": "truck",
            "description": "AZ/DZ truck driving schools and MELT training",
            "display_order": 4,
            "is_trucking": True,
        }).execute()
        print("  + Created 'Truck Driving School' category")

        supabase.table("categories").insert({
            "name": "Car Driving School",
            "slug": "car-driving-school",
            "icon": "car",
            "description": "G1/G2 car driving lessons and MTO-approved schools",
            "display_order": 51,
            "is_trucking": False,
        }).execute()
        print("  + Created 'Car Driving School' category")

        # Get IDs
        cats = supabase.table("categories").select("id, slug").execute().data
        cat_map = {c["slug"]: c["id"] for c in cats}
        ds_id = cat_map.get("driving-school")
        tds_id = cat_map.get("truck-driving-school")
        cds_id = cat_map.get("car-driving-school")

        if ds_id and tds_id:
            # Truck keywords
            truck_kw = ["truck", "cdl", "melt", "class 1", "class 3", "class a",
                        "az ", "dz ", " az", " dz", "tractor", "semi ",
                        "18 wheel", "big rig", "heavy vehicle", "heavy equipment",
                        "commercial driv", "commercial vehicle", "transport training",
                        "transport driver", "professional driver", "air brake",
                        "freight", "logist", "routier", "camion"]

            # Fetch all driving schools
            all_ds = []
            offset = 0
            while True:
                r = supabase.table("businesses").select("id, name").eq("category_id", ds_id).range(offset, offset+999).execute()
                if not r.data: break
                all_ds.extend(r.data)
                offset += 1000
                if len(r.data) < 1000: break

            truck_ids = []
            car_kw = ["young driver", "teen driv", "beginner driv", "learn to drive",
                       "g1 ", "g2 ", " g1", " g2", "car driv", "auto driv",
                       "motorcycle", "driver ed", "defensive driv", "auto ecole",
                       "ecole de conduite"]
            car_ids = []

            for b in all_ds:
                name = (b.get("name") or "").lower()
                if any(kw in name for kw in truck_kw):
                    truck_ids.append(b["id"])
                elif any(kw in name for kw in car_kw):
                    car_ids.append(b["id"])

            # Apply
            for bid in truck_ids:
                supabase.table("businesses").update({"category_id": tds_id}).eq("id", bid).execute()
            for bid in car_ids:
                supabase.table("businesses").update({"category_id": cds_id}).eq("id", bid).execute()

            print(f"  Moved {len(truck_ids)} → Truck Driving School")
            print(f"  Moved {len(car_ids)} → Car Driving School")
            print(f"  Remaining in generic 'Driving School': {len(all_ds) - len(truck_ids) - len(car_ids)}")

if __name__ == "__main__":
    main()
