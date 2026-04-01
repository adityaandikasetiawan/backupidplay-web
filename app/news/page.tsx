'use client';

import React, { useState } from 'react';
import { useNewsAPI } from '@/hooks/useNewsAPI';
import { getBreakingNews } from '@/lib/services/newsService';
import { useEffect } from 'react';
import { type Article } from '@/types/article';
import NewsHeader from './_components/layout/NewsHeader';
import FeaturedNewsCarousel from './_components/cards/FeaturedNewsCarousel';
import NewsGrid from './_components/layout/NewsGrid';
import LoadingSkeleton from '../article/_components/detail/LoadingSkeleton'; // Reuse from article
import LoadMoreButton from '../article/_components/navigation/LoadMoreButton'; // Reuse from article
import NewsEmptyState from './_components/layout/NewsEmptyState';

const News: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [featuredNews, setFeaturedNews] = useState<Article[]>([]);
  const [hasInitialLoad, setHasInitialLoad] = useState(false);
  const newsPerLoad = 9;

  const { 
    news: filteredNews,
    displayedNews, 
    hasMore, 
    loadMore, 
    resetPagination,
    totalNews,
    displayedCount,
    loading: apiLoading,
    error,
    refetch
  } = useNewsAPI({
    searchQuery,
    newsPerLoad
  });

  useEffect(() => {
    if (!apiLoading && filteredNews.length >= 0) {
      setHasInitialLoad(true);
    }
  }, [apiLoading, filteredNews.length]);

  useEffect(() => {
    const fetchFeaturedNews = async () => {
      try {
        const breaking = await getBreakingNews(3); // Get 3 featured news
        setFeaturedNews(breaking);
      } catch (error) {
        console.error('Error fetching featured news:', error);
      }
    };

    fetchFeaturedNews();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    resetPagination();
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      loadMore();
      setIsLoading(false);
    }, 500);
  };

  const isAppLoading = isLoading || apiLoading;

  return (
    <div className="min-h-screen font-sans bg-white mb-24">
      <NewsHeader
        searchQuery={searchQuery}
        filteredNewsCount={filteredNews.length}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearch}
        isLoading={isAppLoading}
      />

      <main>
        <section className="">
          <div className="container mx-auto px-4">
            {featuredNews.length > 0 && (
              <FeaturedNewsCarousel articles={featuredNews} />
            )}
            
            {!hasInitialLoad || (isAppLoading && displayedCount === 0) ? (
              <div className="space-y-16">
                <LoadingSkeleton />
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <div className="text-red-600 mb-4">Error: {error}</div>
                <button
                  onClick={refetch}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Try Again
                </button>
              </div>
            ) : filteredNews.length > 0 ? (
              <>
                <div className="space-y-16">
                  {/* show all news */}
                  <NewsGrid
                    news={displayedNews}
                    showBreaking={true}
                  />
                </div>

                <LoadMoreButton
                  onLoadMore={handleLoadMore}
                  isLoading={isAppLoading}
                  hasMore={hasMore}
                  totalArticles={totalNews}
                  displayedArticles={displayedCount}
                />
              </>
            ) : (
              <NewsEmptyState
                searchQuery={searchQuery}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default News;
