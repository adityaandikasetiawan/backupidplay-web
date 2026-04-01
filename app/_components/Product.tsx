import { cn } from '@/lib/utils';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { RegionType } from '../kategori/_component/ProductFacts';
import RegionSelector from '../kategori/_component/RegionSelector';
import SpeedSelector from '../kategori/_component/SpeedSelector';
import { Product, ProductFilters } from '@/types/product';
import { useProducts } from '@/hooks/useProducts';
import ProductBenefits from '../kategori/_component/ProductBenefits';
import { resolveThumbnailUrl } from '@/lib/services/imageService';

const ProductSection = () => {
  const [selectedBillingCycle, setSelectedBillingCycle] = useState<'Bulanan' | 'Tahunan' | 'Promo' | null>(
    null
  );
  const [openId, setOpenId] = useState<number | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<RegionType>('');
  const [selectedSpeedRange, setSelectedSpeedRange] = useState<{
    min?: number;
    max?: number;
  } | null>(null);

  const navigate = useRouter();

  const filters = useMemo(() => {
    const filterObj: ProductFilters = {};
    if (selectedRegion) filterObj.region = selectedRegion;
    // if (category) filterObj.category = category;
    if (selectedSpeedRange) filterObj.speedRange = selectedSpeedRange;
    if (selectedBillingCycle) filterObj.billingCycle = selectedBillingCycle;
    return filterObj;
  }, [selectedRegion, selectedSpeedRange, selectedBillingCycle]);

  const { displayedProducts, loading } = useProducts({
    filters,
    autoFetch: !!selectedRegion,
  });

  // Komponen Skeleton untuk loading state
  const ProductCardSkeleton = () => {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-transparent animate-pulse">
        {/* Skeleton untuk gambar produk */}
        <div className="w-full h-48 bg-gray-200"></div>

        {/* Skeleton untuk nama produk dan speed */}
        <div className="px-4 pt-4 lg:px-6">
          <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
          <div className="flex items-center justify-center gap-1.5 mt-2">
            <div className="h-5 bg-gray-200 rounded w-16"></div>
            <div className="h-5 bg-gray-200 rounded w-16"></div>
          </div>
        </div>

        {/* Skeleton untuk harga */}
        <div className="relative flex flex-col justify-center items-center px-4 lg:px-6 lg:pt-2">
          <div className="h-8 lg:h-12 bg-gray-200 rounded w-32 mb-2 sm:mb-3 lg:mb-5"></div>
          <div className="h-6 lg:h-8 bg-gray-200 rounded w-28 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-40"></div>
        </div>

        {/* Skeleton untuk benefits */}
        <div className="mx-4 my-4 rounded-xl bg-gray-50 border border-gray-100 p-4">
          <div className="space-y-3">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-0.5 h-5 w-5 bg-gray-200 rounded-full"></div>
                <div className="h-4 bg-gray-200 rounded flex-1"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Skeleton untuk buttons */}
        <div className="px-4 pb-6 flex flex-col gap-3">
          <div className="w-full h-12 bg-gray-200 rounded-lg"></div>
          <div className="w-full h-12 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  };

  // Komponen ProductCard untuk reusability
  const ProductCard = ({ product }: { product: Product }) => {
    const isOpen = openId === product.id;

    // Helper function untuk format harga
    const formatPrice = (price: number) => {
      return new Intl.NumberFormat('id-ID').format(price);
    };

    const getImageUrl = (product: Product) => {
      const url = resolveThumbnailUrl(product.thumbnail);
      return url || '/package/home-2-doubleplay2.jpeg';
    };

    const calculateMonthlyEquivalent = (price: number) => {
      return Math.round(price / 12);
    };

    return (
      <div className="flex flex-col justify-between h-full bg-white rounded-2xl shadow-lg overflow-hidden border border-transparent">
        {/* Product Card */}
        <div className="">
          <div className="flex items-center justify-center bg-orange-500 text-white text-center">
            <Image
              src={getImageUrl(product)}
              alt={product.productName}
              width={500}
              height={500}
              className="w-full h-auto object-cover aspect-auto object-center"
              loading="lazy"
              priority={false}
            />
          </div>

          <div className="px-4 pt-4 lg:px-6">
            <h3 className="text-lg font-bold text-orange-500 text-center">{product.productName}</h3>

            <div className="flex items-center justify-center gap-1.5 mt-2">
              {product.originalSpeedInMbps && product.finalSpeedInMbps && (
                <p className="relative text-lg font-semibold text-gray-300 text-center px-0.5">
                  <span className="absolute left-0 right-0 top-1/2 -translate-y-1/2 bg-gray-300 w-full h-0.5 rounded-full" />
                  {product.originalSpeedInMbps} Mbps
                </p>
              )}
              <p className="text-lg font-semibold text-orange-500 text-center">
                {product.finalSpeedInMbps || product.originalSpeedInMbps} Mbps
              </p>
            </div>
          </div>

          <div className="relative flex flex-col justify-center items-center px-4 lg:px-6 lg:pt-2">
            <div
              className={cn(
                'text-xl sm:text-2xl lg:text-[36px] tracking-[1%] leading-[45px] font-bold text-orange-500 mb-2 sm:mb-3',
                product.promoPrice ? 'lg:mb-5' : 'lg:mb-0'
              )}
            >
              {product.promoPrice && (
                <div className="flex flex-col items-center justify-center gap-1">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-400 leading-tight flex items-center">
                    <span
                      className="line-through mr-1"
                      style={{ textDecorationThickness: '2px' }} // Sesuai dengan ProductFacts
                    >
                      Rp.{formatPrice(product.originalPrice)}
                    </span>
                    <span className="text-sm sm:text-base">
                      /{product.billingCycle === 'Bulanan' ? 'bulan' : 'tahun'}
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-500 leading-tight flex items-center">
                    <span className="text-md sm:text-3xl lg:text-4xl font-bold text-orange-500 whitespace-nowrap">
                      Rp.{formatPrice(product.promoPrice)}
                    </span>
                    <span className="text-md sm:text-lg ml-1 whitespace-nowrap">
                      /{product.billingCycle === 'Bulanan' ? 'bulan' : 'tahun'}
                    </span>
                  </div>
                </div>
              )}
              {!product.promoPrice && (
                <div className="flex flex-row items-center justify-center gap-2 flex-wrap">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-500 leading-tight flex items-center">
                    Rp.{formatPrice(product.originalPrice)}
                    <span className="text-lg sm:text-xl ml-1">
                      /{product.billingCycle === 'Bulanan' ? 'bulan' : 'tahun'}
                    </span>
                  </div>
                </div>
              )}
            </div>

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
              <p className="text-sm lg:text-[15px] tracking-[1%] leading-[26px] font-medium text-orange-500">
                {product.priceHint}
              </p>
            )}
          </div>

          <div className="mx-4 my-4 rounded-xl bg-orange-50 border border-orange-100 p-4 text-black">
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
          {/* <button
            className="w-full border border-orange-500 text-orange-600 hover:bg-orange-50 font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
            onClick={() => navigate.push('/kategori/rumah')}
          >
            <span>Selengkapnya</span>
            <span className="transition-transform">▾</span>
          </button> */}
          <button
            onClick={() => navigate.push('/entri-prospek')}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            Subscribe
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="relative container mx-auto w-full">
      <div className="py-14 pb-20 rounded-2xl bg-[#FFEFE6]">
        <h2 className="text-xl lg:text-4xl font-medium tracking-[6%] leading-[29px] text-center mb-4 lg:mb-10 text-black">
          Yuk, <span className="text-orange-500">Mulai Berlangganan!</span>
        </h2>
        <p className="text-base lg:text-lg font-medium text-center text-gray-600 mb-8 px-4">
          Harga transparan, no tipu-tipu.
          <br />
          Pilih paket yang pas buat kamu, dijamin gak bikin dompet nangis!
          <br />
          Gak pake ribet, cuma internet cepat yang siap nemenin tiap hari.
        </p>

        {/* Toggle Region */}
        <div className="flex justify-center">
          <RegionSelector
            selectedRegion={selectedRegion}
            onRegionChange={setSelectedRegion}
            className="mb-8 mt-6 flex flex-col items-center"
          />
        </div>

        {/* Toggle Month/Year */}
        {selectedRegion ? (
          <>
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-1 bg-white rounded-lg p-1 shadow-md">
                <button
                  className={cn(
                    'px-3 lg:px-6 py-1 lg:py-2 rounded-md text-white text-sm lg:text-base font-medium lg:font-semibold transition-all ease-in-out duration-300',
                    selectedBillingCycle === 'Bulanan'
                      ? 'bg-orange-500'
                      : 'bg-white hover:bg-orange-200 text-black hover:text-orange-500'
                  )}
                  onClick={() => setSelectedBillingCycle('Bulanan')}
                >
                  Bulan
                </button>
                <button
                  className={cn(
                    'px-3 lg:px-6 py-1 lg:py-2 rounded-md text-white text-sm lg:text-base font-medium lg:font-semibold transition-all ease-in-out duration-300',
                    selectedBillingCycle === 'Tahunan'
                      ? 'bg-orange-500'
                      : 'bg-white hover:bg-orange-200 text-black hover:text-orange-500'
                  )}
                  onClick={() => setSelectedBillingCycle('Tahunan')}
                >
                  Tahun
                </button>
                <button
                  className={cn(
                    'px-3 lg:px-6 py-1 lg:py-2 rounded-md text-white text-sm lg:text-base font-medium lg:font-semibold transition-all ease-in-out duration-300',
                    selectedBillingCycle === 'Promo'
                      ? 'bg-orange-500'
                      : 'bg-white hover:bg-orange-200 text-black hover:text-orange-500'
                  )}
                  onClick={() => setSelectedBillingCycle('Promo')}
                >
                  Promo
                </button>
              </div>
            </div>

            <SpeedSelector
              region={selectedRegion}
              selectedSpeedRange={selectedSpeedRange}
              onSpeedRangeChange={setSelectedSpeedRange}
              loading={loading}
            />

            {/* Clear All Filters */}
            {(selectedSpeedRange || selectedBillingCycle) && (
              <div className="flex justify-center mb-10">
                <button
                  onClick={() => {
                    setSelectedSpeedRange(null);
                    setSelectedBillingCycle(null);
                  }}
                  className="text-orange-600 hover:text-orange-800 font-medium text-sm bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
                  aria-label="Hapus semua filter"
                >
                  Hapus Semua Filter
                </button>
              </div>
            )}

            <div className="w-full px-4 lg:px-8 mt-4">
              <div className="mb-4">
                <Carousel
                  plugins={[
                    Autoplay({
                      delay: 5000,
                    }),
                  ]}
                  opts={{
                    align: 'start',
                    loop: true,
                  }}
                  className="w-full max-w-full overflow-x-hidden"
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {loading
                      ? // Skeleton untuk carousel
                      [1, 2, 3, 4, 5, 6].map((_, index) => (
                        <CarouselItem
                          key={`skeleton-${index}`}
                          className="pl-2 md:pl-4 basis-full md:basis-1/3"
                        >
                          <ProductCardSkeleton />
                        </CarouselItem>
                      ))
                      : displayedProducts.map((product) => (
                        <CarouselItem
                          key={product.id}
                          className="pl-2 md:pl-4 basis-full md:basis-1/3"
                        >
                          <ProductCard product={product} />
                        </CarouselItem>
                      ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              </div>

              {displayedProducts.length === 0 && !loading && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">Tidak ada produk tersedia untuk pilihan ini.</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">Silakan pilih wilayah terlebih dahulu.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSection;