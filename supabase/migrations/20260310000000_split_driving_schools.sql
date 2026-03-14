-- Split "Driving School" into "Truck Driving School" and "Car Driving School"
-- Unclassifiable ones stay as "Driving School" (generic)

-- Step 1: Add new categories
INSERT INTO categories (name, slug, icon, description, display_order, is_trucking)
VALUES
  ('Truck Driving School', 'truck-driving-school', 'truck', 'AZ/DZ truck driving schools and MELT training', 4, true),
  ('Car Driving School', 'car-driving-school', 'car', 'G1/G2 car driving lessons and MTO-approved schools', 51, false)
ON CONFLICT (slug) DO NOTHING;

-- Step 2: Migrate truck driving schools (strong keyword match)
UPDATE businesses
SET category_id = (SELECT id FROM categories WHERE slug = 'truck-driving-school')
WHERE category_id = (SELECT id FROM categories WHERE slug = 'driving-school')
  AND (
    name ILIKE '%truck%'
    OR name ILIKE '%CDL%'
    OR name ILIKE '%MELT%'
    OR name ILIKE '%class 1%'
    OR name ILIKE '%class 3%'
    OR name ILIKE '%class a%'
    OR name ILIKE '%AZ %'
    OR name ILIKE '%DZ %'
    OR name ILIKE '% AZ%'
    OR name ILIKE '% DZ%'
    OR name ILIKE '%tractor%'
    OR name ILIKE '%semi %'
    OR name ILIKE '%18 wheel%'
    OR name ILIKE '%18-wheel%'
    OR name ILIKE '%big rig%'
    OR name ILIKE '%heavy vehicle%'
    OR name ILIKE '%heavy equipment%'
    OR name ILIKE '%commercial driv%'
    OR name ILIKE '%commercial vehicle%'
    OR name ILIKE '%transport training%'
    OR name ILIKE '%transport driver%'
    OR name ILIKE '%professional transport%'
    OR name ILIKE '%professional driver%'
    OR name ILIKE '%5th wheel%'
    OR name ILIKE '%air brake%'
    OR name ILIKE '%HME%'
    OR name ILIKE '%freight%'
    OR name ILIKE '%logist%'
    OR name ILIKE '%routier%'
    OR name ILIKE '%camion%'
  );

-- Step 3: Migrate car driving schools (strong keyword match)
UPDATE businesses
SET category_id = (SELECT id FROM categories WHERE slug = 'car-driving-school')
WHERE category_id = (SELECT id FROM categories WHERE slug = 'driving-school')
  AND (
    name ILIKE '%young driver%'
    OR name ILIKE '%teen driv%'
    OR name ILIKE '%beginner driv%'
    OR name ILIKE '%learn to drive%'
    OR name ILIKE '%G1 %'
    OR name ILIKE '%G2 %'
    OR name ILIKE '% G1%'
    OR name ILIKE '% G2%'
    OR name ILIKE '%car driv%'
    OR name ILIKE '%auto driv%'
    OR name ILIKE '%motorcycle%'
    OR name ILIKE '%driver ed%'
    OR name ILIKE '%defensive driv%'
    OR name ILIKE '%auto ecole%'
    OR name ILIKE '%auto école%'
    OR name ILIKE '%ecole de conduite%'
    OR name ILIKE '%école de conduite%'
  );

-- Step 4: Keep remaining as "Driving School" (don't delete the category)
-- These 675+ ambiguous ones stay where they are until we can verify them
-- Most are likely truck schools since our scraping queries targeted trucking
