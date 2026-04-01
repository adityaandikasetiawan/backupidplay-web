import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { type Article } from '@/types/article';
import { limitDescription, formatDate } from '@/lib/articleUtils';
import { resolveThumbnailUrl } from '@/lib/services/imageService';
import { useArticleAuthor } from '@/hooks/useAuthor';

interface NewsCardProps {
  news: Article;
  showBreaking?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, showBreaking = true }) => {
  const imageSrc = resolveThumbnailUrl((news as Article).thumbnail);
  const publishedDate = (news as any).publishedAt ?? (news as any).publish_date ?? (news as any).published_at ?? (news as any).createdAt ?? null;
  const author = useArticleAuthor(news);

  return (
    <article className="bg-white rounded-xl overflow-hidden group transform flex flex-col">

      {/* Thumbnail */}
      <div className="relative overflow-hidden flex items-center justify-center" style={{ minHeight: 180 }}>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={news.title}
            width={400}
            height={250}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#e5e7eb"/><path d="M7 17l3-4 2 3 3-4 4 6H5l2-3z" fill="#bdbdbd"/><circle cx="8.5" cy="8.5" r="2.5" fill="#bdbdbd"/></svg>
          </div>
        )}
        
        {/* Breaking News Badge */}
        {showBreaking && (news as any).breaking && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
            Breaking
          </div>
        )}
      </div>
      
      <div className="pt-4 pb-6 flex flex-col flex-1">

        {/* Title */}
        <Link href={`/news/${news.slug}`}>
          <h3 className="text-2xl font-bold text-orange-500 mb-2 hover:underline line-clamp-2">
            {news.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-700 mb-4 text-sm leading-relaxed line-clamp-3">
          {limitDescription(news.description, 120)}
        </p>

        {/* Date and Source */}
        <div className="flex items-center gap-3 mt-auto">
          <div className="flex flex-col">
            <span className="font-medium text-gray-900 text-sm leading-none">{author.name}</span>
            <div className="flex items-center text-gray-500 mt-1">
              <span className="text-sm">{formatDate(publishedDate)}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
