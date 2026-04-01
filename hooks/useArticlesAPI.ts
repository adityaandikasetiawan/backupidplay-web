import { useState, useEffect, useCallback } from 'react';
import { getArticles, type ArticleFilters } from '@/lib/services/articleService';
import { getCategories } from '@/lib/services/categoryService';
import { type Article, type Category } from '@/types/article';

interface UseArticlesAPIProps {
  searchQuery: string;
  selectedCategory: number | null;
  articlesPerLoad?: number;
  isNational?: boolean;
}

interface UseArticlesAPIReturn {
  articles: Article[];
  displayedArticles: Article[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  resetPagination: () => void;
  totalArticles: number;
  refetch: () => void;
  articlesByCategory: { [key: number]: Article[] };
}

export const useArticlesAPI = ({
  searchQuery,
  selectedCategory,
  articlesPerLoad = 9,
  isNational
}: UseArticlesAPIProps): UseArticlesAPIReturn => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalArticles, setTotalArticles] = useState(0);
  const [hasMorePages, setHasMorePages] = useState(false);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  }, []);

  // Fetch articles from API
  const fetchArticles = useCallback(async (page: number = 1, append: boolean = false) => {
    setLoading(true);
    setError(null);

    try {
      const filters: ArticleFilters = {
        limit: articlesPerLoad,
        page: page,
        isNational: isNational
      };

      // Add search filter
      if (searchQuery.trim()) {
        filters.search = searchQuery.trim();
      }

      // For category filtering, find the category slug
      if (selectedCategory && categories.length > 0) {
        const category = categories.find(cat => cat.id === selectedCategory);
        if (category && (category as any).slug) {
          filters.category = (category as any).slug;
        }
      }

      const response = await getArticles(filters);
      let fetchedArticles = response.data;

      if (selectedCategory && !filters.category) {
        fetchedArticles = fetchedArticles.filter((article: Article) => {
          const categories = article.categories;
          if (categories && Array.isArray(categories)) {
            return categories.some(cat => cat.id === selectedCategory);
          }
          return false;
        });
      }

      // Update state
      if (append) {
        setArticles(prev => [...prev, ...fetchedArticles]);
      } else {
        setArticles(fetchedArticles);
        setCurrentPage(1);
      }

      // Update pagination info
      if (response.meta?.pagination) {
        setTotalArticles(response.meta.pagination.total);
        setHasMorePages(page < response.meta.pagination.pageCount);
      } else {
        setTotalArticles(fetchedArticles.length);
        setHasMorePages(false);
      }
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError('Failed to load articles');
      if (!append) {
        setArticles([]);
        setTotalArticles(0);
        setHasMorePages(false);
      }
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCategory, categories, articlesPerLoad, isNational]);

  // Reset pagination
  const resetPagination = useCallback(() => {
    setCurrentPage(1);
    setHasMorePages(false);
  }, []);

  // Load more articles
  const loadMore = useCallback(() => {
    if (hasMorePages && !loading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchArticles(nextPage, true);
    }
  }, [currentPage, hasMorePages, loading, fetchArticles]);

  // Refetch articles
  const refetch = useCallback(() => {
    fetchArticles(1, false);
  }, [fetchArticles]);

  // Group articles by category
  const articlesByCategory = articles.reduce((acc: { [key: number]: Article[] }, article) => {
    if (article.categories && Array.isArray(article.categories)) {
      article.categories.forEach(category => {
        if (!acc[category.id]) {
          acc[category.id] = [];
        }
        acc[category.id].push(article);
      });
    }
    return acc;
  }, {});

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Fetch articles when categories are loaded or filters change
  useEffect(() => {
    if (categories.length > 0 || !selectedCategory) {
      setCurrentPage(1);
      setHasMorePages(false);
      fetchArticles(1, false);
    }
  }, [categories.length, selectedCategory, searchQuery, fetchArticles]);

  const displayedArticles = articles;
  const hasMore = hasMorePages && !loading;

  return {
    articles,
    displayedArticles,
    categories,
    loading,
    error,
    hasMore,
    loadMore,
    resetPagination,
    totalArticles,
    refetch,
    articlesByCategory
  };
};
