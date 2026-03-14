-- Split ambiguous categories into specific sub-categories
-- Uses parent_id field (already in schema) for hierarchy

-- ============================================
-- INSURANCE: Split into sub-types
-- ============================================
INSERT INTO categories (name, slug, icon, description, parent_id, display_order, is_trucking)
SELECT 'Truck Insurance', 'truck-insurance', 'shield', 'Commercial truck and fleet insurance brokers', id, 5, true
FROM categories WHERE slug = 'insurance-broker'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO categories (name, slug, icon, description, parent_id, display_order, is_trucking)
SELECT 'Car Insurance', 'car-insurance', 'car', 'Auto and personal vehicle insurance', id, 52, false
FROM categories WHERE slug = 'insurance-broker'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO categories (name, slug, icon, description, parent_id, display_order, is_trucking)
SELECT 'Life Insurance', 'life-insurance', 'heart', 'Life, health, and disability insurance', id, 53, false
FROM categories WHERE slug = 'insurance-broker'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO categories (name, slug, icon, description, parent_id, display_order, is_trucking)
SELECT 'Commercial Insurance', 'commercial-insurance', 'building', 'Business, liability, and commercial insurance', id, 54, false
FROM categories WHERE slug = 'insurance-broker'
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- MECHANIC: Split truck vs car
-- ============================================
-- Note: 'truck-mechanic' likely already exists. Add car mechanic.
INSERT INTO categories (name, slug, icon, description, display_order, is_trucking)
VALUES ('Car Mechanic', 'car-mechanic', 'wrench', 'Auto repair shops for cars and light vehicles', 55, false)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO categories (name, slug, icon, description, display_order, is_trucking)
VALUES ('Diesel Mechanic', 'diesel-mechanic', 'wrench', 'Diesel engine repair and maintenance specialists', 6, true)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- TOWING: Heavy vs Light
-- ============================================
INSERT INTO categories (name, slug, icon, description, parent_id, display_order, is_trucking)
SELECT 'Heavy Towing', 'heavy-towing', 'truck', 'Heavy-duty towing for trucks, trailers, and commercial vehicles', id, 7, true
FROM categories WHERE slug = 'towing-service'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO categories (name, slug, icon, description, parent_id, display_order, is_trucking)
SELECT 'Light Towing', 'light-towing', 'car', 'Towing for cars and light vehicles', id, 56, false
FROM categories WHERE slug = 'towing-service'
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- LAWYER: Split by specialty
-- ============================================
INSERT INTO categories (name, slug, icon, description, display_order, is_trucking)
VALUES
  ('Ticket Lawyer', 'ticket-lawyer', 'gavel', 'Traffic ticket and trucking violation lawyers', 8, true),
  ('Immigration Lawyer', 'immigration-lawyer', 'globe', 'Immigration, visa, and work permit lawyers', 57, false),
  ('Real Estate Lawyer', 'real-estate-lawyer', 'home', 'Real estate and property lawyers', 58, false),
  ('Criminal Lawyer', 'criminal-lawyer', 'gavel', 'Criminal defense lawyers', 59, false)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- ACCOUNTANT: Split by specialty
-- ============================================
INSERT INTO categories (name, slug, icon, description, display_order, is_trucking)
VALUES
  ('Trucking Accountant', 'trucking-accountant', 'calculator', 'Accountants specializing in trucking, IFTA, and fleet tax', 9, true),
  ('Personal Tax', 'personal-tax', 'calculator', 'Personal tax preparation and filing', 60, false),
  ('Business Accountant', 'business-accountant', 'calculator', 'General business accounting and bookkeeping', 61, false)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- FINANCE: Split by type
-- ============================================
INSERT INTO categories (name, slug, icon, description, display_order, is_trucking)
VALUES
  ('Truck Finance', 'truck-finance', 'truck', 'Truck financing, leasing, and commercial vehicle loans', 10, true),
  ('Car Loans', 'car-loans', 'car', 'Auto loans and car financing', 62, false),
  ('Mortgage', 'mortgage-broker', 'home', 'Mortgage brokers and home financing', 63, false)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- KEYWORD-BASED AUTO-CATEGORIZATION
-- (Same approach as driving school migration)
-- ============================================

-- Insurance: truck insurance keywords
UPDATE businesses
SET category_id = (SELECT id FROM categories WHERE slug = 'truck-insurance')
WHERE category_id = (SELECT id FROM categories WHERE slug = 'insurance-broker')
  AND (
    name ILIKE '%truck%insur%'
    OR name ILIKE '%fleet%insur%'
    OR name ILIKE '%commercial%auto%'
    OR name ILIKE '%commercial%vehicle%insur%'
    OR name ILIKE '%transport%insur%'
    OR name ILIKE '%cargo%insur%'
    OR name ILIKE '%freight%insur%'
    OR name ILIKE '%carrier%insur%'
  );

-- Insurance: life insurance keywords
UPDATE businesses
SET category_id = (SELECT id FROM categories WHERE slug = 'life-insurance')
WHERE category_id = (SELECT id FROM categories WHERE slug = 'insurance-broker')
  AND (
    name ILIKE '%life%insur%'
    OR name ILIKE '%health%insur%'
    OR name ILIKE '%disability%insur%'
    OR name ILIKE '%benefit%'
    OR name ILIKE '%sun life%'
    OR name ILIKE '%manulife%'
    OR name ILIKE '%great west%'
    OR name ILIKE '%canada life%'
  );

-- Lawyer: ticket/trucking
UPDATE businesses
SET category_id = (SELECT id FROM categories WHERE slug = 'ticket-lawyer')
WHERE category_id IN (SELECT id FROM categories WHERE slug IN ('lawyer', 'ticket-lawyer-for-truckers'))
  AND (
    name ILIKE '%ticket%'
    OR name ILIKE '%traffic%'
    OR name ILIKE '%highway%'
    OR name ILIKE '%speeding%'
    OR name ILIKE '%HTA%'
    OR name ILIKE '%driving offen%'
  );

-- Lawyer: immigration
UPDATE businesses
SET category_id = (SELECT id FROM categories WHERE slug = 'immigration-lawyer')
WHERE category_id IN (SELECT id FROM categories WHERE slug IN ('lawyer', 'immigration-consultant'))
  AND (
    name ILIKE '%immigra%'
    OR name ILIKE '%visa%'
    OR name ILIKE '%work permit%'
    OR name ILIKE '%LMIA%'
    OR name ILIKE '%refugee%'
    OR name ILIKE '%citizenship%'
    OR name ILIKE '%PR %'
    OR name ILIKE '%permanent residen%'
  );

-- Accountant: trucking
UPDATE businesses
SET category_id = (SELECT id FROM categories WHERE slug = 'trucking-accountant')
WHERE category_id IN (SELECT id FROM categories WHERE slug IN ('accountant', 'accounting'))
  AND (
    name ILIKE '%truck%'
    OR name ILIKE '%transport%'
    OR name ILIKE '%fleet%'
    OR name ILIKE '%IFTA%'
    OR name ILIKE '%freight%'
    OR name ILIKE '%carrier%'
  );

-- Towing: heavy
UPDATE businesses
SET category_id = (SELECT id FROM categories WHERE slug = 'heavy-towing')
WHERE category_id = (SELECT id FROM categories WHERE slug = 'towing-service')
  AND (
    name ILIKE '%heavy%'
    OR name ILIKE '%truck%tow%'
    OR name ILIKE '%semi%tow%'
    OR name ILIKE '%commercial%tow%'
    OR name ILIKE '%industrial%tow%'
    OR name ILIKE '%fleet%tow%'
    OR name ILIKE '%trailer%tow%'
  );
