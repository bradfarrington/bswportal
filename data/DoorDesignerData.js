/**
 * DoorDesignerData.js
 * 
 * Loads door designer configuration from Supabase (scraped data).
 * Provides instant access to all options without API calls.
 */

import { supabase } from '../config/supabaseClient';

let cachedCategories = null;
let cachedOptions = null;

/**
 * Load all categories (heading types)
 */
export async function loadCategories() {
  if (cachedCategories) return cachedCategories;

  const { data, error } = await supabase
    .from('door_designer_categories')
    .select('*')
    .order('sort_order');

  if (error) {
    console.error('[DoorDesignerData] Error loading categories:', error.message);
    return [];
  }

  cachedCategories = data;
  return data;
}

/**
 * Load all options, optionally filtered by heading_type_id
 */
export async function loadOptions(headingTypeId = null, parentOptionId = null) {
  const query = supabase
    .from('door_designer_options')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  if (headingTypeId) {
    query.eq('heading_type_id', headingTypeId);
  }

  if (parentOptionId !== undefined && parentOptionId !== null) {
    query.eq('parent_option_id', parentOptionId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('[DoorDesignerData] Error loading options:', error.message);
    return [];
  }

  return data;
}

/**
 * Load the full configurator data set in one go.
 * Returns { categories, optionsByCategory }
 */
export async function loadAllDesignerData() {
  if (cachedCategories && cachedOptions) {
    return { categories: cachedCategories, options: cachedOptions };
  }

  console.log('[DoorDesignerData] Loading all data from Supabase...');

  const [categories, allOptions] = await Promise.all([
    loadCategories(),
    loadOptions(),
  ]);

  // Group options by heading_type_id
  const optionsByCategory = {};
  allOptions.forEach(opt => {
    const key = opt.heading_type_id;
    if (!optionsByCategory[key]) optionsByCategory[key] = [];
    optionsByCategory[key].push(opt);
  });

  cachedOptions = optionsByCategory;

  console.log(`[DoorDesignerData] Loaded ${categories.length} categories, ${allOptions.length} options`);

  return { categories, options: optionsByCategory };
}

/**
 * Get door styles for a specific range
 */
export async function getStylesForRange(rangeOriginalId) {
  const { data, error } = await supabase
    .from('door_designer_options')
    .select('*')
    .eq('heading_type_id', 11)
    .eq('parent_option_id', rangeOriginalId)
    .eq('is_active', true)
    .order('sort_order');

  if (error) {
    console.error('[DoorDesignerData] Error loading styles for range:', error.message);
    return [];
  }

  return data;
}

/**
 * Get options for a category, excluding hidden ones
 */
export function getVisibleOptions(optionsByCategory, categoryId, parentId = null) {
  const all = optionsByCategory[categoryId] || [];
  
  let filtered = all.filter(o => !o.valid_but_hidden);
  
  // If parentId specified (for door styles), filter by parent
  if (parentId) {
    filtered = filtered.filter(o => o.parent_option_id === parentId);
  }
  
  return filtered;
}

/**
 * Clear cache (e.g., if you re-scrape)
 */
export function clearCache() {
  cachedCategories = null;
  cachedOptions = null;
}

/**
 * The retail-facing wizard steps with their category mappings
 */
export const WIZARD_STEPS = [
  { id: 1, label: 'Door Type', category: 101, icon: 'layout' },
  { id: 2, label: 'Left Sidelight', category: 102, icon: 'sidebar' },
  { id: 3, label: 'Right Sidelight', category: 103, icon: 'sidebar' },
  { id: 4, label: 'Sidelight Type', category: 94, icon: 'columns' },
  { id: 5, label: 'Range', category: 66, icon: 'grid' },
  { id: 6, label: 'Style', category: 11, icon: 'star' },
  { id: 7, label: 'Ext. Colour', category: 9, icon: 'droplet' },
  { id: 8, label: 'Int. Colour', category: 10, icon: 'droplet' },
  { id: 9, label: 'Frame Colour', category: 27, icon: 'maximize' },
  { id: 10, label: 'Glass', category: 12, icon: 'eye' },
  { id: 11, label: 'Sidelight Style', category: 55, icon: 'sidebar' },
  { id: 12, label: 'Sidelight Glass', category: 58, icon: 'eye' },
  { id: 13, label: 'Hinge Side', category: 13, icon: 'rotate-cw' },
  { id: 14, label: 'Hardware Type', category: 35, icon: 'shield' },
  { id: 15, label: 'Handle', category: 17, icon: 'tool' },
  { id: 16, label: 'Knocker', category: 19, icon: 'disc' },
  { id: 17, label: 'Letterplate', category: 20, icon: 'mail' },
];

/**
 * Categories that should render as image tiles (not list items)
 */
export const IMAGE_TILE_CATEGORIES = [101, 102, 103, 94, 66, 9, 10, 27, 12, 55, 58, 13, 35, 17, 19, 20];
