'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import ArticleCard from '@/app/article/_components/cards/ArticleCard';
import { type Article } from '@/types/article';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BannerImage {
  id: number;
  documentId: string;
  name: string;
  url: string;
  formats: {
    large: { url: string };
  };
}

interface BannerData {
  id: number;
  documentId: string;
  altname: string;
  image: BannerImage;
}

interface NationalBanner {
  id: number;
  documentId: string;
  altname: string;
  image: {
    id: number;
    url: string;
    alternativeText?: string;
    width: number;
    height: number;
  };
}

interface Product {
  id: number;
  documentId: string;
  productCode: string;
  productName: string;
  finalSpeedInMbps: number;
  originalSpeedInMbps: number;
  originalPrice: number;
  promoPrice?: number;
  billingCycle: 'Bulanan' | 'Tahunan' | 'Promo';
  priceHint?: string;
  thumbnail: {
    id: number;
    documentId: string;
    name: string;
    url: string;
    width: number;
    height: number;
    formats: {
      thumbnail: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
  benefits: {
    id: number;
    documentId: string;
    name: string;
    type: string;
  }[];
}

const RegionalPageDetail = () => {
  const router = useRouter();
  const params = useParams();
  const region = params?.region as string | undefined;
  const cmsPublicBaseUrl = process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.idplay.co.id';
  const [regionData, setRegionData] = useState<any | null>(null);
  const [regionalBanners, setRegionalBanners] = useState<BannerData[]>([]);
  const [nationalBanners, setNationalBanners] = useState<NationalBanner[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paketTab, setPaketTab] = useState<'bulan' | 'tahun' | 'promo'>('bulan');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (region) {
          // Fetch regional data
          const regionResponse = await fetch(`/api/cms/regionals?filters[region][$eq]=${encodeURIComponent(region)}`);
          const regionDataResult = await regionResponse.json();
          if (regionDataResult.data.length > 0) {
            setRegionData(regionDataResult.data[0]);
          }

          // Fetch regional banners
          const bannerResponse = await fetch(`/api/cms/regional-banners?filters[regional][region][$eq]=${encodeURIComponent(region)}&populate=image`);
          const bannerData = await bannerResponse.json();
          if (bannerData.data) {
            setRegionalBanners(bannerData.data);
          }

          // Fetch national banners
          const nationalBannerResponse = await fetch('/api/cms/national-banners?populate=*');
          const nationalBannerData = await nationalBannerResponse.json();
          if (nationalBannerData && Array.isArray(nationalBannerData.data)) {
            setNationalBanners(nationalBannerData.data);
          }

          // Fetch articles
          const articleResponse = await fetch(
            `/api/cms/articles?filters[regionals][region][$eq]=${encodeURIComponent(region)}&populate[author]=true&populate[categories]=true&populate[thumbnail]=true&populate[regionals]=true`
          );
          const articleData = await articleResponse.json();
          if (articleData.data) {
            const mappedArticles: Article[] = articleData.data.map((item: any) => ({
              id: item.id,
              documentId: item.documentId,
              title: item.title,
              slug: item.slug,
              description: item.description,
              content: item.content,
              publishedAt: item.publishedAt,
              categories: item.categories ? item.categories.map((cat: any) => ({ name: cat.name, slug: cat.slug })) : null,
              author: item.author ? { name: item.author.name, avatar: item.author.avatar?.url || null } : null,
              thumbnail: item.thumbnail ? { formats: item.thumbnail.formats } : null,
            }));
            setArticles(mappedArticles);
          }

          // Fetch products
          const billingCycle = paketTab === 'bulan' ? 'Bulanan' : paketTab === 'tahun' ? 'Tahunan' : 'Promo';
          const productResponse = await fetch(
            `/api/cms/products?filters[regionals][region][$eq]=${encodeURIComponent(region)}&filters[billingCycle][$eq]=${encodeURIComponent(billingCycle)}&populate=*`
          );
          const productData = await productResponse.json();
          if (productData.data) {
            setProducts(productData.data);
          } else {
            // Fallback fetch without region filter
            const fallbackResponse = await fetch(
              `/api/cms/products?filters[billingCycle][$eq]=${encodeURIComponent(billingCycle)}&populate=*`
            );
            const fallbackData = await fallbackResponse.json();
            if (fallbackData.data) {
              setProducts(fallbackData.data);
            } else {
              setProducts([]);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % (regionalBanners.length + nationalBanners.length || 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [region, paketTab, regionalBanners.length, nationalBanners.length]);

  // Combine and interleave banners (regional first, then national, alternating)
  const combinedBanners = [];
  const maxLength = Math.max(regionalBanners.length, nationalBanners.length);
  for (let i = 0; i < maxLength; i++) {
    if (i < regionalBanners.length) {
      combinedBanners.push({ type: 'regional', data: regionalBanners[i] });
    }
    if (i < nationalBanners.length) {
      combinedBanners.push({ type: 'national', data: nationalBanners[i] });
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  // Helper function to get image URL with CMS prefix
  const getImageUrl = (url: string | undefined | null): string => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    if (url.startsWith('/imgs') || url.startsWith('/package')) return url;
    return `${cmsPublicBaseUrl}${url}`;
  };

  const ProductCard = ({ product }: { product: Product }) => {
    const thumbnailUrl = product.thumbnail?.url ? getImageUrl(product.thumbnail.url) : null;

    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-transparent">
        {/* Product Card */}
        <div className="flex items-center justify-center bg-orange-500 text-white text-center">
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt={product.productName}
              width={500}
              height={500}
              className="w-full h-auto object-cover aspect-auto object-center"
              loading="lazy"
              priority={false}
            />
          ) : (
            <div className="w-full h-48 flex items-center justify-center bg-gray-200 text-gray-500">
              No Image
            </div>
          )}
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
          <p className="text-sm lg:text-[15px] tracking-[1%] leading-[26px] font-medium text-orange-500">
            {product.priceHint || 'Mau langganan setahun? Bisa dicicil, kok!'}
          </p>
        </div>

        {/* Feature block */}
        <div className="mx-4 my-4 rounded-xl bg-orange-50 border border-orange-100 p-4 text-black">
          <div className="space-y-3">
            {product.benefits.map((benefit, i) => (
              <div key={benefit.id} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white text-xs">
                  ✓
                </span>
                <span className="text-sm text-gray-800">{benefit.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom action buttons */}
        <div className="px-4 pb-6 flex flex-col gap-3">
          <button
            className="w-full border border-orange-500 text-orange-600 hover:bg-orange-50 font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
            onClick={() => router.push(`/kategori/rumah?region=${encodeURIComponent(region ?? '')}`)}
          >
            <span>Selengkapnya</span>
            <span className="transition-transform">▾</span>
          </button>
          <button
            onClick={() => router.push('/entri-prospek')}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            Subscribe
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="container mx-auto p-6 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen space-y-8">
      {/* Hero Section with Banner Slider */}
      <div className="relative w-full overflow-hidden pb-8">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {combinedBanners.length > 0 ? (
            combinedBanners.map((banner, index) => {
              // Safe image URL extraction with null checks
              let imageUrl: string | null = null;
              if (banner.type === 'regional') {
                const img = banner.data.image as BannerImage | null;
                imageUrl = img?.formats?.large?.url || img?.url || null;
              } else {
                const img = banner.data.image as NationalBanner['image'] | null;
                imageUrl = img?.url || null;
              }

              if (!imageUrl) return null; // Skip banners without images

              return (
                <div key={`${banner.type}-${banner.data.id}-${index}`} className="w-full flex-shrink-0">
                  <Link href="/entri-prospek" className="block w-full cursor-pointer">
                    <div className="w-full bg-gray-100 flex items-center justify-center hover:opacity-90 transition-opacity">
                      <img
                        src={getImageUrl(imageUrl)}
                        alt={banner.data.altname || 'Banner'}
                        className="max-h-full w-full object-cover"
                      />
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            <div className="w-full bg-gray-200 h-64 flex items-center justify-center flex-shrink-0">
              No banner available
            </div>
          )}
        </div>
      </div>

      {/* New Responsive Section after Banner */}
      <div className="container mx-auto px-4 py-8 rounded-lg">
        <div className="md:flex md:items-center md:justify-between gap-6">
          <div className="md:w-1/2 mb-4 md:mb-0">
            <img
              src="/imgs/dummy-foto.jpg"
              alt="Placeholder"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
          <div className="md:w-1/2 md:pl-6">
            <h2 className="text-3xl font-bold mb-4">Nikmati Keunggulan Internet Kami</h2>
            <p className="text-gray-700 mb-4">
              Kami menghadirkan koneksi internet fiber optik berkecepatan tinggi yang dirancang untuk kebutuhan digital keluarga modern. Nikmati streaming mulus, gaming tanpa lag, dan kerja dari rumah yang produktif.
            </p>
            <ul className="list-none space-y-2 mb-4">
              <li className="flex items-center">
                <span className="text-orange-500 mr-2">✔</span> Kecepatan Unggul untuk Semua Perangkat
              </li>
              <li className="flex items-center">
                <span className="text-orange-500 mr-2">✔</span> Jaminan Kestabilan Jaringan 24/7
              </li>
              <li className="flex items-center">
                <span className="text-orange-500 mr-2">✔</span> Pemasangan Mudah dan Cepat
              </li>
            </ul>
            <Link href="/entri-prospek" className="inline-block bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
              Cek Paket & Harga
            </Link>
          </div>
        </div>
      </div>

      {/* New Text Section above Product Card */}
      <div className="container mx-auto p-6 text-center">
        <h2 className="text-4xl font-bold text-orange-500 mb-2">Temukan Layanan yang Tepat di Daerahmu</h2>
        <p className="text-lg text-gray-600 mb-2">
          Kami paham, internet cepat bukan lagi pilihan — tapi kebutuhan utama.
        </p>
        <p className="text-xs text-gray-600">
          Karena semua orang butuh koneksi yang bisa diandalkan, kapan pun dan di mana pun.
        </p>
      </div>

      {/* Product Section */}
      <div className="container mx-auto px-4 lg:px-8">
        {/* Toggle Month/Year */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-1 bg-white rounded-lg p-1 shadow-md">
            <button
              className={cn(
                'px-3 lg:px-6 py-1 lg:py-2 rounded-md text-sm lg:text-base font-medium lg:font-semibold transition-all ease-in-out duration-300',
                paketTab === 'bulan'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white hover:bg-orange-200 text-black hover:text-orange-500'
              )}
              onClick={() => setPaketTab('bulan')}
            >
              Bulan
            </button>
            <button
              className={cn(
                'px-3 lg:px-6 py-1 lg:py-2 rounded-md text-sm lg:text-base font-medium lg:font-semibold transition-all ease-in-out duration-300',
                paketTab === 'tahun'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white hover:bg-orange-200 text-black hover:text-orange-500'
              )}
              onClick={() => setPaketTab('tahun')}
            >
              Tahun
            </button>
            <button
              className={cn(
                'px-3 lg:px-6 py-1 lg:py-2 rounded-md text-sm lg:text-base font-medium lg:font-semibold transition-all ease-in-out duration-300',
                paketTab === 'promo'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white hover:bg-orange-200 text-black hover:text-orange-500'
              )}
              onClick={() => setPaketTab('promo')}
            >
              Promo
            </button>
          </div>
        </div>

        <Carousel
          plugins={[Autoplay({ delay: 3000 })]}
          opts={{ align: 'start', loop: true }}
          className="w-full mb-12"
        >
          <CarouselContent>
            {products.length > 0 ? (
              products.map((product) => (
                <CarouselItem key={product.id} className="basis-full md:basis-1/2 lg:basis-1/3">
                  <ProductCard product={product} />
                </CarouselItem>
              ))
            ) : (
              <CarouselItem className="basis-full">
                <div className="bg-gray-100 p-4 rounded-lg h-full flex items-center justify-center">
                  <p className="text-gray-700">No products available</p>
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>

      {/* Artikel Section as Carousel */}
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-6">Artikel</h2>
        <p className="text-gray-700 mb-6">Biarakan Customer yang Menilai Produk Kita!</p>
        <Carousel
          plugins={[Autoplay({ delay: 3000 })]}
          opts={{ align: 'start', loop: true }}
          className="w-full mb-12"
        >
          <CarouselContent>
            {articles.length > 0 ? (
              articles.map((article) => (
                <CarouselItem key={article.documentId} className="basis-full md:basis-1/2 lg:basis-1/3">
                  <ArticleCard article={article} showCategory={true} />
                </CarouselItem>
              ))
            ) : (
              <CarouselItem className="basis-full">
                <div className="bg-gray-100 p-4 rounded-lg h-full flex items-center justify-center">
                  <p className="text-gray-700">No articles available</p>
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
    </div>
  );
};

export default RegionalPageDetail;
