import { Product } from '@/types/product';

// export Interface untuk format thumbnail
export interface ThumbnailFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

// export Interface untuk thumbnail/gambar produk
export interface ProductThumbnail {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: ThumbnailFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// export Interface untuk kategori produk
export interface ProductCategory {
  id: number;
  documentId: string;
  name: string;
  terms: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// export Interface untuk benefit produk
export interface ProductBenefit {
  id: number;
  documentId: string;
  name: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// export Interface untuk regional coverage
export interface ProductRegional {
  id: number;
  documentId: string;
  region: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// export Interface untuk Banner
export interface Banner {
  id: number;
  documentId: string;
  altname: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: {
    id: number;
    url: string;
    width: number;
    height: number;
    alternativeText?: string | null;
    caption?: string | null;
    formats?: Record<string, any>;
  };
}

export interface Metadata {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

// export Interface untuk response API Strapi
export interface StrapiApiResponse {
  data: Product[];
  meta: Metadata;
}

export interface StrapiApiResponseBanner<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
