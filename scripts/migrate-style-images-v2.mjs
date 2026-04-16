/**
 * migrate-style-images-v2.mjs
 * 
 * Downloads ALL images referenced in door style SVGs, uploads to Supabase,
 * and rewrites the svg_data URLs to point to Supabase storage.
 * 
 * Usage: node scripts/migrate-style-images-v2.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env
const envPath = resolve(__dirname, '..', '.env');
try {
  const envContent = readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const [key, ...rest] = line.split('=');
    if (key && rest.length) {
      process.env[key.trim()] = rest.join('=').trim();
    }
  });
} catch (e) {}

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
const STORAGE_BUCKET = 'door-designer';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function run() {
  console.log('🖼️  Door Style SVG Migration v2');
  console.log('=================================\n');

  // Get all styles with svg_data
  const { data: styles, error } = await supabase
    .from('door_designer_options')
    .select('id, original_id, description, svg_data')
    .eq('heading_type_id', 11)
    .not('svg_data', 'is', null);

  if (error) { console.error('❌', error.message); return; }
  console.log(`📋 Found ${styles.length} styles\n`);

  // Step 1: Collect ALL unique image IDs from all SVGs
  const allImageIds = new Set();
  for (const s of styles) {
    const matches = s.svg_data.matchAll(/ID=([a-f0-9-]+)/gi);
    for (const m of matches) allImageIds.add(m[1]);
  }
  console.log(`🔍 Found ${allImageIds.size} unique images across all SVGs\n`);

  // Step 2: Download & upload each unique image
  const idToUrl = {};
  let dlCount = 0;

  for (const imgId of allImageIds) {
    const fileName = `styles/${imgId}.png`;

    // Check if already uploaded
    const { data: existing } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(fileName);

    try {
      // Try to download from portal
      const portalUrl = `https://www.entrancedoorportal.co.uk/GetStoredImage.ashx?ID=${imgId}&ver=0.4.7&size=thumb`;
      const res = await fetch(portalUrl);
      if (!res.ok) {
        console.log(`   ⚠️  HTTP ${res.status} for ${imgId}`);
        idToUrl[imgId] = existing.publicUrl; // use existing if download fails
        continue;
      }

      const buffer = Buffer.from(await res.arrayBuffer());
      if (buffer.length < 100) {
        console.log(`   ⚠️  Empty image for ${imgId}`);
        continue;
      }

      const { error: upErr } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(fileName, buffer, { contentType: 'image/png', upsert: true });

      if (upErr) {
        console.log(`   ⚠️  Upload err: ${upErr.message}`);
        idToUrl[imgId] = existing.publicUrl;
      } else {
        idToUrl[imgId] = existing.publicUrl;
        dlCount++;
        process.stdout.write(`   ✅ ${dlCount}/${allImageIds.size} images\r`);
      }

      await sleep(200);
    } catch (err) {
      console.log(`   ❌ ${imgId}: ${err.message}`);
    }
  }

  console.log(`\n\n📤 Downloaded ${dlCount} images\n`);

  // Step 3: Rewrite SVG data URLs and update DB
  let updateCount = 0;
  for (const style of styles) {
    let newSvg = style.svg_data;

    // Replace all portal URLs with Supabase URLs
    newSvg = newSvg.replace(
      /https:\/\/www\.entrancedoorportal\.co\.uk\/GetStoredImage\.ashx\?ID=([a-f0-9-]+)[^"']*/gi,
      (match, imgId) => {
        return idToUrl[imgId] || match; // fallback to original if not found
      }
    );

    if (newSvg !== style.svg_data) {
      const { error: upErr } = await supabase
        .from('door_designer_options')
        .update({ svg_data: newSvg })
        .eq('id', style.id);

      if (upErr) {
        console.log(`   ⚠️  Update err for "${style.description}": ${upErr.message}`);
      } else {
        updateCount++;
      }
    }
  }

  console.log(`\n=================================`);
  console.log(`🎉 Done!`);
  console.log(`   Unique images: ${allImageIds.size}`);
  console.log(`   Downloaded: ${dlCount}`);
  console.log(`   SVGs rewritten: ${updateCount}`);
  console.log(`=================================\n`);
}

run().catch(err => { console.error('❌', err); process.exit(1); });
