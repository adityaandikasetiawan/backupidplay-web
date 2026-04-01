import { fetchAPI } from '@/lib/cmsService';
import { resolveAvatarUrl } from './imageService';
import { Author, Media } from '../../types/article';
import qs from 'qs';

export interface AuthorResponse {
  data: Author[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Get all authors
export const getAuthors = async (params?: {
  page?: number;
  pageSize?: number;
  sort?: string;
}): Promise<AuthorResponse> => {
  try {
    const queryObject: any = {
      populate: ['avatar'],
      sort: [params?.sort || 'name:asc'],
      pagination: {
        page: params?.page || 1,
        pageSize: params?.pageSize || 25,
      }
    };

    const queryString = qs.stringify(queryObject, { encodeValuesOnly: true });
    const response = await fetchAPI(`/users?${queryString}`);
    
    return {
      data: response.data || [],
      meta: response.meta || {
        pagination: { page: 1, pageSize: 25, pageCount: 1, total: 0 }
      }
    };
  } catch (error) {
    console.error('Error fetching authors:', error);
    return {
      data: [],
      meta: {
        pagination: { page: 1, pageSize: 25, pageCount: 1, total: 0 }
      }
    };
  }
};

// Get author by ID
export const getAuthorById = async (id: number): Promise<Author | null> => {
  try {
    const queryObject = {
      populate: ['avatar']
    };

    const queryString = qs.stringify(queryObject, { encodeValuesOnly: true });
    const response = await fetchAPI(`/users/${id}?${queryString}`);
    
    return response.data || null;
  } catch (error) {
    console.error(`Error fetching author with ID ${id}:`, error);
    return null;
  }
};

// Get author by document ID
export const getAuthorByDocumentId = async (documentId: string): Promise<Author | null> => {
  try {
    const queryObject = {
      populate: ['avatar'],
      filters: {
        documentId: { $eq: documentId }
      }
    };

    const queryString = qs.stringify(queryObject, { encodeValuesOnly: true });
    const response = await fetchAPI(`/users?${queryString}`);
    
    const authors = response.data || [];
    return authors.length > 0 ? authors[0] : null;
  } catch (error) {
    console.error(`Error fetching author with document ID ${documentId}:`, error);
    return null;
  }
};

// Get authors by name (search)
export const searchAuthors = async (searchTerm: string): Promise<Author[]> => {
  try {
    const queryObject = {
      populate: ['avatar'],
      filters: {
        $or: [
          { name: { $containsi: searchTerm } },
          { description: { $containsi: searchTerm } },
          { interest: { $containsi: searchTerm } }
        ]
      },
      sort: ['name:asc']
    };

    const queryString = qs.stringify(queryObject, { encodeValuesOnly: true });
    const response = await fetchAPI(`/users?${queryString}`);
    
    return response.data || [];
  } catch (error) {
    console.error(`Error searching authors with term "${searchTerm}":`, error);
    return [];
  }
};

// Helper function to get author avatar URL
export const getAuthorAvatarUrl = (author: Author | null | undefined): string => {
  if (!author || !author.avatar) return '';
  
  // Use centralized image service
  return resolveAvatarUrl(author.avatar) || '';
};

// Helper function to get author display name
export const getAuthorDisplayName = (author: Author | null | undefined): string => {
  if (!author) return 'Tim IDPlay';
  return author.name || 'Tim IDPlay';
};

// Helper function to get author interest  
export const getAuthorInterest = (author: Author | null | undefined): string => {
  if (!author) return '';
  return author.interest || '';
};

// Helper function to get author description
export const getAuthorDescription = (author: Author | null | undefined): string => {
  if (!author) return '';
  return author.description || '';
};

// Get featured authors
export const getFeaturedAuthors = async (limit: number = 6): Promise<Author[]> => {
  try {
    const queryObject = {
      populate: ['avatar', 'articles'],
      filters: {
        articles: { $notNull: true }
      },
      sort: ['articles.publishedAt:desc'],
      pagination: { pageSize: limit }
    };

    const queryString = qs.stringify(queryObject, { encodeValuesOnly: true });
    const response = await fetchAPI(`/users?${queryString}`);
    
    return response.data || [];
  } catch (error) {
    console.error('Error fetching featured authors:', error);
    return [];
  }
};
