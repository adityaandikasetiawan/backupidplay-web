'use client';

import React, { useState } from 'react';
import { useArticlesAPI } from '@/hooks/useArticlesAPI';
import { getFeaturedArticles } from '@/lib/services/articleService';
import { useEffect } from 'react';
import { type Article } from '@/types/article';
import BlogHeader from './_components/layout/BlogHeader';
import FeaturedArticleCarousel from './_components/cards/FeaturedArticleCarousel';
import ArticleGrid from './_components/layout/ArticleGrid';
import LoadingSkeleton from './_components/detail/LoadingSkeleton';
import LoadMoreButton from './_components/navigation/LoadMoreButton';
import EmptyState from './_components/layout/EmptyState';
import CategoryFilter from './_components/filters/CategoryFilter';

const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [hasInitialLoad, setHasInitialLoad] = useState(false);
  const articlesPerLoad = 9;

  const {
    articles: filteredArticles,
    displayedArticles,
    categories,
    articlesByCategory,
    hasMore,
    loadMore,
    resetPagination,
    totalArticles,
    loading: apiLoading,
    error,
    refetch
  } = useArticlesAPI({
    searchQuery,
    selectedCategory,
    articlesPerLoad,
    isNational: true
  });

  useEffect(() => {
    if (!apiLoading && filteredArticles.length >= 0) {
      setHasInitialLoad(true);
    }
  }, [apiLoading, filteredArticles.length]);

  // Fetch featured articles
  useEffect(() => {
    const fetchFeaturedArticles = async () => {
      try {
        const featured = await getFeaturedArticles(); // set berapa featured articles
        setFeaturedArticles(featured);
      } catch (error) {
        console.error('Error fetching featured articles:', error);
      }
    };

    fetchFeaturedArticles();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    resetPagination();
  };

  const handleCategoryFilter = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    resetPagination();
  };

  const handleLoadMore = () => {
    loadMore();
  };

  const isAppLoading = apiLoading;

  return (
    <div className="min-h-screen font-sans bg-white mb-24">
      <BlogHeader
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        filteredArticlesCount={filteredArticles.length}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearch}
        onCategoryChange={handleCategoryFilter}
        isLoading={isAppLoading}
      />

      <main>
        <section className="">
          <div className="container mx-auto px-4">
            {featuredArticles.length > 0 && (
              <FeaturedArticleCarousel articles={featuredArticles} />
            )}

            {/* Category filter */}
            <div className="flex justify-start mb-8">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryFilter}
                categories={categories}
              />
            </div>

            {!hasInitialLoad || (isAppLoading && displayedArticles.length === 0) ? (
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
            ) : filteredArticles.length > 0 ? (
              <>
                <div className="space-y-16">
                  {/* show all articles except featured ones */}
                  <ArticleGrid
                    articles={displayedArticles.filter(
                      (article) => !featuredArticles.some((featured) => featured.id === article.id)
                    )}
                    showCategory={true}
                  />
                </div>

                <LoadMoreButton
                  onLoadMore={handleLoadMore}
                  isLoading={isAppLoading}
                  hasMore={hasMore}
                  totalArticles={totalArticles}
                  displayedArticles={displayedArticles.length}
                />
              </>
            ) : (
              <EmptyState
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Blog;
