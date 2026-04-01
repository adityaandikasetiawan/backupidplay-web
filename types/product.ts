import { Media } from './article';

export interface ProductCategory {
  id: number;
  documentId: string;
  name: string;
  terms: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Benefit {
  id: number;
  documentId: string;
  name: string;
  type: 'umum' | 'ott';
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Regional {
  id: number;
  documentId: string;
  region: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Product {
  id: number;
  documentId: string;
  productCode: string;
  productName: string;
  finalSpeedInMbps: number;
  originalSpeedInMbps?: number | null;
  originalPrice: number;
  promoPrice?: number | null;
  billingCycle: 'Bulanan' | 'Tahunan' | 'Promo';
  priceHint: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  thumbnail?: Media;
  productCategories: ProductCategory[];
  benefits: Benefit[];
  regionals: Regional[];
}

export interface ProductsResponse {
  data: Product[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface ProductFilters {
  region?: string;
  category?: string;
  speedRange?: {
    min?: number;
    max?: number;
  };
  billingCycle?: 'Bulanan' | 'Tahunan' | 'Promo';
  limit?: number;
  page?: number;
}

export interface UseProductsProps {
  filters?: ProductFilters;
  autoFetch?: boolean;
}

export interface UseProductsReturn {
  products: Product[];
  displayedProducts: Product[];
  regions: Regional[];
  categories: ProductCategory[];
  loading: boolean;
  error: string | null;
  totalProducts: number;
  refetch: () => void;
  updateFilters: (newFilters: ProductFilters) => void;
}