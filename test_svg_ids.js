import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
  const supabase = createClient(process.env.EXPO_PUBLIC_SUPABASE_URL, process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY);
  const { data } = await supabase.from('door_designer_options')
     .select('svg_data')
     .eq('heading_type_id', 11)
     .ilike('description', '%Pluto%')
     .limit(1);
  
  if (data && data.length > 0) {
    const svg = data[0].svg_data;
    const ids = [...svg.matchAll(/id="([^"]+)"/g)].map(m => m[1]);
    console.log("IDs found in SVG:", ids);
    console.log("Image hrefs found:", [...svg.matchAll(/<image[^>]*>/g)].map(m => m[0]));
  }
}
test();
