/**
 * migrate-style-images.mjs
 * 
 * Downloads door style slab images from the portal's SVG data,
 * uploads them to Supabase Storage, and updates image_url on each option.
 * 
 * Usage: node scripts/migrate-style-images.mjs
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
} catch (e) { /* .env not found */ }

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
const STORAGE_BUCKET = 'door-designer';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function run() {
  console.log('🖼️  Door Style Image Migration');
  console.log('================================\n');

  // Step 1: Get all door style options (heading_type_id = 11) with svg_data
  const { data: styles, error } = await supabase
    .from('door_designer_options')
    .select('id, original_id, description, svg_data, image_url')
    .eq('heading_type_id', 11)
    .not('svg_data', 'is', null);

  if (error) {
    console.error('❌ Query error:', error.message);
    return;
  }

  console.log(`📋 Found ${styles.length} door styles with SVG data\n`);

  // Step 2: Extract unique image IDs from SVG data
  const imageIdToUrl = {};  // portalImageId -> supabaseUrl
  const uploaded = new Set();
  let downloadCount = 0;
  let updateCount = 0;

  for (const style of styles) {
    // Extract the image ID from the SVG's xlink:href
    const match = style.svg_data.match(/ID=([a-f0-9-]+)/i);
    if (!match) {
      console.log(`   ⚠️  No image ID in SVG for "${style.description}"`);
      continue;
    }

    const portalImageId = match[1];
    const fileName = `styles/${portalImageId}.png`;

    // Download & upload if not already done
    if (!uploaded.has(portalImageId)) {
      try {
        const imgUrl = `https://www.entrancedoorportal.co.uk/GetStoredImage.ashx?ID=${portalImageId}&ver=0.4.7&size=thumb&burn=E6E6E6&alpha=no`;
        console.log(`   ⬇️  Downloading ${style.description} (${portalImageId})`);
        
        const res = await fetch(imgUrl);
        if (!res.ok) {
          console.log(`   ⚠️  HTTP ${res.status} for ${portalImageId}`);
          continue;
        }

        const buffer = Buffer.from(await res.arrayBuffer());

        const { error: uploadErr } = await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(fileName, buffer, {
            contentType: 'image/png',
            upsert: true,
          });

        if (uploadErr) {
          console.log(`   ⚠️  Upload error: ${uploadErr.message}`);
          continue;
        }

        const { data: publicUrl } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(fileName);
        imageIdToUrl[portalImageId] = publicUrl.publicUrl;
        uploaded.add(portalImageId);
        downloadCount++;
        console.log(`   ✅ Uploaded → ${publicUrl.publicUrl.split('/').pop()}`);

        await sleep(300);
      } catch (err) {
        console.log(`   ❌ Error: ${err.message}`);
      }
    }

    // Step 3: Update the option's image_url
    const supabaseUrl = imageIdToUrl[portalImageId];
    if (supabaseUrl && style.image_url !== supabaseUrl) {
      const { error: updateErr } = await supabase
        .from('door_designer_options')
        .update({ image_url: supabaseUrl })
        .eq('id', style.id);

      if (updateErr) {
        console.log(`   ⚠️  Update error for "${style.description}": ${updateErr.message}`);
      } else {
        updateCount++;
      }
    }
  }

  console.log('\n================================');
  console.log(`🎉 Done!`);
  console.log(`   Images downloaded: ${downloadCount}`);
  console.log(`   Options updated: ${updateCount}`);
  console.log('================================\n');
}

run().catch(err => {
  console.error('❌ Fatal:', err);
  process.exit(1);
});
