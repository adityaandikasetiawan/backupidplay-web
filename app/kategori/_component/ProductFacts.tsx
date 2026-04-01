import { useRouter } from 'next/navigation';
import Image from 'next/image';
import React, { useMemo, useState, useEffect } from 'react';
import { useProducts } from '@/hooks/useProducts';
import type { Product, ProductFilters } from '@/types/product';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import ProductCardSkeleton from './LoadingSkeletonProduct';
import ProductBenefits from './ProductBenefits';
import type { CarouselApi } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { resolveThumbnailUrl } from '@/lib/services/imageService';

export type RegionType = string;

interface ProductFactsProps {
  region?: RegionType;
  category?: string;
  selectedSpeedRange?: { min?: number; max?: number };
  selectedBillingCycle?: 'Bulanan' | 'Tahunan' | 'Promo';
  noMargin?: boolean;
}

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  noMargin?: boolean;
}

const SectionContainer: React.FC<SectionContainerProps> = ({ children, className, noMargin }) => (
  <section className={cn(' lg:px-8', noMargin ? '' : 'mt-8', className)}>{children}</section>
);

const ProductFacts: React.FC<ProductFactsProps> = ({
  region,
  category,
  selectedSpeedRange,
  selectedBillingCycle,
  noMargin
}) => {
  const router = useRouter();
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const filters = useMemo(() => {
    const filterObj: ProductFilters = {};
    if (region) filterObj.region = region;
    if (category) filterObj.category = category;
    if (selectedSpeedRange) filterObj.speedRange = selectedSpeedRange;
    if (selectedBillingCycle) filterObj.billingCycle = selectedBillingCycle;
    return filterObj;
  }, [region, category, selectedSpeedRange, selectedBillingCycle]);

  const { displayedProducts, loading, error } = useProducts({
    filters,
    autoFetch: !!region
  });

  const calculateMonthlyEquivalent = (price: number) => {
    return Math.round(price / 12);
  };

  useEffect(() => {
    if (!api) return;

    const updateScrollState = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    updateScrollState();
    api.on('scroll', updateScrollState);

    return () => {
      api.off('scroll', updateScrollState);
    };
  }, [api]);

  const getImageUrl = (product: Product) => {
    const url = resolveThumbnailUrl(product.thumbnail);
    return url || '/package/home-2-doubleplay2.jpeg';
  };

  if (!region) {
    return (
      <SectionContainer noMargin={noMargin}>
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">Silakan pilih wilayah terlebih dahulu.</p>
        </div>
      </SectionContainer>
    );
  }

  if (loading) {
    return (
      <SectionContainer noMargin={noMargin}>
        <div
          className="relative"
          aria-live="polite"
        >
          <Carousel
            setApi={setApi}
            opts={{ align: 'start' }}
          >
            <CarouselContent className="-ml-4">
              {[...Array(3)].map((_, i) => (
                <CarouselItem
                  key={i}
                  className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <ProductCardSkeleton />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </SectionContainer>
    );
  }

  if (error) {
    return (
      <SectionContainer noMargin={noMargin}>
        <div className="text-center py-16">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </SectionContainer>
    );
  }

  if (displayedProducts.length === 0) {
    return (
      <SectionContainer noMargin={noMargin}>
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No Result</p>
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer noMargin={noMargin}>
      <div
        className="relative"
        aria-live="polite"
      >
        <Carousel
          setApi={setApi}
          opts={{ align: 'start' }}
          className="w-full max-w-full overflow-x-hidden"
        >
          <CarouselContent className="-ml-4">
            {displayedProducts.map((product: Product) => (
              <CarouselItem
                key={product.id}
                className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <div className="flex flex-col justify-between gap-y-4 h-full bg-white rounded-2xl shadow-lg overflow-hidden border border-transparent p-4">
                  <div className="flex flex-col gap-y-4">
                    <div
                      className="flex flex-1 items-center justify-center w-full bg-orange-50 rounded-t-2xl"
                      style={{ minHeight: '90px' }}
                    >
                      <Image
                        src={getImageUrl(product)}
                        alt={product.productName}
                        width={180}
                        height={70}
                        className="object-contain w-full"
                        loading="lazy"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {product.productName}
                      </h3>
                      <div className="mb-2">
                        {product.originalSpeedInMbps ? (
                          <div className="space-y-1">
                            <div className="text-sm text-gray-500 line-through">
                              {product.originalSpeedInMbps} Mbps
                            </div>
                            <div className="text-lg font-bold text-orange-500">
                              {product.finalSpeedInMbps} Mbps
                            </div>
                          </div>
                        ) : (
                          <div className="text-lg font-bold text-orange-500">
                            {product.finalSpeedInMbps} Mbps
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-1 p-1 lg:p-2">
                      {product.promoPrice ? (
                        <div className="flex flex-col items-center justify-center gap-1">
                          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-400 leading-tight flex items-center">
                            <span
                              className="line-through mr-1"
                              style={{ textDecorationThickness: '2px' }}
                            >
                              Rp.{product.originalPrice.toLocaleString('id-ID')}
                            </span>
                            <span className="text-sm sm:text-base">
                              /{product.billingCycle === 'Bulanan' ? 'bulan' : 'tahun'}
                            </span>
                          </div>
                          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-500 leading-tight flex items-center">
                            <span className="text-md sm:text-3xl lg:text-4xl font-bold text-orange-500 whitespace-nowrap">
                              Rp.{product.promoPrice.toLocaleString('id-ID')}
                            </span>
                            <span className="text-md sm:text-lg ml-1 whitespace-nowrap">
                              /{product.billingCycle === 'Bulanan' ? 'bulan' : 'tahun'}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-row items-center justify-center gap-2 flex-wrap">
                          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-500 leading-tight flex items-center">
                            Rp.{product.originalPrice.toLocaleString('id-ID')}
                            <span className="text-lg sm:text-xl ml-1">
                              /{product.billingCycle === 'Bulanan' ? 'bulan' : 'tahun'}
                            </span>
                          </div>
                        </div>
                      )}
                      {/* per bulan untuk Tahunan */}
                      {product.billingCycle === 'Tahunan' && (
                        <div className="w-full mb-2 mt-2 flex justify-center items-center">
                          <div className="text-center font-medium text-orange-700 text-base sm:text-lg lg:text-xl leading-tight">
                            <span>
                              Setara
                              <span className="font-bold mx-1">
                                Rp.
                                {calculateMonthlyEquivalent(
                                  product.promoPrice || product.originalPrice
                                ).toLocaleString('id-ID')}
                              </span>
                              <span className="text-xs sm:text-sm">/bulan</span>
                            </span>
                          </div>
                        </div>
                      )}
                      {product.priceHint && (
                        <p className="text-sm sm:text-base text-center font-medium text-orange-500 mb-4">
                          {product.priceHint}
                        </p>
                      )}
                    </div>
                    <div className="mx-4 mb-4 rounded-xl bg-orange-50 border border-orange-100 p-4 text-black">
                      <ProductBenefits product={product} />
                      <div className="my-4 h-0.5 w-full bg-orange-300" />
                      <div className="flex items-center justify-around text-orange-600">
                        <span className="text-xs font-semibold border border-orange-400 px-2 py-1 rounded">
                          1080p FULLHD
                        </span>
                        <span className="text-xs font-semibold border border-orange-400 px-2 py-1 rounded">
                          🎮 Gaming
                        </span>
                        <span className="text-xs font-semibold border border-orange-400 px-2 py-1 rounded">
                          ∞ Unlimited
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 pb-6 flex flex-col gap-3">
                    <button
                      onClick={() => router.push('/entri-prospek')}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
                      aria-label={`Berlangganan ${product.productName}`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                      <span>Subscribe</span>
                    </button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {canScrollPrev && <CarouselPrevious className="left-2 hidden md:flex" />}
          {canScrollNext && <CarouselNext className="right-2 hidden md:flex" />}
        </Carousel>
      </div>
    </SectionContainer>
  );
};

export default ProductFacts;
