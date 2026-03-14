#!/usr/bin/env python3
"""
Apply crawl-categorize results to Supabase.
- HIGH confidence: auto-apply new category
- MEDIUM confidence: auto-apply but flag in audit
- LOW confidence: leave as-is
- Generates summary report

Reads: data/review/businesses-categorized.csv
Logs: data/logs/category-updates.log
"""

import os
import csv
import json
from pathlib import Path
from datetime import datetime
from dotenv import load_dotenv
from supabase import create_client

# Load env
env_path = Path(__file__).parent.parent / ".env.local"
load_dotenv(env_path)

SUPABASE_URL = os.environ["NEXT_PUBLIC_SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]

DATA_DIR = Path(__file__).parent.parent / "data"
CATEGORIZED_FILE = DATA_DIR / "review" / "businesses-categorized.csv"
LOG_FILE = DATA_DIR / "logs" / "category-updates.log"
SUMMARY_FILE = DATA_DIR / "review" / "apply-summary.json"


def log(msg):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    line = f"[{timestamp}] {msg}"
    print(line)
    with open(LOG_FILE, "a") as f:
        f.write(line + "\n")


def main():
    if not CATEGORIZED_FILE.exists():
        print(f"ERROR: {CATEGORIZED_FILE} not found. Run crawl-categorize.py first.")
        return

    log("=== APPLY CATEGORIES START ===")

    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

    # Build category name → id mapping
    cats = supabase.table("categories").select("id, name, slug").execute().data
    cat_name_to_id = {c["name"]: c["id"] for c in cats}

    # Read categorized data
    with open(CATEGORIZED_FILE) as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    log(f"Loaded {len(rows)} rows from categorized CSV")

    # Process
    applied = 0
    skipped = 0
    errors = 0
    changes = []

    for row in rows:
        biz_id = row["id"]
        current = row["current_category"]
        suggested = row["suggested_category"]
        confidence = row["confidence"]

        # Skip LOW confidence or no change
        if confidence == "LOW" or suggested == current:
            skipped += 1
            continue

        # Look up new category ID
        new_cat_id = cat_name_to_id.get(suggested)
        if not new_cat_id:
            log(f"  WARNING: Category '{suggested}' not found in DB. Skipping {row['name']}")
            errors += 1
            continue

        # Apply update
        try:
            supabase.table("businesses").update({
                "category_id": new_cat_id,
                "updated_at": datetime.now().isoformat(),
            }).eq("id", biz_id).execute()

            applied += 1
            changes.append({
                "id": biz_id,
                "name": row["name"],
                "old_category": current,
                "new_category": suggested,
                "confidence": confidence,
                "keywords": row.get("keyword_matches", ""),
            })

            if applied % 50 == 0:
                log(f"  Applied {applied} changes so far...")

        except Exception as e:
            log(f"  ERROR updating {row['name']}: {e}")
            errors += 1

    # Summary
    summary = {
        "timestamp": datetime.now().isoformat(),
        "total_rows": len(rows),
        "applied": applied,
        "skipped_low_or_unchanged": skipped,
        "errors": errors,
        "changes": changes,
    }

    with open(SUMMARY_FILE, "w") as f:
        json.dump(summary, f, indent=2)

    log(f"\n=== SUMMARY ===")
    log(f"Total rows: {len(rows)}")
    log(f"Applied: {applied}")
    log(f"Skipped (LOW/unchanged): {skipped}")
    log(f"Errors: {errors}")
    log(f"Summary saved: {SUMMARY_FILE}")
    log(f"=== DONE ===")


if __name__ == "__main__":
    main()
