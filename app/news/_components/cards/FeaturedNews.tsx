'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { type Article } from '@/types/article';
import { resolveHeroImageUrl } from '@/lib/services/imageService';
import { calculateReadTime, limitDescription, formatDate } from '@/lib/articleUtils';
import { useArticleAuthor } from '@/hooks/useAuthor';
// import { Dot } from 'lucide-react';

interface FeaturedNewsProps {
  news: Article;
}

const FeaturedNews: React.FC<FeaturedNewsProps> = ({ news }) => {
  const imageSrc = resolveHeroImageUrl(news.thumbnail);
  const author = useArticleAuthor(news);
  const published = (news as any).publishedAt ?? (news as any).publish_date ?? null;
  const readTime = calculateReadTime((news as any).content ?? news.description ?? '');

  return (
    <div className="mb-16">
      <div className="bg-white rounded-2xl overflow-hidden">
        <div className="md:flex">

          {/* Thumbnail */}
          <div className="md:w-1/2">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={news.title}
                width={600}
                height={400}
                className="w-full h-64 md:h-full object-cover"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200" />
            )}
          </div>
          
          {/* <div className="md:w-1/2 p-10 flex flex-col justify-center"> */}
          <div className="md:w-1/2 py-4 md:px-10 md:py-10 flex flex-col justify-center">
            {news.featured && (
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm md:text-md font-bold uppercase">
                  Breaking News
                </span>
              </div>
            )}

            {/* Title */}
            <Link href={`/news/${news.slug}`}>
              <h3 className="text-2xl md:text-4xl font-bold text-orange-500 mb-2 hover:underline line-clamp-2">
                {news.title}
              </h3>
            </Link>

            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed text-base md:text-xl">
              {limitDescription(news.description, 150)}
            </p>

            {/* Author, Date, Reading Time */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {author.avatar ? (
                  <div className="relative w-[45px] h-[45px] rounded-full overflow-hidden bg-gray-100">
                    <Image
                      src={author.avatar}
                      alt={author.name}
                      width={80}
                      height={80}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-[45px] h-[45px] rounded-full bg-gray-200 flex items-center justify-center">
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="#bdbdbd"/><rect x="6" y="16" width="12" height="4" rx="2" fill="#bdbdbd"/></svg>
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900 text-md leading-none">{author.name}</span>
                  <div className="flex items-center gap-2 text-gray-500 mt-1">
                    <span className="text-md">{formatDate(published)}</span>
                    {/* <span className="flex items-center align-middle">
                      <Dot size={30} className="mx-1 text-black" />
                    </span> */}
                    {/* <span className="text-sm">{readTime}</span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedNews;
