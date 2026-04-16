-- ============================================
-- BSW Portal: Firebase → Supabase Migration
-- Run this in Supabase SQL Editor (Dashboard)
-- ============================================

-- Brochures table
CREATE TABLE IF NOT EXISTS brochures (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  image TEXT,
  link TEXT,
  filename TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Maintenance guides table
CREATE TABLE IF NOT EXISTS maintenance_guides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  image TEXT,
  link TEXT,
  filename TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Display product categories (maps to Firebase "products" doc IDs)
CREATE TABLE IF NOT EXISTS display_categories (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Display products for sale (the items inside each category)
CREATE TABLE IF NOT EXISTS display_products (
  id SERIAL PRIMARY KEY,
  category_id TEXT REFERENCES display_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price TEXT,
  old_price TEXT,
  description TEXT,
  url TEXT,
  pic_url TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Push tokens table
CREATE TABLE IF NOT EXISTS push_tokens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  expo_push_token TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security but allow public read for content tables
ALTER TABLE brochures ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE display_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE display_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE push_tokens ENABLE ROW LEVEL SECURITY;

-- Public read access for content tables
CREATE POLICY "Allow public read" ON brochures FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON maintenance_guides FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON display_categories FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON display_products FOR SELECT USING (true);

-- Public insert for push tokens (the app sends tokens anonymously)
CREATE POLICY "Allow public insert" ON push_tokens FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read" ON push_tokens FOR SELECT USING (true);
