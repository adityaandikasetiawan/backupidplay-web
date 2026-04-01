import { useState, useEffect, useCallback } from 'react';
import { getTestimonials, type TestimonialFilters } from '@/lib/services/testimoniService';
import { type Testimonial } from '@/types/testimoni';

interface UseTestimonialsProps {
  limit?: number;
  autoFetch?: boolean;
}

interface UseTestimonialsReturn {
  testimonials: Testimonial[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  totalTestimonials: number;
}

export const useTestimonials = ({
  limit,
  autoFetch = true
  }: UseTestimonialsProps = {}): UseTestimonialsReturn => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalTestimonials, setTotalTestimonials] = useState<number>(0);

    const fetchTestimonials = useCallback(async () => {
      setLoading(true);
      setError(null);

      try {
        const filters: TestimonialFilters = {};
        if (limit !== undefined) filters.limit = limit;
        const result = await getTestimonials(filters);

        setTestimonials(result.data);
        setTotalTestimonials(result.meta.pagination.total);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch testimonials';
        setError(errorMessage);
        console.error('Error fetching testimonials:', err);
      } finally {
        setLoading(false);
      }
    }, [limit]);

  const refetch = useCallback(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  useEffect(() => {
    if (autoFetch) {
      fetchTestimonials();
    }
  }, [fetchTestimonials, autoFetch]);

  return {
    testimonials,
    loading,
    error,
    refetch,
    totalTestimonials
  };
};