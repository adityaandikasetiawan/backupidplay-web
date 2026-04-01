/**
 * Custom hooks for using author services in React components
 */

import { useState, useEffect } from 'react';
import { Author } from '@/types/article';
import { 
  getAuthors, 
  getAuthorById,
  searchAuthors,
  getAuthorAvatarUrl,
  getAuthorDisplayName,
  getAuthorInterest,
  getAuthorDescription
} from '@/lib/services/authorService';

// Hook to get all authors with pagination
export const useAuthors = (page: number = 1, pageSize: number = 20) => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await getAuthors({ page, pageSize });
        setAuthors(response.data);
        setTotalCount(response.meta.pagination.total);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch authors');
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, [page, pageSize]);

  return {
    authors,
    loading,
    error,
    totalCount,
    hasMore: authors.length < totalCount
  };
};

// Hook to get single author
export const useAuthor = (authorId: number | null) => {
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authorId) {
      setAuthor(null);
      return;
    }

    const fetchAuthor = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const fetchedAuthor = await getAuthorById(authorId);
        setAuthor(fetchedAuthor);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch author');
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [authorId]);

  return {
    author,
    loading,
    error
  };
};

// Hook to search authors
export const useAuthorSearch = () => {
  const [results, setResults] = useState<Author[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const searchResults = await searchAuthors(searchTerm);
      setResults(searchResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search authors');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setResults([]);
    setError(null);
  };

  return {
    results,
    loading,
    error,
    search,
    clearResults
  };
};

// Hook untuk extract author info dari article data
export const useArticleAuthor = (article: any) => {
  // For news, author is directly in 'author' field, for articles it might be in 'user' or 'author'
  const authorData = article?.author ?? article?.user;
  
  return {
    id: authorData?.id || null,
    name: getAuthorDisplayName(authorData),
    avatar: getAuthorAvatarUrl(authorData),
    interest: getAuthorInterest(authorData),
    description: getAuthorDescription(authorData),
    email: authorData?.email || '',
    hasAvatar: !!getAuthorAvatarUrl(authorData),
    rawData: authorData
  };
};
