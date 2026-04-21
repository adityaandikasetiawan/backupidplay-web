/**
 * Image service for handling CMS media URLs
 * Provides consistent image URL resolution across all components
 */
import { Media } from '@/types/article';

const normalizeBaseUrl = (raw: string): string => {
  const value = raw.trim();
  if (!value) return '';
  try {
    return new URL(value).origin;
  } catch {
    const withProtocol = value.startsWith('//') ? `https:${value}` : `https://${value}`;
    try {
      return new URL(withProtocol).origin;
    } catch {
      return value.replace(/\/+$/, '');
    }
  }
};

const joinUrl = (base: string, path: string): string => {
  if (!base) return path;
  const normalizedBase = base.replace(/\/+$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
};

// Helper to get full URL with CMS prefix
const getFullImageUrl = (url: string): string => {
  if (!url) return '';
  if (url.startsWith('http')) {
    try {
      const parsedUrl = new URL(url);
      const cmsPublicBaseUrl = process.env.NEXT_PUBLIC_CMS_URL || 'https://idplay.co.id';
      const cmsHostname = new URL(cmsPublicBaseUrl).hostname;
      const knownCmsHostnames = new Set([
        cmsHostname,
        'idplay.co.id',
        'www.idplay.co.id',
        'dev.idplay.co.id',
        'cms.idplay.co.id',
        'localhost',
        '127.0.0.1',
      ]);

      if (parsedUrl.pathname.startsWith('/uploads') && knownCmsHostnames.has(parsedUrl.hostname)) {
        return `/media${parsedUrl.pathname}${parsedUrl.search}`;
      }
    } catch {
      return url;
    }
    return url;
  }
  if (url.startsWith('/imgs') || url.startsWith('/package')) return url;
  if (url.startsWith('/uploads')) return `/media${url}`;
  // Prefix with CMS URL for relative paths like /uploads/...
  const cmsPublicBaseUrl = process.env.NEXT_PUBLIC_CMS_URL
    ? normalizeBaseUrl(process.env.NEXT_PUBLIC_CMS_URL)
    : 'https://idplay.co.id';
  return joinUrl(cmsPublicBaseUrl, url);
};

export const resolveImageUrl = (
  imageData?: Media | string | unknown,
  formatPriority: string[] = ['medium', 'large', 'small', 'thumbnail']
): string | null => {
  if (!imageData) return null;

  // Handle string URLs
  if (typeof imageData === 'string') {
    return getFullImageUrl(imageData);
  }

  // Handle media objects
  if (typeof imageData === 'object') {
    const mediaLike = imageData as Partial<Media> & {
      formats?: Record<string, { url?: string }>;
      url?: string;
    };
    // Try formats in priority order
    for (const format of formatPriority) {
      const formatUrl = mediaLike.formats?.[format]?.url;
      if (formatUrl) {
        return getFullImageUrl(formatUrl);
      }
    }

    // Fallback to main url
    if (mediaLike.url) {
      return getFullImageUrl(mediaLike.url);
    }
  }

  return null;
};

/**
 * Resolves thumbnail URL
 */
export const resolveThumbnailUrl = (imageData?: Media | string | unknown): string | null => {
  return resolveImageUrl(imageData, ['large', 'medium', 'small', 'thumbnail']);
};

/**
 * Resolves avatar URL
 */
export const resolveAvatarUrl = (avatarData?: Media | string | unknown): string | null => {
  return resolveImageUrl(avatarData, ['large', 'medium', 'small', 'thumbnail']);
};

/**
 * Resolves hero image URL
 */
export const resolveHeroImageUrl = (imageData?: Media | string | unknown): string | null => {
  return resolveImageUrl(imageData, ['large', 'medium', 'small', 'thumbnail']);
};

/**
 * Get media alt text with fallbacks
 */
export const getMediaAltText = (mediaData: Media | unknown, fallback: string = ''): string => {
  if (!mediaData) return fallback;

  const record = mediaData as Partial<Record<'alternativeText' | 'caption' | 'name', unknown>>;
  const alt = typeof record.alternativeText === 'string' ? record.alternativeText : undefined;
  const caption = typeof record.caption === 'string' ? record.caption : undefined;
  const name = typeof record.name === 'string' ? record.name : undefined;
  return alt || caption || name || fallback;
};

/**
 * Check if media data is valid
 */
export const isValidMedia = (mediaData: Media | string | unknown): boolean => {
  if (!mediaData) return false;

  if (typeof mediaData === 'string') {
    return mediaData.length > 0;
  }

  if (typeof mediaData === 'object') {
    const record = mediaData as { url?: unknown; formats?: unknown };
    return !!(record.url || record.formats);
  }

  return false;
};
