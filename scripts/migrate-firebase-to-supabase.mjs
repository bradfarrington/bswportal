/**
 * One-time migration script: Firebase Firestore → Supabase
 * 
 * Run with: node scripts/migrate-firebase-to-supabase.mjs
 * 
 * Prerequisites:
 * 1. Run the create-tables.sql in Supabase Dashboard first
 * 2. Make sure Firebase has the data you want to migrate
 */

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
import { createClient } from "@supabase/supabase-js";

// ── Firebase Config ──
const firebaseConfig = {
  apiKey: "AIzaSyDbtqf1zjfz2XQMEuIIJVk2vKesvkEyHDU",
  authDomain: "bswportalv2.firebaseapp.com",
  projectId: "bswportalv2",
  storageBucket: "bswportalv2.appspot.com",
  messagingSenderId: "968301915029",
  appId: "1:968301915029:web:60706944804a513afda49c",
};

const firebaseApp = initializeApp(firebaseConfig);
const firestoreDb = getFirestore(firebaseApp);

// ── Supabase Config ──
const SUPABASE_URL = "https://kmrfnaurkbmkkoumfnxp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttcmZuYXVya2Jta2tvdW1mbnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNjY4NTAsImV4cCI6MjA5MTg0Mjg1MH0.V64OETndBlnMMn7ymtv2M3e5GmX3ROk1FwbIaC1_N1k";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── Helper ──
function log(emoji, msg) {
  console.log(`${emoji}  ${msg}`);
}

// ── Migrate Brochures ──
async function migrateBrochures() {
  log("📖", "Migrating brochures...");
  const snapshot = await getDocs(collection(firestoreDb, "brochures"));
  const rows = [];
  snapshot.forEach((docSnap) => {
    const d = docSnap.data();
    rows.push({
      title: d.title || "",
      image: d.image || null,
      link: d.link || null,
      filename: d.filename || null,
    });
  });

  if (rows.length === 0) {
    log("⚠️", "No brochures found in Firebase.");
    return;
  }

  const { data, error } = await supabase.from("brochures").insert(rows).select();
  if (error) {
    log("❌", `Brochures insert failed: ${error.message}`);
  } else {
    log("✅", `Migrated ${data.length} brochures.`);
  }
}

// ── Migrate Maintenance Guides ──
async function migrateMaintenanceGuides() {
  log("🔧", "Migrating maintenance guides...");
  const snapshot = await getDocs(collection(firestoreDb, "maintenanceguides"));
  const rows = [];
  snapshot.forEach((docSnap) => {
    const d = docSnap.data();
    rows.push({
      title: d.title || "",
      image: d.image || null,
      link: d.link || null,
      filename: d.filename || null,
    });
  });

  if (rows.length === 0) {
    log("⚠️", "No maintenance guides found in Firebase.");
    return;
  }

  const { data, error } = await supabase.from("maintenance_guides").insert(rows).select();
  if (error) {
    log("❌", `Maintenance guides insert failed: ${error.message}`);
  } else {
    log("✅", `Migrated ${data.length} maintenance guides.`);
  }
}

// ── Migrate Display Products ──
async function migrateDisplayProducts() {
  log("🛍️", "Migrating display products...");
  
  // First, get all product category doc IDs
  const snapshot = await getDocs(collection(firestoreDb, "products"));
  const categories = [];
  snapshot.forEach((docSnap) => {
    categories.push(docSnap.id);
  });

  log("📂", `Found ${categories.length} product categories: ${categories.join(", ")}`);

  // Insert categories
  const categoryRows = categories.map((id) => ({ id }));
  const { error: catError } = await supabase.from("display_categories").upsert(categoryRows);
  if (catError) {
    log("❌", `Category insert failed: ${catError.message}`);
    return;
  }

  // Now get products from each category document
  let totalProducts = 0;
  for (const categoryId of categories) {
    const docRef = doc(firestoreDb, "products", categoryId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      log("⚠️", `  Category "${categoryId}" doc doesn't exist, skipping.`);
      continue;
    }

    const data = docSnap.data();
    const products = data.products || [];
    
    if (products.length === 0) {
      log("⚠️", `  Category "${categoryId}" has no products.`);
      continue;
    }

    const productRows = products.map((p) => ({
      category_id: categoryId,
      name: p.name || "",
      price: p.price || null,
      old_price: p.oldPrice || null,
      description: p.description || null,
      url: p.url || null,
      pic_url: p.picUrl || null,
      images: p.images || [],
    }));

    const { data: inserted, error: prodError } = await supabase
      .from("display_products")
      .insert(productRows)
      .select();
    
    if (prodError) {
      log("❌", `  Products insert for "${categoryId}" failed: ${prodError.message}`);
    } else {
      log("✅", `  Migrated ${inserted.length} products from "${categoryId}".`);
      totalProducts += inserted.length;
    }
  }

  log("🎉", `Total display products migrated: ${totalProducts}`);
}

// ── Run All ──
async function main() {
  console.log("\n========================================");
  console.log("  Firebase → Supabase Migration");
  console.log("========================================\n");

  await migrateBrochures();
  console.log("");
  await migrateMaintenanceGuides();
  console.log("");
  await migrateDisplayProducts();

  console.log("\n========================================");
  console.log("  Migration Complete!");
  console.log("========================================\n");
  process.exit(0);
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
