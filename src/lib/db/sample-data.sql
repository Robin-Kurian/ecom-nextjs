-- Sample data for ecom-nextjs
-- Run this after creating the schema to populate initial data

-- First, insert some offers
INSERT INTO offers (title, discount, description, active) VALUES
  ('10% OFF', 10, 'Introductory offer!', true),
  ('15% OFF', 15, 'Limited time discount!', true),
  ('20% OFF', 20, 'Party special!', true),
  ('5% OFF', 5, 'Toy week offer!', true),
  ('30% OFF', 30, 'Clearance sale!', true),
  ('25% OFF', 25, 'Bundle deal - save big!', true),
  ('40% OFF', 40, 'Limited time flash sale!', true),
  ('50% OFF', 50, 'End of season clearance!', true)
ON CONFLICT DO NOTHING;

-- Insert products (using static data from the project)
INSERT INTO products (name, slug, description, price, image, category, stock, rating, num_reviews, offer_id, new_arrival, updated_at) VALUES
  -- Newborn Essentials
  ('Organic Cotton Bodysuit (0-3M)', 'organic-cotton-bodysuit', 'Soft, breathable bodysuit for newborns.', 499, 'https://placehold.co/400x500.png?text=Bodysuit', 'newborn', 30, 4.8, 42, 1, true, NOW()),
  ('Swaddle Blanket Set', 'swaddle-blanket-set', 'Cozy swaddles for peaceful sleep.', 899, 'https://placehold.co/400x500.png?text=Swaddle', 'newborn-swaddles', 15, 4.7, 28, NULL, true, NOW()),
  
  -- Baby Clothing
  ('Baby Romper (3-12M)', 'baby-romper', 'Adorable romper for active babies.', 699, 'https://placehold.co/400x500.png?text=Romper', 'baby-rompers', 22, 4.6, 19, 2, true, NOW()),
  ('Sleeveless Denim Dress (3-12M)', 'sleeveless-denim-dress', 'Chic sleeveless dress in blue denim.', 799, 'https://placehold.co/400x500.png?text=Denim+Dress', 'baby-dresses', 10, 4.9, 15, NULL, true, NOW()),
  
  -- Toddler
  ('Toddler Casual T-Shirt (1-3Y)', 'toddler-casual-t-shirt', 'Comfy t-shirt for toddlers.', 399, 'https://placehold.co/400x500.png?text=Toddler+Tee', 'toddler-casual', 18, 4.5, 12, NULL, false, NOW()),
  ('Toddler Party Dress (1-3Y)', 'toddler-party-dress', 'Sparkly dress for special occasions.', 1299, 'https://placehold.co/400x500.png?text=Party+Dress', 'toddler-party', 7, 4.8, 9, 3, false, NOW()),
  
  -- Feeding
  ('Silicone Feeding Set', 'silicone-feeding-set', 'Safe, BPA-free feeding essentials.', 599, 'https://placehold.co/400x500.png?text=Feeding+Set', 'feeding', 25, 4.7, 21, NULL, false, NOW()),
  
  -- Toys & Play
  ('Stacking Rings Toy', 'stacking-rings-toy', 'Classic developmental toy for babies.', 349, 'https://placehold.co/400x500.png?text=Rings+Toy', 'toys', 40, 4.9, 33, 4, false, NOW()),
  
  -- Offers/Sale Items
  ('Baby Hooded Towel', 'baby-hooded-towel', 'Soft, absorbent towel with a cute animal hood for bath time fun.', 499, 'https://placehold.co/400x500.png?text=Hooded+Towel', 'offers', 20, 4.7, 14, 5, false, NOW()),
  
  -- Safety & Gear
  ('Baby Car Seat', 'baby-car-seat', 'Safe and comfortable car seat for infants.', 3499, 'https://placehold.co/400x500.png?text=Car+Seat', 'safety', 5, 4.9, 17, NULL, false, NOW()),
  
  -- Bath & Skincare
  ('Gentle Baby Shampoo', 'gentle-baby-shampoo', 'Tear-free, hypoallergenic shampoo for babies.', 249, 'https://placehold.co/400x500.png?text=Shampoo', 'bath', 20, 4.6, 11, NULL, false, NOW()),
  
  -- Sleep & Comfort
  ('Baby Sleep Sack', 'baby-sleep-sack', 'Cozy sleep sack for safe sleep.', 799, 'https://placehold.co/400x500.png?text=Sleep+Sack', 'sleep', 14, 4.8, 13, NULL, false, NOW()),
  
  -- Additional Offers
  ('Bundle: Newborn Starter Pack', 'bundle-newborn-starter-pack', 'Complete starter pack with bodysuit, swaddle, and bib.', 1299, 'https://placehold.co/400x500.png?text=Starter+Pack', 'offers', 12, 4.9, 18, 6, false, NOW()),
  ('Flash Sale: Baby Monitor', 'flash-sale-baby-monitor', 'Smart baby monitor with app connectivity.', 2499, 'https://placehold.co/400x500.png?text=Baby+Monitor', 'offers', 8, 4.6, 22, 7, false, NOW()),
  ('Clearance: Toddler Backpack', 'clearance-toddler-backpack', 'Cute animal-themed backpack for toddlers.', 599, 'https://placehold.co/400x500.png?text=Toddler+Backpack', 'offers', 6, 4.4, 9, 8, false, NOW()),
  
  -- Toys & Play - STEM Toys
  ('STEM Robot Kit', 'stem-robot-kit', 'Build and program your own robot. Perfect for ages 5+.', 2499, 'https://placehold.co/400x500.png?text=STEM+Robot+Kit', 'stem-toys', 10, 4.7, 32, 1, true, NOW()),
  ('Magnetic Building Blocks', 'magnetic-building-blocks', 'Creative magnetic blocks for endless construction fun.', 1599, 'https://placehold.co/400x500.png?text=Magnetic+Blocks', 'stem-toys', 18, 4.8, 27, NULL, true, NOW()),
  
  -- Toys & Play - Puzzles & Games
  ('Animal Puzzle Set', 'animal-puzzle-set', 'Colorful wooden animal puzzles for toddlers.', 499, 'https://placehold.co/400x500.png?text=Animal+Puzzle', 'puzzles', 25, 4.6, 19, NULL, false, NOW()),
  ('Family Board Game Night', 'family-board-game-night', 'Classic board games for the whole family.', 899, 'https://placehold.co/400x500.png?text=Board+Game', 'puzzles', 12, 4.5, 14, 2, false, NOW()),
  
  -- Toys & Play - Bikes & Ride-ons
  ('Balance Bike (2-5Y)', 'balance-bike', 'Lightweight balance bike for early riders.', 2999, 'https://placehold.co/400x500.png?text=Balance+Bike', 'bikes', 7, 4.9, 21, NULL, true, NOW()),
  
  -- Toys & Play - Sports & Games
  ('Mini Soccer Set', 'mini-soccer-set', 'Indoor/outdoor soccer set for active play.', 1199, 'https://placehold.co/400x500.png?text=Mini+Soccer+Set', 'sports', 15, 4.7, 17, NULL, false, NOW()),
  ('Basketball Hoop Stand', 'basketball-hoop-stand', 'Adjustable hoop for kids, great for backyard fun.', 1799, 'https://placehold.co/400x500.png?text=Basketball+Hoop', 'sports', 9, 4.6, 11, 3, false, NOW())
ON CONFLICT (slug) DO NOTHING;

