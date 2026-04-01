import { fetchAPI } from '../cmsService';
import type { Testimonial, TestimonialsResponse } from '@/types/testimoni';
import qs from 'qs';

export interface TestimonialFilters {
  limit?: number;
  page?: number;
}

// Get all testimonials
export const getTestimonials = async (filters: TestimonialFilters = {}): Promise<TestimonialsResponse> => {
  try {
    const queryObject: any = {
      populate: {
        avatar: true
      },
      sort: ['publishedAt:desc']
    };

    if (filters.limit || filters.page) {
      queryObject.pagination = {};
      if (filters.limit) queryObject.pagination.pageSize = filters.limit;
      if (filters.page) queryObject.pagination.page = filters.page;
    }

    const queryString = qs.stringify(queryObject, { encodeValuesOnly: true });
    const response = await fetchAPI(`/testimonials?${queryString}`);
    
    return {
      data: response.data || [],
      meta: response.meta || { pagination: { page: 1, pageSize: 10, pageCount: 1, total: 0 } }
    };
  } catch (error) {    return {
      data: [],
      meta: { pagination: { page: 1, pageSize: 10, pageCount: 1, total: 0 } }
    };
  }
};

// Get single testimonial by ID
export const getTestimonialById = async (id: string): Promise<Testimonial | null> => {
  try {
    const queryObject = {
      populate: {
        avatar: true
      }
    };

    const queryString = qs.stringify(queryObject, { encodeValuesOnly: true });
    const response = await fetchAPI(`/testimonials/${id}?${queryString}`);
    
    return response.data || null;
  } catch (error) {    return null;
  }
};