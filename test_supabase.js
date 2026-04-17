import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const { data } = await supabase.from('door_designer_options').select('id, description, original_id, image_url, svg_data').eq('heading_type_id', 55);
  console.log('Category 55 options:', data?.length);
  if (data?.length > 0) {
     console.log(data.slice(0, 3));
  } else {
     console.log('No data');
  }
}
test();
