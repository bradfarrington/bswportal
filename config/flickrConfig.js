// Flickr API Configuration
// Get your API key at: https://www.flickr.com/services/apps/create/apply
// Find your User ID at: https://www.webfx.com/tools/idgettr/

export const FLICKR_API_KEY = '47885c7bcb7065b7566c1362f3aca3b9';
export const FLICKR_USER_ID = '100989545@N08';

// Base URL for all Flickr REST API calls
export const FLICKR_BASE_URL = 'https://api.flickr.com/services/rest/';

/**
 * Build a Flickr photo URL from photo object fields.
 * See: https://www.flickr.com/services/api/misc.urls.html
 * @param {object} photo - Photo object from Flickr API
 * @param {'s'|'q'|'t'|'m'|'n'|'w'|'z'|'c'|'b'|'h'|'k'|'o'} size - Size suffix
 * @returns {string} Full image URL
 */
export const buildPhotoUrl = (photo, size = 'z') => {
  return `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;
};
