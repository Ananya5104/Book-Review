// Default placeholder image from placeholder.com
export const DEFAULT_BOOK_COVER = 'https://via.placeholder.com/300x450?text=No+Cover+Available';

/**
 * Handle image loading errors by replacing with a default image
 * @param {Event} event - The error event
 */
export const handleImageError = (event) => {
  event.target.src = DEFAULT_BOOK_COVER;
  event.target.onerror = null; // Prevent infinite loop if default image also fails
};

/**
 * Get a valid image URL or return the default image URL
 * @param {string} imageUrl - The image URL to check
 * @returns {string} - A valid image URL
 */
export const getValidImageUrl = (imageUrl) => {
  if (!imageUrl || imageUrl === '/images/default-book.jpg') {
    return DEFAULT_BOOK_COVER;
  }
  return imageUrl;
};
