import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kmrfnaurkbmkkoumfnxp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttcmZuYXVya2Jta2tvdW1mbnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNjY4NTAsImV4cCI6MjA5MTg0Mjg1MH0.V64OETndBlnMMn7ymtv2M3e5GmX3ROk1FwbIaC1_N1k';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
   const { data, error } = await supabase.storage.createBucket('brochures', { public: true });
   console.log("Create Bucket Result:", data, error);
}

test();
