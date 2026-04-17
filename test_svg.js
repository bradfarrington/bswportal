import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

// Since there were no records for category 55 in local DB, the options come from LIVE API.
// To diagnose the SVG format, we can check category 11 (Door styles) which we know work,
// vs category 55. Actually, since API is doing it, we can just look at ANY SVG locally if we have one.
async function test() {
  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data } = await supabase.from('door_designer_options').select('id, description, svg_data').not('svg_data', 'is', null).limit(1);
  if (data?.length > 0) {
     console.log(data[0].svg_data.substring(0, 200));
  } else {
     console.log('No SVGs found in local DB either.');
  }
}
test();
