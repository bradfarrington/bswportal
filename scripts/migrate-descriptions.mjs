import { createClient } from "@supabase/supabase-js";
import fs from "fs";

// Supabase Config
const SUPABASE_URL = "https://kmrfnaurkbmkkoumfnxp.supabase.co";
// Using the anon key from the previous script
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttcmZuYXVya2Jta2tvdW1mbnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNjY4NTAsImV4cCI6MjA5MTg0Mjg1MH0.V64OETndBlnMMn7ymtv2M3e5GmX3ROk1FwbIaC1_N1k";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function log(emoji, msg) {
  console.log(`${emoji}  ${msg}`);
}

async function run() {
  log("🚀", "Starting description migration...");

  const { data: products, error: fetchError } = await supabase
    .from("display_products")
    .select("id, description");

  if (fetchError) {
    log("❌", `Failed to fetch products: ${fetchError.message}`);
    return;
  }

  log("📦", `Found ${products.length} products to process.`);

  let successCount = 0;

  for (const product of products) {
    const desc = product.description;
    
    let width = null;
    let height = null;
    let colour_internal = null;
    let colour_external = null;
    const additional_info = [];

    if (desc) {
      const parts = desc.split(/\s*\/\s*|\n/);
      
      parts.forEach(part => {
        let p = part.trim();
        if (!p) return;
        
        const lowered = p.toLowerCase();
        
        if (lowered.includes('width') || lowered.includes('height')) {
          p = p.replace(/size\s*:/i, '').trim();
          const subParts = p.split(/\s*-\s*/);
          let matchedSize = false;
          subParts.forEach(sp => {
            if (sp.toLowerCase().includes('width')) {
              width = sp.replace(/width:?/i, '').trim();
              matchedSize = true;
            } else if (sp.toLowerCase().includes('height')) {
              height = sp.replace(/height:?/i, '').trim();
              matchedSize = true;
            } else {
              additional_info.push(sp.trim());
            }
          });
          if (matchedSize) return;
        }

        if (lowered.includes('colour:') || lowered.includes('color:')) {
          const splitByColor = p.split(/colou?r\s*:/i);
          if (splitByColor[0].trim() !== '' && splitByColor[0].trim() !== '-') {
             additional_info.push(splitByColor[0].replace(/\s*-\s*$/, '').trim());
          }
          
          const colorStr = splitByColor.length > 1 ? splitByColor[1].trim() : '';
          const colorParts = colorStr.split(/\s*-\s*/);
          let matchedColor = false;
          colorParts.forEach(cp => {
              if (cp.toLowerCase().includes('external')) {
                 colour_external = cp.replace(/external/i, '').trim();
                 matchedColor = true;
              } else if (cp.toLowerCase().includes('internal')) {
                 colour_internal = cp.replace(/internal/i, '').trim();
                 matchedColor = true;
              } else {
                 additional_info.push(`Colour: ${cp.trim()}`);
              }
          });
          if (matchedColor) return;
        }

        additional_info.push(p);
      });
    }

    // Extract Glazed status
    let isGlazed = false;
    const final_additional_info = [];
    additional_info.forEach(item => {
       const lowerItem = item.toLowerCase();
       if (lowerItem === 'glazed' || lowerItem.includes('half glazed')) {
          isGlazed = true;
       } else if (lowerItem === 'unglazed') {
          isGlazed = false;
       } else {
          final_additional_info.push(item);
       }
    });

    const escapeSql = (str) => str ? `'${str.replace(/'/g, "''")}'` : 'NULL';
    const infoSql = final_additional_info.length > 0 ? `'${JSON.stringify(final_additional_info).replace(/'/g, "''")}'::jsonb` : `'[]'::jsonb`;

    const sqlStatement = `UPDATE display_products SET width = ${escapeSql(width)}, height = ${escapeSql(height)}, colour_internal = ${escapeSql(colour_internal)}, colour_external = ${escapeSql(colour_external)}, glazed = ${isGlazed ? 'TRUE' : 'FALSE'}, additional_info = ${infoSql} WHERE id = '${product.id}';\n`;

    fs.appendFileSync('bulk_update.sql', sqlStatement);
    console.log(`Generated SQL for ID: ${product.id}`);
    successCount++;
  }

  log("✅", `Migration logic complete! Successfully generated SQL for ${successCount}/${products.length} products in bulk_update.sql`);
}

run().catch((err) => {
  console.error("Migration failed:", err);
});
