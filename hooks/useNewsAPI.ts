import { useState, useEffect, useCallback } from 'react';
import { Category, type Article } from '@/types/article';
import { getNews, type NewsFilters } from '@/lib/services/newsService';

interface UseNewsAPIOptions {
  searchQuery?: string;
  newsPerLoad?: number;
}

interface UseNewsAPIReturn {
  news: Article[];
  displayedNews: Article[];
  categories: Category[];
  hasMore: boolean;
  loadMore: () => void;
  resetPagination: () => void;
  totalNews: number;
  displayedCount: number;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useNewsAPI = ({ 
  searchQuery = '', 
  newsPerLoad = 9 
}: UseNewsAPIOptions = {}): UseNewsAPIReturn => {
  const [news, setNews] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [displayedCount, setDisplayedCount] = useState(newsPerLoad);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalNews, setTotalNews] = useState(0);

  // Fetch news from API
  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const filters: NewsFilters = {
        limit: 12,
      };

      // Add search filter
      if (searchQuery.trim()) {
        filters.search = searchQuery.trim();
      }
      
      const response = await getNews(filters);
      const fetchedNews = response.data;

      setNews(fetchedNews);
      setTotalNews(fetchedNews.length);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to load news');
      setNews([]);
      setTotalNews(0);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  // Reset pagination when filters change
  const resetPagination = useCallback(() => {
    setDisplayedCount(newsPerLoad);
  }, [newsPerLoad]);

  // Load more news
  const loadMore = useCallback(() => {
    setDisplayedCount(prev => Math.min(prev + newsPerLoad, news.length));
  }, [newsPerLoad, news.length]);

  // Refetch news
  const refetch = useCallback(() => {
    fetchNews();
  }, [fetchNews]);

  // Get displayed news
  const displayedNews = news.slice(0, displayedCount);
  const hasMore = displayedCount < news.length;

  // Fetch news when filters change
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // Reset pagination when filters change
  useEffect(() => {
    resetPagination();
  }, [searchQuery, resetPagination]);

  return {
    news,
    displayedNews,
    categories,
    hasMore,
    loadMore,
    resetPagination,
    totalNews,
    displayedCount: displayedNews.length,
    loading,
    error,
    refetch
  };
};
