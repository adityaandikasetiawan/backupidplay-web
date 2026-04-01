import { Media } from './article';

export interface Testimonial {
  id: number;
  documentId: string;
  name: string;
  quote: string;
  job: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  avatar?: Media;
}

export interface TestimonialsResponse {
  data: Testimonial[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}