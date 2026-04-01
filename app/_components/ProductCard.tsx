import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const ProductCard = () => {
  const products = [
    {
      id: 1,
      speed: '700',
      yearlyPrice: '1.700.000',
      monthlyPrice: '350.000'
    },
    {
      id: 2,
      speed: '700',
      yearlyPrice: '1.700.000',
      monthlyPrice: '350.000'
    },
    {
      id: 3,
      speed: '700',
      yearlyPrice: '1.700.000',
      monthlyPrice: '350.000'
    }
  ];

  const ProductCardItem = ({ product }: { product: (typeof products)[0] }) => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="flex items-center justify-center bg-orange-500 text-white px-4 py-6 sm:py-7 lg:py-9 text-center">
        <div className="text-[36px] sm:text-[40px] lg:text-[70px] tracking-[1%] leading-[45px] font-bold text-center">
          {product.speed}
          <span className="text-[16px] sm:text-[20px]">/Mbps</span>
        </div>
      </div>
      <div className="relative flex flex-col justify-center items-center p-4 lg:p-6">
        <div className="text-xl sm:text-2xl lg:text-[36px] tracking-[1%] leading-[45px] font-bold text-orange-500 mb-2 sm:mb-3 lg:mb-5">
          Rp.{product.yearlyPrice}
          <span className="text-[16px] sm:text-[20px]">/Tahun</span>
        </div>
        {/* <Image
          src="/icons/arrow-pricing.svg"
          alt=""
          width={65}
          height={65}
          className="size-[45px] sm:size-[55px] lg:size-[65px] absolute z-10 left-10 sm:left-12 lg:left-9 top-10 lg:top-13"
        /> */}
        <div className="text-base lg:text-[30px] tracking-[1%] leading-[26px] font-medium text-orange-700 mb-2">
          Rp.{product.monthlyPrice}
          <span className="text-[16px] sm:text-[20px]">/Bulan</span>
        </div>
        <p className="text-sm lg:text-[15px] tracking-[1%] leading-[26px] font-medium text-orange-500">
          Mau langganan setahun? Bisa dicicil, kok!
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Carousel */}
      <div className="block md:hidden mb-12">
        <Carousel
          plugins={[
            Autoplay({
              delay: 3000
            })
          ]}
          opts={{
            align: 'start',
            loop: true
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-2 md:pl-4 basis-full"
              >
                <ProductCardItem product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-12 mb-12">
        {products.map((product) => (
          <ProductCardItem
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  );
};

export default ProductCard;
