import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kmrfnaurkbmkkoumfnxp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttcmZuYXVya2Jta2tvdW1mbnhwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjI2Njg1MCwiZXhwIjoyMDkxODQyODUwfQ.kL9APIoqLaLrwOrbQMCQpB1JklT0hffZrC2GsLQIASY';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function run() {
  const { data: b } = await supabase.from('brochures').select('*').limit(1);
  const { data: m } = await supabase.from('maintenance_guides').select('*').limit(1);
  console.log("Brochures Keys:", Object.keys(b[0]));
  console.log("Maintenance Keys:", Object.keys(m[0]));
}
run();
