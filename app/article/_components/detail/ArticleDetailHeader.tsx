import React from 'react';
import Image from 'next/image';
import { Dot } from 'lucide-react';
import { type Article } from '@/types/article';
import { formatDate, calculateReadTime } from '@/lib/articleUtils';
import { getAuthorDisplayName, getAuthorAvatarUrl, getAuthorInterest } from '@/lib/services/authorService';
import { getContentType, getContentText } from '@/lib/contentTypeUtils';

interface ArticleDetailHeaderProps {
  article: Article;
  contentType?: 'article' | 'news';
}

const ArticleDetailHeader: React.FC<ArticleDetailHeaderProps> = ({ article, contentType }) => {
  const authorData = (article as any).author ?? (article as any).user;
  const avatar = getAuthorAvatarUrl(authorData);
  const authorName = getAuthorDisplayName(authorData);
  const authorInterest = getAuthorInterest(authorData);
  const published = (article as any).publishedAt ?? (article as any).publish_date ?? null;
  const content = (article as any).content ?? article.description ?? '';
  const readTime = calculateReadTime(content);
  
  const detectedType = getContentType(contentType);
  
  const categories = article.categories || [];
  const showCategories = detectedType === 'article' && categories.length > 0;

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-12">
        {/* Category Badges - Only show for articles */}
        {showCategories && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center px-3 py-1 rounded-full text-md font-medium bg-orange-200 text-green-700 border border-orange-200"
                >
                  {category.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {article.title}
        </h1>

        {/* Description/Subtitle */}
        {article.description && (
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed font-light">
            {article.description}
          </p>
        )}

        {/* Author & Meta info */}
        <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-4">
            {avatar ? (
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                <Image
                  src={avatar}
                  alt={authorName}
                  width={80}
                  height={80}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="8" r="4" fill="#9ca3af"/>
                  <rect x="6" y="16" width="12" height="4" rx="2" fill="#9ca3af"/>
                </svg>
              </div>
            )}
            <div>
              <div className="font-semibold text-gray-900">{authorName}</div>
              <div className="flex flex-col sm:flex-row sm:items-center text-sm sm:text-sm text-gray-600 gap-1 sm:gap-2 sm:text-left">
                {/* Mobile: satu per baris tanpa dot */}
                <span className="sm:hidden mt-1">{authorInterest}</span>
                {/* Mobile: published dot readtime satu baris */}
                {published && detectedType === 'article' && (
                  <span className="sm:hidden flex items-center justify-center">
                    <span>{formatDate(published)}</span>
                    <Dot size={16} className="mx-1" />
                    <span>{readTime}</span>
                  </span>
                )}
                {/* Jika hanya published (bukan article), tampilkan sendiri */}
                {published && detectedType !== 'article' && (
                  <span className="sm:hidden mt-1">{formatDate(published)}</span>
                )}
                {/* Desktop: inline dengan dot */}
                <div className="hidden sm:flex items-center gap-2">
                  <span>{authorInterest}</span>
                  {published && <><Dot size={16} className="mx-1" /><span>{formatDate(published)}</span></>}
                  {detectedType === 'article' && <><Dot size={16} className="mx-1" /><span>{readTime}</span></>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default ArticleDetailHeader;
