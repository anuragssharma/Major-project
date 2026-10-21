const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

/**
 * Resolves local relative paths, Cloudinary/external links, and Windows backslashes
 * into a valid browser image URL.
 */
export const getSafeImageUrl = (imagePath) => {
  if (!imagePath || typeof imagePath !== 'string') return null;

  // Already an absolute external URL (e.g. Cloudinary, AWS S3, or http/https)
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Normalize Windows backslashes to standard forward slashes
  let cleanPath = imagePath.replace(/\\/g, '/');

  // Remove leading slashes to prevent double slashes
  cleanPath = cleanPath.replace(/^\/+/, '');

  // Ensure it points to the static uploads route
  if (!cleanPath.startsWith('uploads/')) {
    cleanPath = `uploads/${cleanPath}`;
  }

  return `${BACKEND_BASE_URL}/${cleanPath}`;
};

/**
 * Extracts the primary image from various possible schema structures.
 */
export const extractDonationImage = (item) => {
  if (!item) return null;

  if (Array.isArray(item.images) && item.images.length > 0 && item.images[0]) {
    return getSafeImageUrl(item.images[0]);
  }
  if (typeof item.image === 'string' && item.image) {
    return getSafeImageUrl(item.image);
  }
  if (typeof item.imageUrl === 'string' && item.imageUrl) {
    return getSafeImageUrl(item.imageUrl);
  }
  if (item.deviceDetails) {
    if (Array.isArray(item.deviceDetails.images) && item.deviceDetails.images.length > 0) {
      return getSafeImageUrl(item.deviceDetails.images[0]);
    }
    if (typeof item.deviceDetails.image === 'string' && item.deviceDetails.image) {
      return getSafeImageUrl(item.deviceDetails.image);
    }
  }

  return null;
};