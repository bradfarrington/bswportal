import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kmrfnaurkbmkkoumfnxp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttcmZuYXVya2Jta2tvdW1mbnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNjY4NTAsImV4cCI6MjA5MTg0Mjg1MH0.V64OETndBlnMMn7ymtv2M3e5GmX3ROk1FwbIaC1_N1k';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkLinks() {
  const { data: brochures } = await supabase.from('brochures').select('*');
  const { data: maintenance } = await supabase.from('maintenance_guides').select('*');
  
  const allItems = [...(brochures || []), ...(maintenance || [])];
  console.log(`Checking ${allItems.length} links...`);
  
  let failed = 0;
  for (const item of allItems) {
    try {
      const res = await fetch(item.link, { method: 'GET' });
      const contentType = res.headers.get('content-type');
      if (!res.ok) {
         console.log(`FAILED: ${item.title} - Status: ${res.status} - ${item.link}`);
         failed++;
      } else if (contentType && contentType.includes('text/html')) {
         console.log(`WARNING (HTML): ${item.title} - ${item.link} - Type: ${contentType}`);
         failed++;
      } else {
         console.log(`OK: ${item.title} (Type: ${contentType})`);
      }
    } catch(e) {
      console.log(`ERROR: ${item.title} - ${item.link} - ${e.message}`);
      failed++;
    }
  }
  console.log(`Done. Issues: ${failed}`);
}

checkLinks();
