'use client';

import { useState, useEffect, Suspense, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { getRegions } from '@/lib/services/productService';
import type { Regional } from '@/types/product';

export type RegionType = string;

interface RegionOption {
  value: string;
  label: string;
}

interface RegionSelectorProps {
  onRegionChange: (region: RegionType) => void;
  selectedRegion: RegionType;
  className?: string;
}

function RegionSelectorContent({ onRegionChange, selectedRegion, className }: RegionSelectorProps) {
  const [regionOptions, setRegionOptions] = useState<RegionOption[]>([]);
  const [isLoadingRegions, setIsLoadingRegions] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchAndSetRegions = async () => {
      try {
        setFetchError(null);
        const regionsData: Regional[] = await getRegions();
        if (regionsData && Array.isArray(regionsData)) {
          const formattedRegions: RegionOption[] = regionsData.map((regional: Regional) => ({
            value: regional.region,
            label: regional.region
          }));
          setRegionOptions(formattedRegions);

          const regionFromQuery = searchParams.get('region');
          if (regionFromQuery && formattedRegions.some((r) => r.value === regionFromQuery)) {
            startTransition(() => onRegionChange(regionFromQuery));
          }
        }
      } catch (error) {
        console.error('Error fetching regions:', error);
        setFetchError('Gagal memuat wilayah. Silakan coba lagi.');
      } finally {
        setIsLoadingRegions(false);
      }
    };

    fetchAndSetRegions();
  }, [onRegionChange, searchParams]);

  const handleRegionClick = (regionValue: string) => {
    startTransition(() => onRegionChange(regionValue));
  };

  return (
    <div className={cn('mb-12 mt-6 flex flex-col items-center', className)}>
      <h3 className="text-xl font-bold text-gray-800 mb-2">Pilih Wilayah Anda:</h3>
      <p className="text-sm text-gray-500 mb-4">Setelah memilih wilayah, paket layanan akan otomatis ditampilkan.</p>

      {fetchError ? (
        <p className="text-red-500 text-sm mb-4">{fetchError}</p>
      ) : isLoadingRegions || isPending ? (
        <div className="flex items-center gap-2 bg-white rounded-lg p-2 shadow-md">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-orange-500 rounded-full animate-spin" />
          <span className="text-gray-500 text-sm">Memuat wilayah...</span>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center items-center gap-2 bg-white rounded-lg p-2 shadow-md">
          {regionOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleRegionClick(option.value)}
              className={cn(
                'px-4 lg:px-6 py-2 rounded-md text-sm lg:text-base font-semibold transition-all ease-in-out duration-300',
                selectedRegion === option.value
                  ? 'bg-green-600 text-white'
                  : 'bg-white hover:bg-green-200 text-black hover:text-green-600'
              )}
              aria-label={`Pilih wilayah ${option.label}`}
              disabled={isPending}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function RegionSelector({
  onRegionChange,
  selectedRegion,
  className
}: RegionSelectorProps) {
  return (
    <Suspense
      fallback={
        <div className={cn('mb-12 mt-6 flex flex-col items-center', className)}>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Pilih Wilayah Anda:</h3>
          <p className="text-sm text-gray-500 mb-4">Setelah memilih wilayah, paket layanan akan otomatis ditampilkan.</p>
          <div className="flex items-center gap-2 bg-white rounded-lg p-2 shadow-md">
            <div className="w-6 h-6 border-2 border-gray-300 border-t-orange-500 rounded-full animate-spin" />
            <span className="text-gray-500 text-sm">Memuat wilayah...</span>
          </div>
        </div>
      }
    >
      <RegionSelectorContent
        onRegionChange={onRegionChange}
        selectedRegion={selectedRegion}
        className={className}
      />
    </Suspense>
  );
}
