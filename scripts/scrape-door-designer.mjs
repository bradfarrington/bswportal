/**
 * scrape-door-designer.mjs
 * 
 * Scrapes all door designer configuration data from the Entrance Door Portal
 * WCF service and stores it in Supabase (tables + storage).
 * 
 * Usage: node scripts/scrape-door-designer.mjs
 * 
 * Prerequisites:
 *   1. Run door-designer-migration.sql in Supabase SQL Editor
 *   2. Create a "door-designer" storage bucket (public) in Supabase Dashboard
 *   3. Set SUPABASE_URL and SUPABASE_SERVICE_KEY env vars (or uses .env)
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
} catch (e) { /* .env not found, use existing env vars */ }

// Config
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
const BASE_URL = 'https://www.entrancedoorportal.co.uk';
const SERVICE_URL = `${BASE_URL}/Service/CompositeDoorService.svc`;
const INIT_PAGE = `${BASE_URL}/BrandedDoorDesigner.aspx?Code=1BRA02`;
const EMPTY_GUID = '00000000-0000-0000-0000-000000000000';
const STORAGE_BUCKET = 'door-designer';

// Categories we care about scraping
const RETAIL_CATEGORIES = [101, 102, 103, 66, 11, 9, 10, 27, 12, 13, 14, 35, 17, 20, 19];

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Session management
let sessionCookies = '';

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// ── HTTP helpers ──

async function initSession() {
  console.log('🔑 Initializing session...');
  const res = await fetch(INIT_PAGE, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' }
  });
  
  // Node.js fetch gives us access to set-cookie headers
  const cookies = res.headers.getSetCookie?.() || [];
  sessionCookies = cookies.map(c => c.split(';')[0]).join('; ');
  console.log(`   Cookie: ${sessionCookies.substring(0, 60)}...`);
}

async function callService(method, data) {
  const res = await fetch(`${SERVICE_URL}/${method}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cookie': sessionCookies,
    },
    body: JSON.stringify(data),
  });

  // Update cookies
  const newCookies = res.headers.getSetCookie?.() || [];
  if (newCookies.length > 0) {
    const existing = parseCookies(sessionCookies);
    newCookies.forEach(c => {
      const [kv] = c.split(';');
      const [k, ...v] = kv.split('=');
      existing[k.trim()] = v.join('=').trim();
    });
    sessionCookies = Object.entries(existing).map(([k, v]) => `${k}=${v}`).join('; ');
  }

  const json = await res.json();
  const result = json[`${method}Result`];
  
  if (!result) throw new Error(`No ${method}Result in response`);
  if (result.ResponseType === 0) throw new Error(result.Message || 'Service error');
  if (result.ResponseType === 1) throw new Error('Session expired');
  
  return result.Response;
}

function parseCookies(str) {
  const out = {};
  if (!str) return out;
  str.split(';').forEach(p => {
    const [k, ...v] = p.trim().split('=');
    if (k && v.length) out[k.trim()] = v.join('=').trim();
  });
  return out;
}

async function startDoor() {
  return callService('StartDoor', { isRetailMode: true });
}

async function updateOption(category, optionID, dataLinkID = EMPTY_GUID) {
  return callService('UpdateOption', {
    optionCategory: category,
    optionID: optionID,
    dataLinkID: dataLinkID,
    textValue: '',
  });
}

// ── Image download + upload ──

const downloadedImages = new Set();

async function downloadAndUploadImage(storedImageID) {
  if (!storedImageID || storedImageID === EMPTY_GUID) return null;
  if (downloadedImages.has(storedImageID)) {
    // Return existing URL
    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(`${storedImageID}.png`);
    return data.publicUrl;
  }

  try {
    const imgUrl = `${BASE_URL}/GetStoredImage.ashx?ID=${storedImageID}`;
    const res = await fetch(imgUrl);
    if (!res.ok) {
      console.log(`   ⚠️  Image ${storedImageID} returned ${res.status}`);
      return null;
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    const fileName = `${storedImageID}.png`;

    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(fileName, buffer, {
        contentType: 'image/png',
        upsert: true,
      });

    if (error) {
      console.log(`   ⚠️  Upload failed for ${storedImageID}: ${error.message}`);
      return null;
    }

    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(fileName);
    downloadedImages.add(storedImageID);
    return data.publicUrl;
  } catch (err) {
    console.log(`   ⚠️  Image error ${storedImageID}: ${err.message}`);
    return null;
  }
}

// ── Data insertion ──

async function insertOptions(headings, parentOptionId = null) {
  let insertCount = 0;

  for (const heading of headings) {
    const catId = heading.HeadingTypeID;
    
    // Skip non-retail categories unless they have useful data
    if (!RETAIL_CATEGORIES.includes(catId)) continue;
    if (!heading.Options || heading.Options.length === 0) continue;

    console.log(`   📂 Category ${catId}: ${heading.Options.length} options`);

    for (let i = 0; i < heading.Options.length; i++) {
      const opt = heading.Options[i];
      
      // Download image if available
      let imageUrl = null;
      if (opt.StoredImageID && opt.StoredImageID !== EMPTY_GUID) {
        imageUrl = await downloadAndUploadImage(opt.StoredImageID);
        // Be polite to the server
        await sleep(200);
      }

      const record = {
        original_id: opt.ID,
        heading_type_id: catId,
        parent_option_id: parentOptionId,
        description: opt.Description,
        sub_text: opt.SubText || null,
        hover_text: opt.HoverText || null,
        stored_image_id: opt.StoredImageID !== EMPTY_GUID ? opt.StoredImageID : null,
        image_url: imageUrl,
        svg_data: opt.SVG || null,
        sort_order: i,
        valid_but_hidden: opt.ValidButHidden || false,
        data_link_id: heading.DataLinkID !== EMPTY_GUID ? heading.DataLinkID : null,
      };

      const { error } = await supabase
        .from('door_designer_options')
        .upsert(record, { 
          onConflict: 'original_id,heading_type_id,parent_option_id',
          ignoreDuplicates: false 
        });

      if (error) {
        console.log(`   ❌ Insert error for "${opt.Description}": ${error.message}`);
      } else {
        insertCount++;
      }
    }
  }

  return insertCount;
}

// ── Main scraper ──

async function scrape() {
  console.log('🚪 Door Designer Scraper');
  console.log('========================\n');

  // Step 1: Initialize session
  await initSession();
  
  // Step 2: Start a door session
  console.log('\n📡 Calling StartDoor...');
  const initialJob = await startDoor();
  console.log(`   Got ${initialJob.Headings.length} headings`);
  console.log(`   Image Library Version: ${initialJob.ImageLibraryVersion}`);

  // Step 3: Save all initial options (frame types, sidelights, ranges, etc.)
  console.log('\n📥 Saving initial options...');
  const initCount = await insertOptions(initialJob.Headings);
  console.log(`   ✅ Saved ${initCount} initial options`);

  // Step 4: For each door range, select it and capture the styles
  const rangeHeading = initialJob.Headings.find(h => h.HeadingTypeID === 66);
  if (rangeHeading && rangeHeading.Options) {
    console.log(`\n🔄 Walking ${rangeHeading.Options.length} door ranges to capture styles...`);
    
    for (const range of rangeHeading.Options) {
      console.log(`\n   🏠 Range: ${range.Description}`);
      
      try {
        // We need a fresh session for each range walk to avoid state issues
        await initSession();
        const freshJob = await startDoor();
        await sleep(500);
        
        // Select the range
        const afterRange = await updateOption(66, range.ID, rangeHeading.DataLinkID || EMPTY_GUID);
        await sleep(500);

        // Find the door styles heading for this range
        const stylesHeading = afterRange.Headings.find(h => h.HeadingTypeID === 11);
        if (stylesHeading && stylesHeading.Options) {
          console.log(`      Found ${stylesHeading.Options.length} styles for ${range.Description}`);
          
          // Save styles with parent_option_id = range original ID
          const styleHeadings = [{ ...stylesHeading }];
          const count = await insertOptions(styleHeadings, range.ID);
          console.log(`      ✅ Saved ${count} styles`);
        }

        // Also capture any colours/glass that may have become available
        const colourAndGlassHeadings = afterRange.Headings.filter(
          h => [9, 10, 27, 12].includes(h.HeadingTypeID) && h.Options?.length > 0
        );
        if (colourAndGlassHeadings.length > 0) {
          const count = await insertOptions(colourAndGlassHeadings);
          console.log(`      ✅ Saved ${count} colour/glass options`);
        }

        // Capture hardware options too (handles, letterplates, knockers)
        const hwHeadings = afterRange.Headings.filter(
          h => [35, 17, 20, 19, 13, 14].includes(h.HeadingTypeID) && h.Options?.length > 0
        );
        if (hwHeadings.length > 0) {
          const count = await insertOptions(hwHeadings);
          console.log(`      ✅ Saved ${count} hardware/config options`);
        }

      } catch (err) {
        console.log(`      ❌ Error processing range ${range.Description}: ${err.message}`);
      }

      // Be polite
      await sleep(1000);
    }
  }

  // Step 5: Summary
  const { count: totalOptions } = await supabase
    .from('door_designer_options')
    .select('*', { count: 'exact', head: true });

  console.log('\n========================');
  console.log('🎉 Scraping complete!');
  console.log(`   Total options in database: ${totalOptions}`);
  console.log(`   Total images downloaded: ${downloadedImages.size}`);
  console.log('========================\n');
}

// Run
scrape().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
