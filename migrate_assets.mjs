import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { Buffer } from 'buffer';

const supabaseUrl = 'https://kmrfnaurkbmkkoumfnxp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttcmZuYXVya2Jta2tvdW1mbnhwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjI2Njg1MCwiZXhwIjoyMDkxODQyODUwfQ.kL9APIoqLaLrwOrbQMCQpB1JklT0hffZrC2GsLQIASY';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function downloadFile(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) return { error: `Status ${res.status}` };
        
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('text/html')) {
            return { error: `Returned HTML instead of file` };
        }
        
        const arrayBuffer = await res.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return { buffer, contentType };
    } catch (e) {
        return { error: e.message };
    }
}

function getExtension(contentType, url) {
    if (contentType.includes('png')) return 'png';
    if (contentType.includes('jpeg') || contentType.includes('jpg')) return 'jpg';
    if (contentType.includes('pdf')) return 'pdf';
    
    // fallback based on url
    if (url.toLowerCase().includes('.png')) return 'png';
    if (url.toLowerCase().includes('.jpg')) return 'jpg';
    if (url.toLowerCase().includes('.jpeg')) return 'jpg';
    if (url.toLowerCase().includes('.pdf')) return 'pdf';
    
    return 'bin'; // fallback
}

async function run() {
    console.log("Starting Migration...");

    // 1. Create Bucket
    const { error: bucketError } = await supabase.storage.createBucket('brochures', { public: true });
    if (bucketError && bucketError.message !== 'The resource already exists') {
        console.error("Failed to create bucket:", bucketError.message);
    } else {
        console.log("Bucket 'brochures' is ready.");
    }

    const processTable = async (tableName) => {
        console.log(`\nProcessing table: ${tableName}`);
        const { data: items, error } = await supabase.from(tableName).select('*');
        if (error) {
            console.error(`Error fetching ${tableName}:`, error);
            return;
        }

        for (const item of items) {
            console.log(`- Item: ${item.title}`);
            const updates = {};
            let needsUpdate = false;

            // Process Image
            if (item.image && (item.image.includes('firebase') || item.image.includes('drive.google'))) {
                console.log(`  Downloading image...`);
                const { buffer, contentType, error } = await downloadFile(item.image);
                if (error) {
                    console.log(`  Image error: ${error}`);
                } else {
                    const ext = getExtension(contentType, item.image);
                    const safeName = item.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
                    const s3Path = `covers/${safeName}_${item.id.substring(0,5)}.${ext}`;
                    
                    const { data, error: upErr } = await supabase.storage.from('brochures').upload(s3Path, buffer, {
                        contentType: contentType.includes('octet-stream') && ext !== 'bin' ? `image/${ext}` : contentType,
                        upsert: true
                    });
                    
                    if (upErr) {
                        console.log(`  Upload image error:`, upErr.message);
                    } else {
                        const { data: pubData } = supabase.storage.from('brochures').getPublicUrl(s3Path);
                        updates.image = pubData.publicUrl;
                        needsUpdate = true;
                        console.log(`  Uploaded image!`);
                    }
                }
            }

            // Process File (PDF)
            if (item.link && (item.link.includes('firebase') || item.link.includes('drive.google') || item.link.includes('bradleyscott'))) {
                console.log(`  Downloading PDF...`);
                const { buffer, contentType, error } = await downloadFile(item.link);
                if (error) {
                    console.log(`  PDF error: ${error}`);
                } else {
                    const safeName = item.filename ? item.filename.replace('.pdf', '') : item.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
                    const s3Path = `files/${safeName}_${item.id.substring(0,5)}.pdf`;
                    
                    const { data, error: upErr } = await supabase.storage.from('brochures').upload(s3Path, buffer, {
                        contentType: 'application/pdf',
                        upsert: true
                    });
                    
                    if (upErr) {
                        console.log(`  Upload PDF error:`, upErr.message);
                    } else {
                        const { data: pubData } = supabase.storage.from('brochures').getPublicUrl(s3Path);
                        updates.link = pubData.publicUrl;
                        needsUpdate = true;
                        console.log(`  Uploaded PDF!`);
                    }
                }
            }

            // Update Database
            if (needsUpdate) {
                const { error: dbErr } = await supabase.from(tableName).update(updates).eq('id', item.id);
                if (dbErr) {
                    console.error(`  Failed to update DB for ${item.title}:`, dbErr.message);
                } else {
                    console.log(`  DB updated successfully.`);
                }
            }
        }
    };

    await processTable('brochures');
    await processTable('maintenance_guides');
    
    console.log("\nMigration completed.");
}

run();
