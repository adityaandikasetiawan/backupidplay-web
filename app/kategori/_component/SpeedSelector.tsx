import { getSpeedRanges } from '@/lib/services/productService';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

interface SpeedSelectorProps {
  region: string | null;
  selectedSpeedRange: { min?: number; max?: number } | null;
  onSpeedRangeChange: (range: { min?: number; max?: number } | null) => void;
  loading?: boolean;
}

const SpeedSelector: React.FC<SpeedSelectorProps> = ({
  region,
  selectedSpeedRange,
  onSpeedRangeChange,
  loading = false
}) => {
  const [speedOptions, setSpeedOptions] = useState<number[]>([]);
  const [loadingSpeedOptions, setLoadingSpeedOptions] = useState(false);

  useEffect(() => {
    const fetchSpeedOptions = async () => {
      if (!region) {
        setSpeedOptions([]);
        return;
      }

      setLoadingSpeedOptions(true);
      try {
        const speedData = await getSpeedRanges(region);
        setSpeedOptions(speedData.options);
      } catch (error) {
        console.error('Error fetching speed options:', error);
        setSpeedOptions([]);
      } finally {
        setLoadingSpeedOptions(false);
      }
    };

    fetchSpeedOptions();
  }, [region]);
  return (
    <div className="flex justify-center mb-6">
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-wrap items-center justify-center gap-2 bg-white rounded-lg p-2 shadow-md max-w-4xl">
          {loadingSpeedOptions ? (
            [...Array(5)].map((_, i) => (
              <div
                key={i}
                className="px-4 py-2 rounded-md bg-gray-200 w-24 h-8 animate-pulse"
              />
            ))
          ) : speedOptions.length > 0 ? (
            <div className="grid grid-cols-3 gap-2 w-full md:flex md:flex-wrap md:items-center md:justify-center md:gap-2">
              {speedOptions.map((speed) => {
                const isSelected =
                  selectedSpeedRange?.min === speed && selectedSpeedRange?.max === speed;
                return (
                  <button
                    key={speed}
                    onClick={() => {
                      if (isSelected) {
                        onSpeedRangeChange(null);
                      } else {
                        onSpeedRangeChange({ min: speed, max: speed });
                      }
                    }}
                    disabled={loadingSpeedOptions || loading}
                    className={cn(
                      'px-2 lg:px-4 py-2 rounded-md text-sm lg:text-base font-semibold transition-all ease-in-out duration-300',
                      // 'px-2 py-1 text-xs rounded-md font-semibold transition-all ease-in-out duration-300 md:px-4 md:py-2 md:text-sm lg:text-base',
                      isSelected
                        ? 'bg-orange-500 text-white'
                        : 'bg-white hover:bg-orange-200 text-black hover:text-orange-600'
                    )}
                    aria-label={`Pilih kecepatan ${speed} Mbps`}
                  >
                    {speed} Mbps
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-gray-500 text-sm">Tidak ada opsi kecepatan.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeedSelector;
