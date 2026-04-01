export type ContentType = 'article' | 'news';

/**
 * Simplified content type detection - we now explicitly pass contentType in all pages
 * @param contentType - The content type, defaults to 'article'
 * @returns ContentType - 'article' or 'news'
 */
export function getContentType(contentType?: ContentType): ContentType {
  return contentType ?? 'article';
}

/**
 * Get content-specific text based on content type
 */
export function getContentText(contentType: ContentType) {
  return {
    shareTitle: contentType === 'news' ? 'Bagikan berita ini' : 'Bagikan artikel ini',
    relatedTitle: contentType === 'news' ? 'Related News' : 'Related Articles',
    relatedDescription: contentType === 'news' 
      ? 'Explore the following related news.' 
      : 'Explore the following related articles.',
    linkPrefix: contentType === 'news' ? '/news/' : '/article/',
    badgeText: contentType === 'news' ? 'Breaking News' : 'Umum'
  };
}
