#!/usr/bin/env python3
"""
Crawl business websites to determine actual category.
- Fetches homepage HTML for each business with a website URL
- Extracts text, looks for category-indicating keywords
- Assigns suggested_category with confidence level (HIGH/MEDIUM/LOW)
- Outputs categorized data + audit report
- Rate limited: 2-second delay between requests (safety rules)
- Checkpoints every 100 businesses

Output:
  data/review/businesses-categorized.csv
  data/review/category-audit.csv
"""

import os
import sys
import csv
import time
import json
import re
import signal
from pathlib import Path
from urllib.parse import urlparse
from datetime import datetime
from dotenv import load_dotenv
from supabase import create_client
import requests
from bs4 import BeautifulSoup

# Load env
env_path = Path(__file__).parent.parent / ".env.local"
load_dotenv(env_path)

SUPABASE_URL = os.environ["NEXT_PUBLIC_SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]

OUTPUT_DIR = Path(__file__).parent.parent / "data" / "review"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
LOG_DIR = Path(__file__).parent.parent / "data" / "logs"
LOG_DIR.mkdir(parents=True, exist_ok=True)

CATEGORIZED_FILE = OUTPUT_DIR / "businesses-categorized.csv"
AUDIT_FILE = OUTPUT_DIR / "category-audit.csv"
CHECKPOINT_FILE = OUTPUT_DIR / ".crawl-checkpoint.json"
LOG_FILE = LOG_DIR / "crawl-categorize.log"

# Request settings
TIMEOUT = 10  # seconds
DELAY = 2  # seconds between requests (safety rule)
BATCH_SIZE = 500
CHECKPOINT_EVERY = 100

# User agent
HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; DesiRig-Categorizer/1.0; +https://desirig.com)",
    "Accept": "text/html,application/xhtml+xml",
    "Accept-Language": "en-US,en;q=0.9",
}

# ============================================
# KEYWORD RULES for category detection
# ============================================
CATEGORY_KEYWORDS = {
    "truck-insurance": {
        "keywords": ["truck insurance", "fleet insurance", "commercial auto insurance",
                      "commercial vehicle insurance", "transport insurance", "cargo insurance",
                      "freight insurance", "carrier insurance", "trucking insurance",
                      "commercial truck", "fleet coverage", "owner operator insurance"],
        "target_category": "Truck Insurance",
        "is_trucking": True,
    },
    "car-insurance": {
        "keywords": ["car insurance", "auto insurance", "home insurance", "home and auto",
                      "tenant insurance", "condo insurance", "personal auto",
                      "motorcycle insurance", "boat insurance"],
        "target_category": "Car Insurance",
        "is_trucking": False,
    },
    "life-insurance": {
        "keywords": ["life insurance", "health insurance", "disability insurance",
                      "critical illness", "term life", "whole life", "universal life",
                      "group benefits", "employee benefits", "sun life", "manulife",
                      "canada life", "great-west"],
        "target_category": "Life Insurance",
        "is_trucking": False,
    },
    "truck-driving-school": {
        "keywords": ["AZ training", "AZ license", "DZ training", "DZ license",
                      "MELT program", "MELT training", "truck driving school",
                      "truck driving course", "commercial driver", "CDL training",
                      "class 1 license", "class 3 license", "air brake course",
                      "tractor trailer", "semi truck training", "heavy vehicle training",
                      "commercial vehicle training", "professional driver training"],
        "target_category": "Truck Driving School",
        "is_trucking": True,
    },
    "car-driving-school": {
        "keywords": ["G1 test", "G2 test", "G1 preparation", "G2 preparation",
                      "beginner driver", "learn to drive", "driver education",
                      "driving lessons", "young drivers", "teen driver",
                      "MTO approved", "BDE course", "defensive driving course",
                      "road test preparation", "in-car lesson"],
        "target_category": "Car Driving School",
        "is_trucking": False,
    },
    "truck-mechanic": {
        "keywords": ["truck repair", "truck mechanic", "diesel repair", "diesel mechanic",
                      "heavy duty repair", "trailer repair", "fleet maintenance",
                      "commercial vehicle repair", "semi truck repair", "truck service",
                      "DPF cleaning", "engine overhaul", "transmission rebuild",
                      "air brake repair", "fifth wheel"],
        "target_category": "Truck Mechanic",
        "is_trucking": True,
    },
    "car-mechanic": {
        "keywords": ["car repair", "auto repair", "auto body", "oil change",
                      "brake service", "tire change", "muffler", "windshield",
                      "collision repair", "dent repair", "car wash",
                      "car detailing", "car service"],
        "target_category": "Car Mechanic",
        "is_trucking": False,
    },
    "heavy-towing": {
        "keywords": ["heavy towing", "heavy duty towing", "truck towing",
                      "commercial towing", "semi towing", "trailer towing",
                      "industrial towing", "heavy recovery", "wrecker service",
                      "flatbed towing"],
        "target_category": "Heavy Towing",
        "is_trucking": True,
    },
    "ticket-lawyer": {
        "keywords": ["traffic ticket", "speeding ticket", "HTA", "highway traffic act",
                      "traffic violation", "driving offence", "stunt driving",
                      "careless driving", "demerit points", "license suspension",
                      "CVOR", "commercial vehicle"],
        "target_category": "Ticket Lawyer",
        "is_trucking": True,
    },
    "immigration-lawyer": {
        "keywords": ["immigration", "visa application", "work permit", "LMIA",
                      "permanent resident", "PR application", "citizenship",
                      "refugee", "family sponsorship", "express entry",
                      "study permit", "PGWP"],
        "target_category": "Immigration Lawyer",
        "is_trucking": False,
    },
    "trucking-accountant": {
        "keywords": ["trucking tax", "truck driver tax", "IFTA", "fleet accounting",
                      "transport accounting", "owner operator tax", "commercial vehicle tax",
                      "freight accounting", "carrier accounting"],
        "target_category": "Trucking Accountant",
        "is_trucking": True,
    },
    "truck-finance": {
        "keywords": ["truck financing", "truck leasing", "commercial vehicle loan",
                      "fleet financing", "trailer financing", "equipment financing",
                      "truck loan", "semi financing", "commercial lending"],
        "target_category": "Truck Finance",
        "is_trucking": True,
    },
}

# Which parent categories to crawl (ambiguous ones)
AMBIGUOUS_CATEGORY_SLUGS = [
    "insurance-broker", "driving-school", "towing-service",
    "lawyer", "accountant", "accounting", "finance",
    "ticket-lawyer-for-truckers", "immigration-consultant",
    "mechanic",  # if exists as generic
]


def log(msg):
    """Log to file and print."""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    line = f"[{timestamp}] {msg}"
    print(line)
    with open(LOG_FILE, "a") as f:
        f.write(line + "\n")


def fetch_page(url):
    """Fetch a webpage, return text content."""
    try:
        # Ensure URL has scheme
        if not url.startswith("http"):
            url = "https://" + url

        resp = requests.get(url, headers=HEADERS, timeout=TIMEOUT,
                           allow_redirects=True, verify=False)
        if resp.status_code != 200:
            return None

        soup = BeautifulSoup(resp.text, "html.parser")

        # Remove script and style tags
        for tag in soup(["script", "style", "nav", "footer", "header"]):
            tag.decompose()

        text = soup.get_text(separator=" ", strip=True).lower()
        return text[:10000]  # First 10K chars is enough
    except Exception as e:
        return None


def categorize_text(text, business_name=""):
    """Match text against keyword rules. Return (category, confidence, matches)."""
    if not text:
        return None, "LOW", []

    combined = (text + " " + business_name.lower()).lower()
    best_cat = None
    best_count = 0
    best_matches = []

    for rule_key, rule in CATEGORY_KEYWORDS.items():
        matches = [kw for kw in rule["keywords"] if kw.lower() in combined]
        if len(matches) > best_count:
            best_count = len(matches)
            best_cat = rule["target_category"]
            best_matches = matches

    if best_count >= 3:
        return best_cat, "HIGH", best_matches
    elif best_count >= 1:
        return best_cat, "MEDIUM", best_matches
    else:
        return None, "LOW", []


def extract_metadata(text):
    """Extract additional info from page text."""
    if not text:
        return {}

    meta = {}

    # Languages mentioned
    langs = []
    if "punjabi" in text or "ਪੰਜਾਬੀ" in text:
        langs.append("Punjabi")
    if "hindi" in text or "हिंदी" in text:
        langs.append("Hindi")
    if "urdu" in text or "اردو" in text:
        langs.append("Urdu")
    if "french" in text or "français" in text:
        langs.append("French")
    if langs:
        meta["languages"] = ", ".join(langs)

    return meta


def load_checkpoint():
    """Load progress checkpoint."""
    if CHECKPOINT_FILE.exists():
        with open(CHECKPOINT_FILE) as f:
            return json.load(f)
    return {"processed_ids": [], "results": []}


def save_checkpoint(data):
    """Save progress checkpoint."""
    with open(CHECKPOINT_FILE, "w") as f:
        json.dump(data, f)


def fetch_all(supabase, table, select="*", filters=None, batch_size=1000):
    """Fetch all rows with pagination."""
    all_rows = []
    offset = 0
    while True:
        q = supabase.table(table).select(select).range(offset, offset + batch_size - 1)
        resp = q.execute()
        rows = resp.data
        if not rows:
            break
        all_rows.extend(rows)
        offset += batch_size
        if len(rows) < batch_size:
            break
    return all_rows


def main():
    log("=== CRAWL-CATEGORIZE START ===")

    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

    # Fetch categories
    cats = supabase.table("categories").select("id, name, slug").execute().data
    cat_slug_to_id = {c["slug"]: c["id"] for c in cats}
    cat_id_to_name = {c["id"]: c["name"] for c in cats}

    # Get IDs for ambiguous categories
    ambiguous_cat_ids = [cat_slug_to_id[s] for s in AMBIGUOUS_CATEGORY_SLUGS if s in cat_slug_to_id]
    log(f"Ambiguous category IDs: {ambiguous_cat_ids}")

    # Fetch businesses in ambiguous categories that have websites
    log("Fetching businesses with websites in ambiguous categories...")
    businesses = fetch_all(supabase, "businesses",
        "id, name, website, category_id, phone, address, province")

    # Filter to ambiguous categories with websites
    to_crawl = [b for b in businesses
                if b.get("category_id") in ambiguous_cat_ids
                and b.get("website")
                and b["website"].strip()]

    log(f"Total businesses: {len(businesses)}")
    log(f"In ambiguous categories with website: {len(to_crawl)}")

    # Load checkpoint
    checkpoint = load_checkpoint()
    processed_ids = set(checkpoint.get("processed_ids", []))
    results = checkpoint.get("results", [])

    # Filter out already-processed
    remaining = [b for b in to_crawl if b["id"] not in processed_ids]
    log(f"Already processed: {len(processed_ids)}, remaining: {len(remaining)}")

    # Process in batches
    for i, biz in enumerate(remaining):
        biz_id = biz["id"]
        name = biz.get("name", "")
        website = biz.get("website", "").strip()
        current_cat = cat_id_to_name.get(biz.get("category_id"), "Unknown")

        log(f"[{i+1}/{len(remaining)}] Crawling: {name} — {website}")

        # Fetch page
        text = fetch_page(website)
        meta = extract_metadata(text) if text else {}

        # Categorize
        suggested_cat, confidence, matches = categorize_text(text, name)

        result = {
            "id": biz_id,
            "name": name,
            "website": website,
            "current_category": current_cat,
            "suggested_category": suggested_cat or current_cat,
            "confidence": confidence,
            "keyword_matches": "; ".join(matches[:5]),
            "languages_found": meta.get("languages", ""),
            "crawl_status": "OK" if text else "FAILED",
            "province": biz.get("province", ""),
        }
        results.append(result)
        processed_ids.add(biz_id)

        # Checkpoint
        if (i + 1) % CHECKPOINT_EVERY == 0:
            log(f"  Checkpoint at {i+1}...")
            save_checkpoint({
                "processed_ids": list(processed_ids),
                "results": results,
            })

        # Rate limit
        time.sleep(DELAY)

    # Final checkpoint
    save_checkpoint({"processed_ids": list(processed_ids), "results": results})

    # Write categorized CSV
    log(f"\nWriting {len(results)} results to {CATEGORIZED_FILE}...")
    with open(CATEGORIZED_FILE, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=[
            "id", "name", "website", "current_category", "suggested_category",
            "confidence", "keyword_matches", "languages_found", "crawl_status", "province"
        ])
        writer.writeheader()
        writer.writerows(results)

    # Write audit report (only changes)
    changes = [r for r in results if r["suggested_category"] != r["current_category"]]
    log(f"Writing audit report: {len(changes)} category changes to {AUDIT_FILE}...")
    with open(AUDIT_FILE, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=[
            "id", "name", "current_category", "suggested_category",
            "confidence", "keyword_matches", "crawl_status"
        ])
        writer.writeheader()
        writer.writerows(changes)

    # Summary
    high = sum(1 for r in results if r["confidence"] == "HIGH")
    med = sum(1 for r in results if r["confidence"] == "MEDIUM")
    low = sum(1 for r in results if r["confidence"] == "LOW")
    log(f"\n=== SUMMARY ===")
    log(f"Total crawled: {len(results)}")
    log(f"HIGH confidence: {high}")
    log(f"MEDIUM confidence: {med}")
    log(f"LOW confidence: {low}")
    log(f"Category changes suggested: {len(changes)}")
    log(f"=== DONE ===")


if __name__ == "__main__":
    # Suppress SSL warnings for crawling
    import urllib3
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
    main()
