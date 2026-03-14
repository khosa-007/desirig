#!/usr/bin/env python3
"""
Apply the detailed_categories migration directly to Supabase.
Creates sub-categories and auto-categorizes businesses by name keywords.
This is the Python equivalent of supabase/migrations/20260314000000_detailed_categories.sql
"""

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

    # Fetch existing categories
    cats = supabase.table("categories").select("id, name, slug").execute().data
    cat_map = {c["slug"]: c["id"] for c in cats}
    existing_slugs = set(c["slug"] for c in cats)

    print(f"Found {len(cats)} existing categories")

    # ── New sub-categories to create ──
    new_cats = []

    # Insurance sub-types
    insurance_id = cat_map.get("insurance-broker")
    if insurance_id:
        for slug, name, desc, order, trucking in [
            ("truck-insurance", "Truck Insurance", "Commercial truck and fleet insurance brokers", 5, True),
            ("car-insurance", "Car Insurance", "Auto and personal vehicle insurance", 52, False),
            ("life-insurance", "Life Insurance", "Life, health, and disability insurance", 53, False),
            ("commercial-insurance", "Commercial Insurance", "Business, liability, and commercial insurance", 54, False),
        ]:
            if slug not in existing_slugs:
                new_cats.append({
                    "name": name, "slug": slug, "icon": "shield",
                    "description": desc, "parent_id": insurance_id,
                    "display_order": order, "is_trucking": trucking,
                })

    # Mechanic sub-types
    for slug, name, desc, order, trucking in [
        ("car-mechanic", "Car Mechanic", "Auto repair shops for cars and light vehicles", 55, False),
        ("diesel-mechanic", "Diesel Mechanic", "Diesel engine repair and maintenance specialists", 6, True),
    ]:
        if slug not in existing_slugs:
            new_cats.append({
                "name": name, "slug": slug, "icon": "wrench",
                "description": desc, "display_order": order, "is_trucking": trucking,
            })

    # Towing sub-types
    towing_id = cat_map.get("towing-service")
    if towing_id:
        for slug, name, desc, order, trucking in [
            ("heavy-towing", "Heavy Towing", "Heavy-duty towing for trucks and commercial vehicles", 7, True),
            ("light-towing", "Light Towing", "Towing for cars and light vehicles", 56, False),
        ]:
            if slug not in existing_slugs:
                new_cats.append({
                    "name": name, "slug": slug, "icon": "truck",
                    "description": desc, "parent_id": towing_id,
                    "display_order": order, "is_trucking": trucking,
                })

    # Lawyer sub-types
    for slug, name, desc, order, trucking in [
        ("ticket-lawyer", "Ticket Lawyer", "Traffic ticket and trucking violation lawyers", 8, True),
        ("immigration-lawyer", "Immigration Lawyer", "Immigration, visa, and work permit lawyers", 57, False),
        ("real-estate-lawyer", "Real Estate Lawyer", "Real estate and property lawyers", 58, False),
        ("criminal-lawyer", "Criminal Lawyer", "Criminal defense lawyers", 59, False),
    ]:
        if slug not in existing_slugs:
            new_cats.append({
                "name": name, "slug": slug, "icon": "gavel",
                "description": desc, "display_order": order, "is_trucking": trucking,
            })

    # Accountant sub-types
    for slug, name, desc, order, trucking in [
        ("trucking-accountant", "Trucking Accountant", "Accountants specializing in trucking, IFTA, and fleet tax", 9, True),
        ("personal-tax", "Personal Tax", "Personal tax preparation and filing", 60, False),
        ("business-accountant", "Business Accountant", "General business accounting and bookkeeping", 61, False),
    ]:
        if slug not in existing_slugs:
            new_cats.append({
                "name": name, "slug": slug, "icon": "calculator",
                "description": desc, "display_order": order, "is_trucking": trucking,
            })

    # Finance sub-types
    for slug, name, desc, order, trucking in [
        ("truck-finance", "Truck Finance", "Truck financing, leasing, and commercial vehicle loans", 10, True),
        ("car-loans", "Car Loans", "Auto loans and car financing", 62, False),
        ("mortgage-broker", "Mortgage", "Mortgage brokers and home financing", 63, False),
    ]:
        if slug not in existing_slugs:
            new_cats.append({
                "name": name, "slug": slug, "icon": "dollar-sign",
                "description": desc, "display_order": order, "is_trucking": trucking,
            })

    # Insert new categories
    if new_cats:
        print(f"\nCreating {len(new_cats)} new sub-categories...")
        for cat in new_cats:
            try:
                supabase.table("categories").insert(cat).execute()
                print(f"  + {cat['name']}")
            except Exception as e:
                print(f"  SKIP {cat['name']}: {e}")
    else:
        print("All sub-categories already exist.")

    # Refresh category map
    cats = supabase.table("categories").select("id, name, slug").execute().data
    cat_map = {c["slug"]: c["id"] for c in cats}

    # ── Keyword-based auto-categorization ──
    print("\n=== AUTO-CATEGORIZATION BY NAME KEYWORDS ===\n")

    rules = [
        # (source_slug, target_slug, name_keywords)
        ("insurance-broker", "truck-insurance", [
            "%truck%insur%", "%fleet%insur%", "%commercial%auto%",
            "%commercial%vehicle%insur%", "%transport%insur%",
            "%cargo%insur%", "%freight%insur%", "%carrier%insur%",
        ]),
        ("insurance-broker", "life-insurance", [
            "%life%insur%", "%health%insur%", "%disability%insur%",
            "%benefit%", "%sun life%", "%manulife%", "%great west%", "%canada life%",
        ]),
        ("towing-service", "heavy-towing", [
            "%heavy%", "%truck%tow%", "%semi%tow%", "%commercial%tow%",
            "%industrial%tow%", "%fleet%tow%", "%trailer%tow%",
        ]),
        ("lawyer", "ticket-lawyer", [
            "%ticket%", "%traffic%", "%highway%", "%speeding%",
            "%HTA%", "%driving offen%",
        ]),
        ("lawyer", "immigration-lawyer", [
            "%immigra%", "%visa%", "%work permit%", "%LMIA%",
            "%refugee%", "%citizenship%", "%permanent residen%",
        ]),
    ]

    # Also check "immigration-consultant" → "immigration-lawyer"
    if "immigration-consultant" in cat_map:
        rules.append(("immigration-consultant", "immigration-lawyer", [
            "%immigra%", "%visa%", "%work permit%", "%LMIA%",
            "%refugee%", "%citizenship%", "%permanent residen%",
        ]))

    # Check "ticket-lawyer-for-truckers" → "ticket-lawyer"
    if "ticket-lawyer-for-truckers" in cat_map:
        rules.append(("ticket-lawyer-for-truckers", "ticket-lawyer", [
            "%ticket%", "%traffic%", "%highway%", "%speeding%",
            "%HTA%", "%driving offen%",
        ]))

    # Accountant rules
    for src in ["accountant", "accounting"]:
        if src in cat_map:
            rules.append((src, "trucking-accountant", [
                "%truck%", "%transport%", "%fleet%", "%IFTA%",
                "%freight%", "%carrier%",
            ]))

    total_moved = 0
    for source_slug, target_slug, keywords in rules:
        source_id = cat_map.get(source_slug)
        target_id = cat_map.get(target_slug)

        if not source_id or not target_id:
            continue

        # Fetch businesses in source category
        source_businesses = []
        offset = 0
        while True:
            resp = supabase.table("businesses").select("id, name").eq("category_id", source_id).range(offset, offset + 999).execute()
            if not resp.data:
                break
            source_businesses.extend(resp.data)
            offset += 1000
            if len(resp.data) < 1000:
                break

        if not source_businesses:
            continue

        # Match keywords against business names
        to_move = []
        for biz in source_businesses:
            name = (biz.get("name") or "").lower()
            for kw in keywords:
                pattern = kw.replace("%", "").lower()
                parts = pattern.split()
                if all(part in name for part in parts):
                    to_move.append(biz["id"])
                    break

        if to_move:
            print(f"  {source_slug} → {target_slug}: {len(to_move)} businesses")
            # Update in batches
            for i in range(0, len(to_move), 50):
                batch = to_move[i:i+50]
                for biz_id in batch:
                    try:
                        supabase.table("businesses").update({"category_id": target_id}).eq("id", biz_id).execute()
                    except Exception as e:
                        print(f"    ERROR: {e}")
            total_moved += len(to_move)

    print(f"\nTotal businesses re-categorized by name: {total_moved}")
    print("Done! Sub-categories created and businesses auto-categorized.")


if __name__ == "__main__":
    main()
