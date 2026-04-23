import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kmrfnaurkbmkkoumfnxp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttcmZuYXVya2Jta2tvdW1mbnhwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjI2Njg1MCwiZXhwIjoyMDkxODQyODUwfQ.kL9APIoqLaLrwOrbQMCQpB1JklT0hffZrC2GsLQIASY';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function run() {
  const { data: brochures } = await supabase.from('brochures').select('title, link');
  const { data: maint } = await supabase.from('maintenance_guides').select('title, link');
  console.log("Brochures:", brochures.map(b => b.title));
  console.log("Maintenance:", maint.map(m => m.title));
}
run();
