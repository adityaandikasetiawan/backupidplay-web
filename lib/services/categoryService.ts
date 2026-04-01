import { fetchAPI } from '../cmsService';
import type { Category } from '@/types/article';
import qs from 'qs';

// Get all categories
export const getCategories = async (): Promise<Category[]> => {
  try {
    const queryObject = {
      sort: ['name:asc']
    };

    const queryString = qs.stringify(queryObject, { encodeValuesOnly: true });
    const response = await fetchAPI(`/categories?${queryString}`);
    
    return response.data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Get single category by slug
export const getCategoryBySlug = async (slug: string): Promise<Category | null> => {
  try {
    const queryObject = {
      filters: {
        slug: { $eq: slug }
      }
    };

    const queryString = qs.stringify(queryObject, { encodeValuesOnly: true });
    const response = await fetchAPI(`/categories?${queryString}`);
    
    if (response.data && response.data.length > 0) {
      return response.data[0];
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching category by slug:', error);
    return null;
  }
};
