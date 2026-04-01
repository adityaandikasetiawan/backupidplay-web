import { fetchAPI } from '../cmsService';
import type { Article } from '@/types/article';
import qs from 'qs';

export interface ArticleFilters {
  category?: string;
  featured?: boolean;
  search?: string;
  limit?: number;
  page?: number;
  isNational?: boolean;
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface ArticlesResponse {
  data: Article[];
  meta: {
    pagination: PaginationInfo;
  };
}

// Get all articles with optional filters
export const getArticles = async (filters: ArticleFilters = {}): Promise<ArticlesResponse> => {
  try {
    const queryObject: any = {
      populate: {
        author: {
          populate: ['avatar']
        },
        categories: true,
        thumbnail: true
      },
      sort: ['publishedAt:desc']
    };

    // Add pagination
    if (filters.limit || filters.page) {
      queryObject.pagination = {};
      if (filters.limit) queryObject.pagination.pageSize = filters.limit;
      if (filters.page) queryObject.pagination.page = filters.page;
    }

    // Add filters
    if (filters.category || filters.featured !== undefined || filters.search || filters.isNational !== undefined) {
      queryObject.filters = {};

      if (filters.isNational !== undefined) {
        queryObject.filters.is_national = { $eq: filters.isNational };
      }

      if (filters.category) {
        queryObject.filters.categories = {
          slug: { $eq: filters.category }
        };
      }

      if (filters.featured !== undefined) {
        queryObject.filters.featured = { $eq: filters.featured };
      }

      if (filters.search) {
        queryObject.filters.$or = [
          { title: { $containsi: filters.search } },
          { description: { $containsi: filters.search } },
          { content: { $containsi: filters.search } }
        ];
      }
    }

    const queryString = qs.stringify(queryObject, { encodeValuesOnly: true });
    const response = await fetchAPI(`/articles?${queryString}`);

    return {
      data: response.data || [],
      meta: response.meta || { pagination: { page: 1, pageSize: 10, pageCount: 1, total: 0 } }
    };
  } catch (error) {
    console.error('Error fetching articles:', error);
    // Return empty result on error
    return {
      data: [],
      meta: { pagination: { page: 1, pageSize: 10, pageCount: 1, total: 0 } }
    };
  }
};

// Get single article by slug
export const getArticleBySlug = async (slug: string): Promise<Article | null> => {
  try {
    const queryObject = {
      populate: {
        author: {
          populate: ['avatar']
        },
        categories: true,
        thumbnail: true
      },
      filters: {
        slug: { $eq: slug }
      }
    };

    const queryString = qs.stringify(queryObject, { encodeValuesOnly: true });
    const response = await fetchAPI(`/articles?${queryString}`);

    if (response.data && response.data.length > 0) {
      return response.data[0];
    }

    return null;
  } catch (error) {
    console.error('Error fetching article by slug:', error);
    return null;
  }
};

// Get featured articles
export const getFeaturedArticles = async (limit: number = 5): Promise<Article[]> => {
  try {
    const response = await getArticles({ featured: true, limit, isNational: true });
    return response.data;
  } catch (error) {
    console.error('Error fetching featured articles:', error);
    return [];
  }
};

// Get articles by category
export const getArticlesByCategory = async (categorySlug: string, limit?: number): Promise<Article[]> => {
  try {
    const response = await getArticles({ category: categorySlug, limit, isNational: true });
    return response.data;
  } catch (error) {
    console.error('Error fetching articles by category:', error);
    return [];
  }
};

// Get related articles (same category, excluding current article)
export const getRelatedArticles = async (categoryId: number, excludeId: number, limit: number = 3): Promise<Article[]> => {
  try {
    const queryObject = {
      populate: {
        author: {
          populate: ['avatar']
        },
        categories: true,
        thumbnail: true
      },
      filters: {
        categories: {
          id: { $eq: categoryId }
        },
        id: { $ne: excludeId }
      },
      pagination: {
        pageSize: limit
      },
      sort: ['publishedAt:desc']
    };

    const queryString = qs.stringify(queryObject, { encodeValuesOnly: true });
    const response = await fetchAPI(`/articles?${queryString}`);

    return response.data || [];
  } catch (error) {
    console.error('Error fetching related articles:', error);
    return [];
  }
};
