import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { type Article } from '@/types/article';
import { formatDate, calculateReadTime } from '@/lib/articleUtils';
import { resolveThumbnailUrl } from '@/lib/services/imageService';
import { getContentType, getContentText, type ContentType } from '@/lib/contentTypeUtils';
import { Dot } from 'lucide-react';

interface RelatedArticlesProps {
  currentArticle: Article;
  relatedArticles: Article[];
  contentType?: ContentType;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ currentArticle, relatedArticles, contentType }) => {
  if (relatedArticles.length === 0) {
    return null;
  }

  const detectedType = getContentType(contentType);
  
  const contentText = getContentText(detectedType);

  return (
    <div className="max-w-4xl mx-auto">
      <section className="mt-4 pt-12 border-t border-gray-200">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">{contentText.relatedTitle}</h2>
        <p className="text-gray-600 mb-8">{contentText.relatedDescription}</p>

        <div className="grid md:grid-cols-3 gap-8">
          {relatedArticles.map((article: Article) => {

            return (
              <Link
                key={article.id}
                href={`${contentText.linkPrefix}${article.slug || article.id}`}
                className="group block"
              >
              <article className="h-full">

                {/* Thumbnail */}
                <div className="relative overflow-hidden rounded-lg mb-4">
                  {(() => {
                    const imageSource = (article as any).thumbnail ?? (article as any).image;
                    const img = resolveThumbnailUrl(imageSource);

                    return img ? (
                      <Image
                        src={img}
                        alt={article.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24">
                          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
                          <path d="m3 21 6-6 4 4 6-6" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </div>
                    );
                  })()}
                </div>

                {/* Content */}
                <div className="space-y-3">

                  {/* Category */}
                  {detectedType === 'article' && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {article.categories && article.categories.length > 0 ? (
                        <>
                          {article.categories.slice(0, 2).map((category, index) => (
                            <span 
                              key={category.id} 
                              className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full"
                            >
                              {category.name}
                            </span>
                          ))}
                          {article.categories.length > 2 && (
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              +{article.categories.length - 2}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                          {contentText.badgeText}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-200 line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                    {article.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center text-xs text-gray-500 pt-2">
                    <span>{formatDate((article as any).publishedAt ?? (article as any).publish_date)}</span>
                    {detectedType === 'article' && (
                      <>
                        <Dot size={20} className="mx-1" />
                        <span>{calculateReadTime((article as any).content ?? article.description ?? '')}</span>
                      </>
                    )}
                  </div>
                </div>
              </article>
            </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default RelatedArticles;
