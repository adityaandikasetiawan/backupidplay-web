'use client';

import React from 'react';
import { Carousel } from './ui/carousel';

type Region = 'jawa' | 'sulawesi';

type PromosiProps = {
  region?: Region;
  slidesOverride?: { image: string; alt: string }[];
};

const defaultPromotionsByRegion: Record<Region, { image: string; alt: string }[]> = {
  jawa: [
    { image: '/promo-1.jpg', alt: 'Promo Jawa 1' },
    { image: '/promo-2.jpg', alt: 'Promo Jawa 2' },
    { image: '/promo-3.jpg', alt: 'Promo Jawa 3' }
  ],
  sulawesi: [
    { image: '/promo-1.jpg', alt: 'Promo Sulawesi 1' },
    { image: '/promo-2.jpg', alt: 'Promo Sulawesi 2' },
    { image: '/promo-3.jpg', alt: 'Promo Sulawesi 3' }
  ]
};

const Promosi: React.FC<PromosiProps> = ({ region, slidesOverride }) => {
  const slides = slidesOverride ?? (region ? defaultPromotionsByRegion[region] : [
    { image: '/promo-1.jpg', alt: 'Promo 1' },
    { image: '/promo-2.jpg', alt: 'Promo 2' },
    { image: '/promo-3.jpg', alt: 'Promo 3' },
  ]);

  return (
    <section className="py-16 pt-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-none mx-auto">
          <Carousel slides={slides} />
        </div>
      </div>
    </section>
  );
};

export default Promosi;
