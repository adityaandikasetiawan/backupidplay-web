export interface MediaFormat {
  url: string;
  width: number;
  height: number;
  size: number;
}

export interface Media {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: MediaFormat;
    small?: MediaFormat;
    medium?: MediaFormat;
    large?: MediaFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Author {
  id: number;
  documentId: string;
  name: string;
  interest: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  avatar?: Media;
  description: string | null;
}

export interface Article {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  type?: 'article' | 'news' | 'press-release'; // Identifier news or article
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  description: string;
  featured: boolean;
  content: string;
  thumbnail: Media;
  author: Author;
  categories: Category[] | null;
}
