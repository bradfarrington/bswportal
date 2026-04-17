-- Door Designer Sync Migration
-- Adds sync support columns and creates a sync log table.
-- Run this in the Supabase SQL Editor.

-- 1. Add soft-delete and sync tracking columns to door_designer_options
ALTER TABLE door_designer_options
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS last_synced_at TIMESTAMPTZ DEFAULT now();

-- 2. Create sync log table
CREATE TABLE IF NOT EXISTS door_designer_sync_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  finished_at TIMESTAMPTZ,
  added INTEGER DEFAULT 0,
  updated INTEGER DEFAULT 0,
  removed INTEGER DEFAULT 0,
  unchanged INTEGER DEFAULT 0,
  errors INTEGER DEFAULT 0,
  details JSONB,               -- Array of individual change descriptions
  status TEXT DEFAULT 'running' -- 'running', 'completed', 'failed'
);

-- RLS for sync log
ALTER TABLE door_designer_sync_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on door_designer_sync_log"
  ON door_designer_sync_log FOR SELECT
  USING (true);

-- 3. Enable pg_net extension (needed for pg_cron to call Edge Functions)
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- 4. Index for faster sync lookups
CREATE INDEX IF NOT EXISTS idx_door_options_original_id
  ON door_designer_options (original_id, heading_type_id, parent_option_id);

CREATE INDEX IF NOT EXISTS idx_door_options_is_active
  ON door_designer_options (is_active)
  WHERE is_active = true;
