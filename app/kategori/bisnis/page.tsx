'use client';

import { useState } from 'react';
import Image from 'next/image';
import CompareProduct from '@/app/_components/CompareProduct';
import KeunggulanKamiSection from '@/app/_components/KeunggulanSection';
import ProductFacts from '../_component/ProductFacts';
import ProductFilters from '../_component/ProductFilters';
import RegionSelector, { type RegionType } from '../_component/RegionSelector';

export default function Kategori() {
  const [selectedRegion, setSelectedRegion] = useState<RegionType>('');
  const [selectedSpeedRange, setSelectedSpeedRange] = useState<{
    min?: number;
    max?: number;
  } | null>(null);
  const [selectedBillingCycle, setSelectedBillingCycle] = useState<'Bulanan' | 'Tahunan' | 'Promo' | null>(
    null
  );

  return (
    <div className="min-h-screen font-sans bg-white">
      <div className="relative container mx-auto lg:pt-14">
        <Image
          src="/imgs/Bisnis.webp"
          width={1000}
          height={1000}
          alt="Kategori Bisnis"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Section Keunggulan */}
      <KeunggulanKamiSection />

      <div className="container mx-auto px-4 mt-8">
        <div className="py-14 pb-20 rounded-2xl bg-[#FFEFE6] mb-8">
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

          <div className="flex justify-center">
            <RegionSelector
              selectedRegion={selectedRegion}
              onRegionChange={setSelectedRegion}
            />
          </div>

          {selectedRegion && (
            <>
              <div className="mt-8">
                <ProductFilters
                  region={selectedRegion}
                  selectedSpeedRange={selectedSpeedRange}
                  selectedBillingCycle={selectedBillingCycle}
                  onSpeedRangeChange={setSelectedSpeedRange}
                  onBillingCycleChange={setSelectedBillingCycle}
                />
              </div>
              <div className="mt-8">
                <ProductFacts
                  region={selectedRegion}
                  selectedSpeedRange={selectedSpeedRange || undefined}
                  selectedBillingCycle={selectedBillingCycle || undefined}
                  noMargin={true}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <CompareProduct />
    </div>
  );
}
