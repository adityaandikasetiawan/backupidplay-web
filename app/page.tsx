'use client';

import BannerSection from './_components/banner-section';
import FAQ from '@/app/_components/FAQ';
import HeroSection from './_components/Hero';
import TestimoniPelanggan from './_components/TestimoniPelanggan';
import CompareProduct from './_components/CompareProduct';
import CekCoverage from './_components/CekCoverage';
import ServicesSection from './_components/Services';
import ProductSection from './_components/Product';
import { useState } from 'react';
import { Metadata } from '@/app/type';

export default function Home() {
  const [pagination, setPagination] = useState<Metadata['pagination']>();
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  return (
    <div className="min-h-screen font-sans bg-white">
      <HeroSection />
      <BannerSection />
      <CekCoverage />
      <ServicesSection />
      <ProductSection />
      <TestimoniPelanggan />
      <FAQ />
      <CompareProduct />
    </div>
  );
}
