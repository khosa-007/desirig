-- DesiRig.com Core Schema
-- Categories, Cities, Businesses, FMCSA Carriers

-- ============================================
-- CATEGORIES
-- ============================================
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT, -- lucide icon name
  description TEXT,
  parent_id INT REFERENCES categories(id),
  display_order INT DEFAULT 0,
  is_trucking BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_parent ON categories(parent_id);

-- ============================================
-- CITIES
-- ============================================
CREATE TABLE cities (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  province TEXT NOT NULL, -- ON, BC, AB, etc.
  province_name TEXT NOT NULL, -- Ontario, British Columbia, etc.
  country TEXT NOT NULL DEFAULT 'CA',
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  population INT,
  is_featured BOOLEAN DEFAULT false,
  listing_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_cities_slug ON cities(slug);
CREATE INDEX idx_cities_province ON cities(province);
CREATE INDEX idx_cities_featured ON cities(is_featured) WHERE is_featured = true;

-- ============================================
-- BUSINESSES
-- ============================================
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  category_id INT NOT NULL REFERENCES categories(id),
  city_id INT REFERENCES cities(id),
  address TEXT,
  postal_code TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  phone TEXT,
  email TEXT,
  website TEXT,
  google_place_id TEXT,
  google_rating NUMERIC(2,1),
  google_review_count INT DEFAULT 0,
  is_desi_owned BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  languages TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'basic', 'premium', 'featured')),
  source TEXT, -- google-places-api, fmcsa, yellowpages, wsib, tta
  business_status TEXT DEFAULT 'OPERATIONAL',
  hours JSONB, -- opening hours from Google
  province TEXT, -- denormalized for fast queries
  country TEXT DEFAULT 'CA',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  UNIQUE(slug, city_id)
);

CREATE INDEX idx_businesses_slug ON businesses(slug);
CREATE INDEX idx_businesses_category ON businesses(category_id);
CREATE INDEX idx_businesses_city ON businesses(city_id);
CREATE INDEX idx_businesses_province ON businesses(province);
CREATE INDEX idx_businesses_desi ON businesses(is_desi_owned) WHERE is_desi_owned = true;
CREATE INDEX idx_businesses_google_place ON businesses(google_place_id) WHERE google_place_id IS NOT NULL;
CREATE INDEX idx_businesses_phone ON businesses(phone) WHERE phone IS NOT NULL;

-- Full-text search vector (updated via trigger, not generated column)
ALTER TABLE businesses ADD COLUMN fts tsvector;
CREATE INDEX idx_businesses_fts ON businesses USING gin(fts);

-- ============================================
-- FMCSA CARRIERS (linked to businesses)
-- ============================================
CREATE TABLE fmcsa_carriers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE SET NULL,
  dot_number TEXT NOT NULL UNIQUE,
  legal_name TEXT NOT NULL,
  dba_name TEXT,
  phone TEXT,
  email TEXT,
  phy_street TEXT,
  phy_city TEXT,
  phy_state TEXT, -- province code
  phy_zip TEXT,
  phy_country TEXT,
  total_drivers INT DEFAULT 0,
  power_units INT DEFAULT 0,
  fleetsize TEXT,
  safety_rating TEXT,
  safety_rating_date TEXT,
  carrier_operation TEXT,
  status_code TEXT,
  company_officer_1 TEXT,
  company_officer_2 TEXT,
  is_desi_owned BOOLEAN DEFAULT false,
  last_fmcsa_sync TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_fmcsa_dot ON fmcsa_carriers(dot_number);
CREATE INDEX idx_fmcsa_business ON fmcsa_carriers(business_id) WHERE business_id IS NOT NULL;
CREATE INDEX idx_fmcsa_city ON fmcsa_carriers(phy_city);
CREATE INDEX idx_fmcsa_desi ON fmcsa_carriers(is_desi_owned) WHERE is_desi_owned = true;

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE fmcsa_carriers ENABLE ROW LEVEL SECURITY;

-- Public read access for all directory data
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read cities" ON cities FOR SELECT USING (true);
CREATE POLICY "Public read businesses" ON businesses FOR SELECT USING (true);
CREATE POLICY "Public read fmcsa" ON fmcsa_carriers FOR SELECT USING (true);

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER businesses_updated_at
  BEFORE UPDATE ON businesses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- FTS trigger
CREATE OR REPLACE FUNCTION update_businesses_fts()
RETURNS TRIGGER AS $$
BEGIN
  NEW.fts :=
    setweight(to_tsvector('simple', coalesce(NEW.name, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(NEW.address, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(array_to_string(NEW.tags, ' '), '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER businesses_fts_update
  BEFORE INSERT OR UPDATE ON businesses
  FOR EACH ROW EXECUTE FUNCTION update_businesses_fts();
