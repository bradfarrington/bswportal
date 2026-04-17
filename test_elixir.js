import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
  const supabase = createClient(process.env.EXPO_PUBLIC_SUPABASE_URL, process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY);
  const { data } = await supabase.from('door_designer_options')
     .select('id, description, svg_data, image_url')
     .ilike('description', '%Elixir 1%')
     .limit(1);
  console.log(data);
}
test();
