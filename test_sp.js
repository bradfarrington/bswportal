import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
  const supabase = createClient(process.env.EXPO_PUBLIC_SUPABASE_URL, process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY);
  
  // They might be in category 11 but shown for 55? No, they are fetched live for 55.
  // Wait, let's fetch all door styles (Cat 11) that end with "SP" to see if we have them locally.
  const { data } = await supabase.from('door_designer_options')
     .select('description, image_url')
     .eq('heading_type_id', 11)
     .like('description', '%SP');
  console.log('Cat 11 SP options count:', data?.length);
  if (data?.length > 0) {
      console.log(data.map(d => d.description).slice(0, 10));
  }
}
test();
