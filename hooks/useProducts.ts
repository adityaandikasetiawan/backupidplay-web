// hooks/useProducts.ts

import { useState, useEffect, useCallback, useMemo } from 'react';
import { getProducts, getRegions, getProductCategories } from '@/lib/services/productService';
import { type Product, type Regional, type ProductCategory, type ProductFilters, type UseProductsProps, type UseProductsReturn } from '@/types/product';

export const useProducts = ({
  filters = {},
  autoFetch = false,
}: UseProductsProps = {}): UseProductsReturn => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [regions, setRegions] = useState<Regional[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  const filterString = useMemo(() => JSON.stringify(filters), [filters]);

  // Fetch regions and categories when region changes
  useEffect(() => {
    const fetchStaticData = async () => {
      try {
        setLoading(true);
        const [regionsData] = await Promise.all([
          getRegions(),
        //   getProductCategories(),
        ]);
        // console.log('Regions:', regionsData); // Debug
        // console.log('Categories:', categoriesData); // Debug
        setRegions(regionsData);
        // setCategories(categoriesData);
      } catch (err) {
        console.error('Error fetching static data:', err);
        setError('Gagal memuat wilayah atau kategori');
      } finally {
        setLoading(false);
      }
    };

    fetchStaticData();
  }, [filters.region]); // Update when region changes

  const fetchProducts = useCallback(async () => {
    if (!filters.region) {
      setAllProducts([]);
      setTotalProducts(0);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await getProducts(filters);
    //   console.log('Products fetched:', result.data); // Debug
      setAllProducts(result.data);
      setTotalProducts(result.meta.pagination.total);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal memuat produk';
      console.error('useProducts - Error:', err);
      setError(errorMessage);
      setAllProducts([]);
      setTotalProducts(0);
    } finally {
      setLoading(false);
    }
  }, [filterString]);

  const updateFilters = useCallback((newFilters: ProductFilters) => {
    console.warn('updateFilters is deprecated. Pass filters as props instead.');
  }, []);

  const refetch = useCallback(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (filters.region || autoFetch) {
      fetchProducts();
    }
  }, [fetchProducts, autoFetch]);

  return {
    products: allProducts,
    displayedProducts: allProducts, // Show all products instead of paginated
    regions,
    categories,
    loading,
    error,
    totalProducts,
    refetch,
    updateFilters,
  };
};