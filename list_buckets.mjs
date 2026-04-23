import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kmrfnaurkbmkkoumfnxp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttcmZuYXVya2Jta2tvdW1mbnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNjY4NTAsImV4cCI6MjA5MTg0Mjg1MH0.V64OETndBlnMMn7ymtv2M3e5GmX3ROk1FwbIaC1_N1k';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkStorage() {
  const { data: buckets, error: bucketErr } = await supabase.storage.listBuckets();
  if (bucketErr) {
    console.error("Bucket Error:", bucketErr);
    return;
  }
  console.log("Buckets:", buckets.map(b => b.name).join(', '));
  
  if (buckets.find(b => b.name === 'brochures')) {
    const { data: files, error: fileErr } = await supabase.storage.from('brochures').list();
    if (fileErr) console.error("File Error:", fileErr);
    else {
      console.log(`Found ${files.length} files in 'brochures' bucket.`);
      console.log(files.slice(0, 10).map(f => f.name).join(', '));
    }
  }
}

checkStorage();
