/**
 * Image service for handling CMS media URLs
 * Provides consistent image URL resolution across all components
 */
import { Media, MediaFormat } from '@/types/article';

// Helper to get full URL with CMS prefix
const getFullImageUrl = (url: string): string => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  if (url.startsWith('/imgs') || url.startsWith('/package')) return url;
  // Prefix with CMS URL for relative paths like /uploads/...
  const cmsPublicBaseUrl = process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.idplay.co.id';
  return `${cmsPublicBaseUrl}${url}`;
};

export const resolveImageUrl = (
  imageData?: Media | string | any,
  formatPriority: string[] = ['medium', 'large', 'small', 'thumbnail']
): string | null => {
  if (!imageData) return null;

  // Handle string URLs
  if (typeof imageData === 'string') {
    return getFullImageUrl(imageData);
  }

  // Handle media objects
  if (typeof imageData === 'object') {
    // Try formats in priority order
    for (const format of formatPriority) {
      if (imageData.formats?.[format]?.url) {
        return getFullImageUrl(imageData.formats[format].url);
      }
    }

    // Fallback to main url
    if (imageData.url) {
      return getFullImageUrl(imageData.url);
    }
  }

  return null;
};

/**
 * Resolves thumbnail URL
 */
export const resolveThumbnailUrl = (imageData?: Media | string | any): string | null => {
  return resolveImageUrl(imageData, ['large', 'medium', 'small', 'thumbnail']);
};

/**
 * Resolves avatar URL
 */
export const resolveAvatarUrl = (avatarData?: Media | string | any): string | null => {
  return resolveImageUrl(avatarData, ['large', 'medium', 'small', 'thumbnail']);
};

/**
 * Resolves hero image URL
 */
export const resolveHeroImageUrl = (imageData?: Media | string | any): string | null => {
  return resolveImageUrl(imageData, ['large', 'medium', 'small', 'thumbnail']);
};

/**
 * Get media alt text with fallbacks
 */
export const getMediaAltText = (mediaData: Media | any, fallback: string = ''): string => {
  if (!mediaData) return fallback;

  return mediaData.alternativeText ||
    mediaData.caption ||
    mediaData.name ||
    fallback;
};

/**
 * Check if media data is valid
 */
export const isValidMedia = (mediaData: Media | string | any): boolean => {
  if (!mediaData) return false;

  if (typeof mediaData === 'string') {
    return mediaData.length > 0;
  }

  if (typeof mediaData === 'object') {
    return !!(mediaData.url || mediaData.formats);
  }

  return false;
};
