import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://kmrfnaurkbmkkoumfnxp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttcmZuYXVya2Jta2tvdW1mbnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNjY4NTAsImV4cCI6MjA5MTg0Mjg1MH0.V64OETndBlnMMn7ymtv2M3e5GmX3ROk1FwbIaC1_N1k');

async function test() {
   const { data, error } = await supabase.storage.from('brochures').list();
   console.log('brochures bucket:', data ? data.length + ' items' : error);
   
   const { data: d2, error: e2 } = await supabase.storage.from('images').list();
   console.log('images bucket:', d2 ? d2.length + ' items' : e2);

   const { data: d3, error: e3 } = await supabase.storage.from('public').list();
   console.log('public bucket:', d3 ? d3.length + ' items' : e3);
}
test();
