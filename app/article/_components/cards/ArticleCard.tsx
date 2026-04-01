import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { type Article } from '@/types/article';
import { limitDescription, formatDate, calculateReadTime } from '@/lib/articleUtils';
import { resolveThumbnailUrl } from '@/lib/services/imageService';
import { useArticleAuthor } from '@/hooks/useAuthor';
import { Dot, ArrowDownFromLine, ArrowUpFromLine } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  showCategory?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, showCategory = false }) => {
  const imageSrc = resolveThumbnailUrl((article as Article).thumbnail);
  const author = useArticleAuthor(article);
  const publishedDate = (article as any).publishedAt ?? (article as any).publish_date ?? (article as any).published_at ?? (article as any).createdAt ?? null;
  const readTime = calculateReadTime((article as any).content ?? article.description ?? '');

  const [showAllCategories, setShowAllCategories] = React.useState(false);

  return (
    <Link href={`/article/${article.slug}`} className="block">
      <article className="bg-white rounded-xl overflow-hidden group transform flex flex-col cursor-pointer hover:shadow-lg transition-shadow duration-300">

        {/* Thumbnail */}
        <div className="relative overflow-hidden flex items-center justify-center" style={{ minHeight: 180 }}>
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={article.title}
              width={400}
              height={250}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#e5e7eb" /><path d="M7 17l3-4 2 3 3-4 4 6H5l2-3z" fill="#bdbdbd" /><circle cx="8.5" cy="8.5" r="2.5" fill="#bdbdbd" /></svg>
            </div>
          )}
        </div>
        <div className="pt-4 pb-6 flex flex-col flex-1">

          {/* Category */}
          <div className="flex flex-wrap gap-2 mb-2" onClick={(e) => e.preventDefault()}>
            {article.categories && article.categories.length > 0 ? (
              <>
                {/* Main category */}
                <span
                  key={article.categories[0].id}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-200 text-green-700 border border-orange-200"
                >
                  {article.categories[0].name}
                </span>
                {/* +N more or lebih sedikit button always in same position */}
                {article.categories.length > 1 && !showAllCategories && (
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200 cursor-pointer gap-1"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowAllCategories(true); }}
                    aria-label="Show all categories"
                    title='Tampilkan semua kategori'
                  >
                    +{article.categories.length - 1} more
                  </button>
                )}
                {article.categories.length > 1 && showAllCategories && (
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200 cursor-pointer gap-1"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowAllCategories(false); }}
                    aria-label="Show less categories"
                    title='Sembunyikan kategori'
                  >
                    <ArrowUpFromLine size={14} />
                  </button>
                )}
                {/* Expanded categories */}
                {showAllCategories && (
                  <div className="w-full flex flex-wrap gap-2 mt-2">
                    {article.categories.slice(1).map((category) => (
                      <span
                        key={category.id}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-200 text-green-700 border border-orange-200"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                Umum
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-orange-500 mb-2 group-hover:underline line-clamp-2">
            {article.title}
          </h3>

          {/* Description */}
          <p className="text-gray-700 mb-4 text-sm leading-relaxed line-clamp-3">
            {limitDescription(article.description, 120)}
          </p>

          {/* Author, Date, Reading Time */}
          <div className="flex items-center gap-4 mt-2">
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
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="#bdbdbd" /><rect x="6" y="16" width="12" height="4" rx="2" fill="#bdbdbd" /></svg>
                </div>
              )}
              <div className="flex-col">
                <span className="font-medium text-gray-900 text-sm leading-none">{author.name}</span>
                <div className="flex items-center text-gray-500 ">
                  <span className="text-sm">{formatDate(publishedDate)}</span>
                  <Dot size={30} className="mx-1 text-black" />
                  <span className="text-sm">{readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard;
