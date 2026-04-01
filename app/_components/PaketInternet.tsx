'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const imagesByRegion = {
  jawa: {
    bulanan: [
      '/package/10bulanan-jawa.jpg',
      '/package/20jawa-bulanan.jpg',
      '/package/50jawa-bulanan.jpg',
      '/package/75jawa-bulanan.jpg',
      '/package/100jawa-bulanan.jpg',
      '/package/200jawa-bulanan.jpg',
    ],
    tahunan: [
      '/package/20mbps-idplay.jpg',
      '/package/30mbps-idplay.jpg',
      '/package/50mbps-idplay.jpg',
      '/package/75mbps-idplay.jpg',
      '/package/100mbps-idplay.jpg',
      '/package/200mbps-idplay.jpg',
    ],
  },
  sulawesi: {
    bulanan: [
      '/package/20sulawesi-bulanan.jpg',
      '/package/30sulawesi-bulanan.jpg',
      '/package/50sulawesi-bulanan.jpg',
      '/package/75sulawesi-bulanan.jpg',
      '/package/100sulawesi-bulanan.jpg',
      '/package/200sulawesi-bulanan.jpg',
    ],
    tahunan: [
      '/package/20mbps-sulawesi.jpg',
      '/package/30mbps-sulawesi.jpg',
      '/package/50mbps-sulawesi.jpg',
      '/package/75mbps-sulawesi.jpg',
      '/package/100mbps-sulawesi.jpg',
      '/package/200mbps-sulawesi.jpg',
    ],
  },
};

type RegionKey = keyof typeof imagesByRegion;

type PaketInternetProps = {
  region?: RegionKey;
  lockRegion?: boolean;
  defaultDuration?: 'bulanan' | 'tahunan';
};

const PaketInternet: React.FC<PaketInternetProps> = ({
  region: regionProp,
  lockRegion = false,
  defaultDuration = 'bulanan'
}) => {
  const [region, setRegion] = useState<RegionKey>(regionProp ?? 'jawa');
  const [duration, setDuration] = useState<'bulanan' | 'tahunan'>(defaultDuration);

  useEffect(() => {
    if (regionProp) {
      setRegion(regionProp);
    }
  }, [regionProp]);

  const images = imagesByRegion[region][duration];

  return (
    <section className="py-16 bg-orange-500">
      <div className="container mx-auto px-4">
        {!lockRegion && (
          <div className="flex justify-center mb-6 gap-4">
            <button
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                region === 'jawa'
                  ? 'bg-white text-orange-500'
                  : 'bg-orange-700 text-white hover:bg-orange-600'
              }`}
              onClick={() => setRegion('jawa')}
            >
              Jawa
            </button>
            <button
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                region === 'sulawesi'
                  ? 'bg-white text-orange-500'
                  : 'bg-orange-700 text-white hover:bg-orange-600'
              }`}
              onClick={() => setRegion('sulawesi')}
            >
              Sulawesi & Kalimantan
            </button>
          </div>
        )}

        <div className="flex justify-center mb-10 gap-4">
          <button
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              duration === 'bulanan'
                ? 'bg-white text-orange-500'
                : 'bg-orange-700 text-white hover:bg-orange-600'
            }`}
            onClick={() => setDuration('bulanan')}
          >
            Bulanan
          </button>
          <button
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              duration === 'tahunan'
                ? 'bg-white text-orange-500'
                : 'bg-orange-700 text-white hover:bg-orange-600'
            }`}
            onClick={() => setDuration('tahunan')}
          >
            Tahunan
          </button>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="!px-1"
          key={`${region}-${duration}`}
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-auto max-h-[55rem] md:max-h-[30rem] lg:max-h-[40rem] rounded-lg overflow-hidden shadow-md">
                <Image
                  src={img}
                  alt="Paket Internet"
                  layout="responsive"
                  width={800}
                  height={600}
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PaketInternet;
