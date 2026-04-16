-- Door Designer Data Tables
-- Stores scraped configurator data from the Entrance Door Portal

-- Categories table (heading types)
CREATE TABLE IF NOT EXISTS door_designer_categories (
  heading_type_id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  display_name TEXT,
  sort_order INTEGER DEFAULT 0,
  is_retail_visible BOOLEAN DEFAULT true
);

-- Options table (all selectable options)
CREATE TABLE IF NOT EXISTS door_designer_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  original_id TEXT NOT NULL,                    -- The GUID from the original API
  heading_type_id INTEGER NOT NULL REFERENCES door_designer_categories(heading_type_id),
  parent_option_id TEXT,                        -- For range→style dependency (original_id of parent range)
  description TEXT NOT NULL,
  sub_text TEXT,
  hover_text TEXT,
  stored_image_id TEXT,                         -- Original GUID for image
  image_url TEXT,                               -- Our Supabase Storage URL
  svg_data TEXT,                                -- Inline SVG for door style thumbnails
  sort_order INTEGER DEFAULT 0,
  valid_but_hidden BOOLEAN DEFAULT false,
  data_link_id TEXT,                            -- DataLinkID from the heading
  UNIQUE(original_id, heading_type_id, parent_option_id)
);

-- Insert the category definitions
INSERT INTO door_designer_categories (heading_type_id, name, display_name, sort_order, is_retail_visible) VALUES
  (101, 'FrameDesign', 'Door Type', 1, true),
  (102, 'LeftSidelight', 'Left Sidelight', 2, true),
  (103, 'RightSidelight', 'Right Sidelight', 3, true),
  (66,  'DoorRange', 'Door Range', 4, true),
  (11,  'DoorDesign', 'Door Style', 5, true),
  (9,   'DoorColourExternal', 'External Colour', 6, true),
  (10,  'DoorColourInternal', 'Internal Colour', 7, true),
  (27,  'FrameColour', 'Frame Colour', 8, true),
  (12,  'DoorGlass', 'Glass', 9, true),
  (13,  'DoorHingesOn', 'Hinge Side', 10, true),
  (14,  'DoorOpening', 'Opening Direction', 11, true),
  (35,  'HardwareColour', 'Hardware Pack', 12, true),
  (17,  'HardwareHandle', 'Handle', 13, true),
  (20,  'HardwareLetterplate', 'Letterplate', 14, true),
  (19,  'HardwareKnocker', 'Knocker', 15, true),
  (33,  'Lock', 'Lock', 16, false),
  (65,  'Cylinder', 'Cylinder', 17, false),
  (18,  'Hinge', 'Hinge Type', 18, false),
  (39,  'DripBar', 'Drip Bar', 19, false),
  (67,  'FrameProfile', 'Frame Profile', 20, false),
  (1,   'LeftAddOn', 'Left Add-On', 21, false),
  (3,   'RightAddOn', 'Right Add-On', 22, false),
  (4,   'TopAddOn', 'Top Add-On', 23, false),
  (5,   'Cill', 'Cill', 24, false),
  (68,  'Drainage', 'Drainage', 25, false),
  (80,  'Backset', 'Backset', 26, false),
  (30,  'SecurityChain', 'Security Chain', 27, false),
  (69,  'ExtraOption', 'Extra Option', 28, false),
  (94,  'SideSlabType', 'Side Slab Type', 29, false)
ON CONFLICT (heading_type_id) DO NOTHING;

-- Create storage bucket for door designer images
-- Run this via Supabase Dashboard > Storage > New Bucket: "door-designer" (public)

-- RLS: Allow public read access to door_designer tables
ALTER TABLE door_designer_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE door_designer_options ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on door_designer_categories"
  ON door_designer_categories FOR SELECT
  USING (true);

CREATE POLICY "Allow public read on door_designer_options"
  ON door_designer_options FOR SELECT
  USING (true);
