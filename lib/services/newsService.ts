import { fetchAPI } from '../cmsService';
import type { Article } from '@/types/article';
import qs from 'qs';

export interface NewsFilters {
  category?: string;
  search?: string;
  limit?: number;
  page?: number;
  breaking?: boolean;
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface NewsResponse {
  data: Article[];
  meta: {
    pagination: PaginationInfo;
  };
}

// Get all news with optional filters (no category filtering)
export const getNews = async (filters: NewsFilters = {}): Promise<NewsResponse> => {
  try {
    const queryObject: any = {
      populate: {
        author: {
            populate: ['avatar']
        },
        // No category populate for news - keep it null for consistency
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
    if (filters.category !== undefined || filters.search || filters.breaking !== undefined) {
      queryObject.filters = {};
      
      if (filters.category !== undefined) {
        queryObject.filters.category = { $eq: filters.category };
      }
      
      if (filters.search) {
        queryObject.filters.$or = [
          { title: { $containsi: filters.search } },
          { description: { $containsi: filters.search } },
          { content: { $containsi: filters.search } }
        ];
      }

      // Featured news
      if (filters.breaking !== undefined) {
        queryObject.filters.featured = { $eq: filters.breaking };
      }
    }

    const queryString = qs.stringify(queryObject, { encodeValuesOnly: true });
    const response = await fetchAPI(`/press-releases?${queryString}`);
    
    return {
      data: response.data || [],
      meta: response.meta || { pagination: { page: 1, pageSize: 10, pageCount: 1, total: 0 } }
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    return {
      data: [],
      meta: { pagination: { page: 1, pageSize: 10, pageCount: 1, total: 0 } }
    };
  }
};

// Get single news by slug
export const getNewsBySlug = async (slug: string): Promise<Article | null> => {
  try {
    const queryObject = {
      populate: {
        author: {
          populate: ['avatar']
        },
        // No category populate for news
        thumbnail: true
      },
      filters: {
        slug: { $eq: slug }
      }
    };

    const queryString = qs.stringify(queryObject, { encodeValuesOnly: true });
    const response = await fetchAPI(`/press-releases?${queryString}`);
    
    const news = response.data || [];
    return news.length > 0 ? news[0] : null;
  } catch (error) {
    console.error(`Error fetching news with slug ${slug}:`, error);
    return null;
  }
};

// Get breaking news
export const getBreakingNews = async (limit: number = 3): Promise<Article[]> => {
  try {
    const response = await getNews({ breaking: true, limit });
    return response.data;
  } catch (error) {
    console.error('Error fetching breaking news:', error);
    return [];
  }
};

// Get recent news (for related news)
export const getRecentNews = async (excludeId: number, limit: number = 3): Promise<Article[]> => {
  try {
    const queryObject = {
      populate: {
        thumbnail: true
      },
      filters: {
        id: { $ne: excludeId }
      },
      pagination: {
        pageSize: limit
      },
      sort: ['publishedAt:desc']
    };

    const queryString = qs.stringify(queryObject, { encodeValuesOnly: true });
    const response = await fetchAPI(`/press-releases?${queryString}`);
    
    return response.data || [];
  } catch (error) {
    console.error('Error fetching recent news:', error);
    return [];
  }
};
