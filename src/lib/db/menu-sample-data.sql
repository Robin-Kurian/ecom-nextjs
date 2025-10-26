-- Menu sample data for ecom-nextjs
-- Run this in your Neon database console to populate the menu structure

-- Insert Menu Groups
INSERT INTO menu_groups (id, label, slug, description, image, image_alt, age_group, is_active, sort_order, display_options) VALUES
  ('newborn-group', 'NEWBORN (0-3M)', 'newborn', 'Products for newborns', 'https://placehold.co/600/FF69B4/FFFFFF.png', 'Newborn Products 0-3 Months', 'newborn', true, 1, '{"showInNavbar": true, "navbarLabel": "NEWBORN (0-3M)", "promotionalText": "Welcome your little miracle"}'::jsonb),
  ('baby-group', 'BABY (3-12M)', 'baby', 'Products for growing babies', 'https://placehold.co/600/0000FF/FFFFFF.png', 'Baby Products 3-12 Months', 'baby', true, 2, '{"showInNavbar": true, "navbarLabel": "BABY (3-12M)", "promotionalText": "Growing with your baby"}'::jsonb),
  ('toddler-group', 'TODDLER (1-3Y)', 'toddler', 'Products for active toddlers', 'https://placehold.co/600/FF0000/FFFFFF.png', 'Toddler Products 1-3 Years', 'toddler', true, 3, '{"showInNavbar": true, "navbarLabel": "TODDLER (1-3Y)", "promotionalText": "For your growing explorer"}'::jsonb),
  ('toys-group', 'TOYS & PLAY', 'toys', 'Fun and educational toys for all ages', 'https://placehold.co/600/00FF00/FFFFFF.png', 'Toys & Play', 'general', true, 4, '{"showInNavbar": true, "navbarLabel": "TOYS & PLAY", "promotionalText": "Play, learn, and grow!"}'::jsonb)
ON CONFLICT (slug) DO NOTHING;

-- Insert Menu Sections for NEWBORN
INSERT INTO menu_sections (id, group_id, heading, description, sort_order) VALUES
  ('newborn-clothing', 'newborn-group', 'Clothing', 'Soft and comfortable clothing for newborns', 1),
  ('newborn-care', 'newborn-group', 'Care Essentials', 'Everything you need for newborn care', 2),
  ('newborn-gear', 'newborn-group', 'Gear & Accessories', 'Essential gear for newborn safety and comfort', 3)
ON CONFLICT DO NOTHING;

-- Insert Menu Sections for BABY
INSERT INTO menu_sections (id, group_id, heading, description, sort_order) VALUES
  ('baby-clothing', 'baby-group', 'Clothing', 'Stylish and comfortable clothing for active babies', 1),
  ('baby-development', 'baby-group', 'Development', 'Toys and products for baby development', 2),
  ('baby-feeding', 'baby-group', 'Feeding', 'Safe feeding essentials for growing babies', 3)
ON CONFLICT DO NOTHING;

-- Insert Menu Sections for TODDLER
INSERT INTO menu_sections (id, group_id, heading, description, sort_order) VALUES
  ('toddler-clothing', 'toddler-group', 'Clothing', 'Durable clothing for active toddlers', 1),
  ('toddler-play', 'toddler-group', 'Play & Learn', 'Educational toys and learning materials', 2),
  ('toddler-feeding', 'toddler-group', 'Feeding & Snacks', 'Independent feeding solutions for toddlers', 3)
ON CONFLICT DO NOTHING;

-- Insert Menu Sections for TOYS
INSERT INTO menu_sections (id, group_id, heading, description, sort_order) VALUES
  ('toys-educational', 'toys-group', 'Educational Toys', 'STEM, puzzles, and learning games', 1),
  ('toys-outdoor', 'toys-group', 'Outdoor Play', 'Active fun for all ages', 2)
ON CONFLICT DO NOTHING;

-- Insert Menu Categories for NEWBORN - Clothing
INSERT INTO menu_categories (id, section_id, name, slug, description, product_count, is_active, sort_order, featured, promotional_badge) VALUES
  ('newborn-bodysuits', 'newborn-clothing', 'Bodysuits & Onesies', 'newborn', 'Essential bodysuits for everyday wear', 5, true, 1, true, 'Essential'),
  ('newborn-swaddles', 'newborn-clothing', 'Swaddles & Blankets', 'newborn-swaddles', 'Cozy swaddles for peaceful sleep', 3, true, 2, false, NULL)
ON CONFLICT DO NOTHING;

-- Insert Menu Categories for NEWBORN - Care Essentials
INSERT INTO menu_categories (id, section_id, name, slug, description, product_count, is_active, sort_order, featured, promotional_badge) VALUES
  ('bath-essentials', 'newborn-care', 'Bath Essentials', 'bath', 'Gentle bath products for babies', 4, true, 1, false, NULL),
  ('feeding-supplies', 'newborn-care', 'Feeding Supplies', 'feeding', 'Safe feeding essentials', 6, true, 2, true, 'Popular')
ON CONFLICT DO NOTHING;

-- Insert Menu Categories for NEWBORN - Gear
INSERT INTO menu_categories (id, section_id, name, slug, description, product_count, is_active, sort_order, featured, promotional_badge) VALUES
  ('safety-gear', 'newborn-gear', 'Car Seats & Strollers', 'safety', 'Safety equipment for travel', 2, true, 1, false, NULL)
ON CONFLICT DO NOTHING;

-- Insert Menu Categories for BABY - Clothing
INSERT INTO menu_categories (id, section_id, name, slug, description, product_count, is_active, sort_order, featured, promotional_badge) VALUES
  ('baby-rompers', 'baby-clothing', 'Rompers & Jumpsuits', 'baby-rompers', 'Perfect for active babies', 4, true, 1, true, 'Trending'),
  ('baby-dresses', 'baby-clothing', 'Dresses & Outfits', 'baby-dresses', 'Adorable dresses for special occasions', 3, true, 2, false, NULL)
ON CONFLICT DO NOTHING;

-- Insert Menu Categories for BABY - Development
INSERT INTO menu_categories (id, section_id, name, slug, description, product_count, is_active, sort_order, featured, promotional_badge) VALUES
  ('baby-toys', 'baby-development', 'Toys & Play', 'toys', 'Educational and fun toys', 8, true, 1, true, 'Best Sellers')
ON CONFLICT DO NOTHING;

-- Insert Menu Categories for BABY - Feeding
INSERT INTO menu_categories (id, section_id, name, slug, description, product_count, is_active, sort_order, featured, promotional_badge) VALUES
  ('baby-bottles', 'baby-feeding', 'Bottles & Sippy Cups', 'feeding', 'BPA-free bottles and training cups', 6, true, 1, true, 'Essential'),
  ('baby-bibs', 'baby-feeding', 'Bibs & Feeding Accessories', 'feeding-accessories', 'Mess-free feeding solutions', 4, true, 2, false, NULL)
ON CONFLICT DO NOTHING;

-- Insert Menu Categories for TODDLER - Clothing
INSERT INTO menu_categories (id, section_id, name, slug, description, product_count, is_active, sort_order, featured, promotional_badge) VALUES
  ('toddler-casual', 'toddler-clothing', 'Casual Wear', 'toddler-casual', 'Comfortable everyday clothing', 5, true, 1, false, NULL),
  ('toddler-party', 'toddler-clothing', 'Party & Formal', 'toddler-party', 'Special occasion outfits', 2, true, 2, true, 'Special')
ON CONFLICT DO NOTHING;

-- Insert Menu Categories for TODDLER - Play
INSERT INTO menu_categories (id, section_id, name, slug, description, product_count, is_active, sort_order, featured, promotional_badge) VALUES
  ('toddler-toys', 'toddler-play', 'Educational Toys', 'toddler-toys', 'Learning through play', 6, true, 1, false, NULL)
ON CONFLICT DO NOTHING;

-- Insert Menu Categories for TODDLER - Feeding
INSERT INTO menu_categories (id, section_id, name, slug, description, product_count, is_active, sort_order, featured, promotional_badge) VALUES
  ('toddler-utensils', 'toddler-feeding', 'Utensils & Plates', 'feeding', 'Self-feeding utensils and dishware', 5, true, 1, false, NULL),
  ('toddler-snacks', 'toddler-feeding', 'Snack Containers', 'snack-containers', 'Portable snack and lunch solutions', 3, true, 2, false, NULL)
ON CONFLICT DO NOTHING;

-- Insert Menu Categories for TOYS - Educational
INSERT INTO menu_categories (id, section_id, name, slug, description, product_count, is_active, sort_order, featured, promotional_badge) VALUES
  ('toys-stem', 'toys-educational', 'STEM Toys', 'stem-toys', 'Science, tech, engineering, math', 7, true, 1, true, 'Popular'),
  ('toys-puzzles', 'toys-educational', 'Puzzles & Games', 'puzzles', 'Brain teasers and fun games', 5, true, 2, false, NULL)
ON CONFLICT DO NOTHING;

-- Insert Menu Categories for TOYS - Outdoor
INSERT INTO menu_categories (id, section_id, name, slug, description, product_count, is_active, sort_order, featured, promotional_badge) VALUES
  ('toys-bikes', 'toys-outdoor', 'Bikes & Ride-ons', 'bikes', 'Balance bikes, trikes, and more', 3, true, 1, false, NULL),
  ('toys-sports', 'toys-outdoor', 'Sports & Games', 'sports', 'Balls, nets, and outdoor games', 4, true, 2, false, NULL)
ON CONFLICT DO NOTHING;

