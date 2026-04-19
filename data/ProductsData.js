/**
 * ProductsData.js
 * 
 * Fetches all product catalog data from Supabase.
 * Replaces the old hardcoded 2696-line version with live API calls.
 * Includes in-memory caching to avoid repeated fetches.
 */

import { supabase } from '../config/supabaseClient';

// ─── Cache ───
let cachedCategories = null;

/**
 * Load all top-level categories with their full nested data.
 * Returns the same structure as the old CATEGORIES array,
 * but with { uri: url } image sources instead of require().
 */
export async function loadCategories() {
  if (cachedCategories) return cachedCategories;

  console.log('[ProductsData] Loading categories from Supabase...');

  const { data: cats, error: catError } = await supabase
    .from('product_categories')
    .select('*')
    .order('sort_order');

  if (catError) {
    console.error('[ProductsData] Error loading categories:', catError.message);
    return [];
  }

  // Load all subcategories at once (single query)
  const { data: allSubs, error: subError } = await supabase
    .from('product_subcategories')
    .select('*')
    .order('sort_order');

  if (subError) {
    console.error('[ProductsData] Error loading subcategories:', subError.message);
  }

  // Load all sections + items in batch
  const { data: allSections, error: secError } = await supabase
    .from('product_sections')
    .select('*, product_section_items(*)')
    .order('sort_order');

  if (secError) {
    console.error('[ProductsData] Error loading sections:', secError.message);
  }

  // Build the nested structure
  const categories = cats.map(cat => {
    const catSections = (allSections || []).filter(s => s.category_id === cat.id);
    const catSubs = (allSubs || []).filter(s => s.category_id === cat.id && !s.parent_subcategory_id);

    return {
      id: cat.id,
      title: cat.title,
      image: cat.image_url ? { uri: cat.image_url } : null,
      tagline: cat.tagline,
      heroImage: cat.hero_image_url ? { uri: cat.hero_image_url } : null,
      about: cat.about,
      stats: (cat.rating || cat.reviews || cat.completed) ? {
        rating: cat.rating,
        reviews: cat.reviews,
        completed: cat.completed,
      } : undefined,
      priceLabel: cat.price_label,
      galleryAlbumName: cat.gallery_album_name,
      ...buildSectionData(catSections),
      subcategories: catSubs.map(sub => buildSubcategory(sub, allSubs, allSections)),
    };
  });

  cachedCategories = categories;
  console.log(`[ProductsData] Loaded ${categories.length} categories`);
  return categories;
}

/**
 * Load a single subcategory by ID (for deep-linking or refreshing)
 */
export async function loadSubcategory(id) {
  const { data, error } = await supabase
    .from('product_subcategories')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`[ProductsData] Error loading subcategory ${id}:`, error.message);
    return null;
  }

  const { data: sections } = await supabase
    .from('product_sections')
    .select('*, product_section_items(*)')
    .eq('subcategory_id', id)
    .order('sort_order');

  const { data: childSubs } = await supabase
    .from('product_subcategories')
    .select('*')
    .eq('parent_subcategory_id', id)
    .order('sort_order');

  return buildSubcategory(data, childSubs || [], sections || []);
}

/**
 * Clear the cache (e.g. after updating products in Supabase)
 */
export function clearCache() {
  cachedCategories = null;
}

// ─── BACKWARD COMPATIBILITY ───
// The old code used `CATEGORIES` as a synchronous export.
// This provides a placeholder that screens can check.
// Screens should call loadCategories() instead.
export const CATEGORIES = [];

// ─── Internal Helpers ───

function buildSubcategory(sub, allSubs, allSections) {
  const subSections = (allSections || []).filter(s => s.subcategory_id === sub.id);
  const childSubs = (allSubs || []).filter(s => s.parent_subcategory_id === sub.id);

  return {
    id: sub.id,
    title: sub.title,
    cardImage: sub.card_image_url ? { uri: sub.card_image_url } : null,
    heroImage: sub.hero_image_url ? { uri: sub.hero_image_url } : null,
    image: sub.card_image_url ? { uri: sub.card_image_url } : null,
    tagline: sub.tagline,
    about: sub.about,
    stats: (sub.rating || sub.reviews || sub.completed) ? {
      rating: sub.rating,
      reviews: sub.reviews,
      completed: sub.completed,
    } : undefined,
    priceLabel: sub.price_label,
    galleryAlbumName: sub.gallery_album_name,
    brochureTitles: sub.brochure_titles || [],
    ...buildSectionData(subSections),
    subcategories: childSubs.map(child => buildSubcategory(child, allSubs, allSections)),
  };
}

function buildSectionData(sections) {
  const result = {
    details: [],
    styles: [],
    hardware: [],
    colours: [],
    glass: [],
    extras: [],
  };

  for (const section of sections) {
    const items = (section.product_section_items || []).sort((a, b) => a.sort_order - b.sort_order);
    
    const sectionObj = {
      title: section.section_title,
      content: section.section_content,
    };

    // Overview image
    if (section.overview_image_url) {
      sectionObj.overviewImage = { uri: section.overview_image_url };
      sectionObj.overviewImageMode = section.overview_image_mode || 'contain';
    }

    // Items grouped by type
    const images = items.filter(it => it.item_type === 'image').map(itemToObj);
    const swatches = items.filter(it => it.item_type === 'swatch').map(itemToObj);
    const carouselImages = items.filter(it => it.item_type === 'carousel').map(itemToObj);

    if (images.length > 0) sectionObj.images = images;
    if (swatches.length > 0) sectionObj.swatches = swatches;
    if (carouselImages.length > 0) sectionObj.carouselImages = carouselImages;

    if (result[section.tab_type]) {
      result[section.tab_type].push(sectionObj);
    }
  }

  return result;
}

function itemToObj(item) {
  const obj = {
    image: item.image_url ? { uri: item.image_url } : null,
    label: item.label,
  };
  if (item.resize_mode) obj.resizeMode = item.resize_mode;
  if (item.full_height) obj.fullHeight = true;
  return obj;
}
