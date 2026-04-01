// lib/services/productService.ts

import { fetchAPI } from '../cmsService';
import type { Product, ProductsResponse, ProductFilters, Regional, ProductCategory } from '@/types/product';
import qs from 'qs';

// Get all products with filters
export const getProducts = async (filters: ProductFilters = {}): Promise<ProductsResponse> => {
  try {
    const queryObject: any = {
      populate: {
        thumbnail: true,
        productCategories: true,
        benefits: true,
        regionals: true,
      },
      sort: ['createdAt:desc'],
    };

    const filterConditions: any = {};

    if (filters.region) {
      filterConditions.regionals = {
        region: {
          $eq: filters.region,
        },
      };
    }

    if (filters.category) {
      filterConditions.productCategories = {
        name: {
          $eq: filters.category,
        },
      };
    }

    if (filters.speedRange) {
      if (filters.speedRange.min !== undefined && filters.speedRange.max !== undefined) {
        if (filters.speedRange.min === filters.speedRange.max) {
          filterConditions.finalSpeedInMbps = {
            $eq: filters.speedRange.min,
          };
        } else {
          // Range filter
          filterConditions.finalSpeedInMbps = {
            $gte: filters.speedRange.min,
            $lte: filters.speedRange.max,
          };
        }
      } else if (filters.speedRange.min !== undefined) {
        filterConditions.finalSpeedInMbps = {
          $gte: filters.speedRange.min,
        };
      } else if (filters.speedRange.max !== undefined) {
        filterConditions.finalSpeedInMbps = {
          $lte: filters.speedRange.max,
        };
      }
    }

    if (filters.billingCycle) {
      filterConditions.billingCycle = {
        $eq: filters.billingCycle,
      };
    }

    if (Object.keys(filterConditions).length > 0) {
      queryObject.filters = filterConditions;
    }

    if (filters.limit || filters.page) {
      queryObject.pagination = {};
      if (filters.limit) queryObject.pagination.pageSize = filters.limit;
      if (filters.page) queryObject.pagination.page = filters.page;
    }

    const queryString = qs.stringify(queryObject, { encodeValuesOnly: true });
    const response = await fetchAPI(`/products?${queryString}`);

    return {
      data: response.data || [],
      meta: response.meta || { pagination: { page: 1, pageSize: 10, pageCount: 1, total: 0 } },
    };
  } catch (error) {    return {
      data: [],
      meta: { pagination: { page: 1, pageSize: 10, pageCount: 1, total: 0 } },
    };
  }
};

// Get single product by ID
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const queryObject = {
      populate: {
        thumbnail: true,
        productCategories: true,
        benefits: true,
        regionals: true,
      },
    };

    const queryString = qs.stringify(queryObject, { encodeValuesOnly: true });
    const response = await fetchAPI(`/products/${id}?${queryString}`);

    return response.data || null;
  } catch (error) {    return null;
  }
};

// Get all unique regions from products
export const getRegions = async (): Promise<Regional[]> => {
  try {
    const response = await fetchAPI('/products?populate[regionals]=true');
    const products = response.data || [];

    const regionsMap = new Map<string, Regional>();

    products.forEach((product: Product) => {
      if (product.regionals && product.regionals.length > 0) {
        product.regionals.forEach((regional: Regional) => {
          regionsMap.set(regional.region, regional);
        });
      }
    });

    return Array.from(regionsMap.values());
  } catch (error) {    return [];
  }
};

// Get all unique categories from products
export const getProductCategories = async (): Promise<ProductCategory[]> => {
  try {
    const response = await fetchAPI('/products?populate[productCategories]=true');
    const products = response.data || [];

    const categoriesMap = new Map<string, ProductCategory>();

    products.forEach((product: Product) => {
      if (product.productCategories && product.productCategories.length > 0) {
        product.productCategories.forEach((category: ProductCategory) => {
          categoriesMap.set(category.name, category);
        });
      }
    });

    return Array.from(categoriesMap.values());
  } catch (error) {    return [];
  }
};

// Get speed ranges available in products
export const getSpeedRanges = async (region?: string): Promise<{ min: number; max: number; options: number[] }> => {
  try {
    const filters: ProductFilters = {};
    if (region) filters.region = region;

    const response = await getProducts(filters);
    const products = response.data;

    if (products.length === 0) {
      return { min: 0, max: 0, options: [] };
    }

    const speeds = products
      .map((product: Product) => product.finalSpeedInMbps)
      .filter((speed): speed is number => speed !== undefined && speed !== null);
    const uniqueSpeeds = [...new Set(speeds)].sort((a, b) => a - b);

    return {
      min: Math.min(...speeds),
      max: Math.max(...speeds),
      options: uniqueSpeeds,
    };
  } catch (error) {    return { min: 0, max: 0, options: [] };
  }
};