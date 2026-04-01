import React from 'react';
import { cn } from '@/lib/utils';
import SpeedSelector from './SpeedSelector';

interface ProductFiltersProps {
  region: string | null;
  selectedSpeedRange: { min?: number; max?: number } | null;
  selectedBillingCycle: 'Bulanan' | 'Tahunan' | 'Promo' | null;
  onSpeedRangeChange: (range: { min?: number; max?: number } | null) => void;
  onBillingCycleChange: (cycle: 'Bulanan' | 'Tahunan' | 'Promo' | null) => void;
  loading?: boolean;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  region,
  selectedSpeedRange,
  selectedBillingCycle,
  onSpeedRangeChange,
  onBillingCycleChange,
  loading = false
}) => {

  return (
    <div className="">
      {/* Billing Cycle Filter */}
      <div className="flex justify-center mb-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 bg-white rounded-lg p-2 shadow-md">
            <button
              onClick={() => {
                if (selectedBillingCycle === 'Bulanan') {
                  onBillingCycleChange(null);
                } else {
                  onBillingCycleChange('Bulanan');
                }
              }}
              disabled={loading}
              className={cn(
                'px-4 lg:px-6 py-2 rounded-md text-sm lg:text-base font-semibold transition-all ease-in-out duration-300',
                selectedBillingCycle === 'Bulanan'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white hover:bg-orange-200 text-black hover:text-orange-500'
              )}
              aria-label="Pilih periode tagihan bulanan"
            >
              Bulan
            </button>
            <button
              onClick={() => {
                if (selectedBillingCycle === 'Tahunan') {
                  onBillingCycleChange(null);
                } else {
                  onBillingCycleChange('Tahunan');
                }
              }}
              disabled={loading}
              className={cn(
                'px-4 lg:px-6 py-2 rounded-md text-sm lg:text-base font-semibold transition-all ease-in-out duration-300',
                selectedBillingCycle === 'Tahunan'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white hover:bg-orange-200 text-black hover:text-orange-500'
              )}
              aria-label="Pilih periode tagihan tahunan"
            >
              Tahun
            </button>
            <button
              onClick={() => {
                if (selectedBillingCycle === 'Promo') {
                  onBillingCycleChange(null);
                } else {
                  onBillingCycleChange('Promo');
                }
              }}
              disabled={loading}
              className={cn(
                'px-4 lg:px-6 py-2 rounded-md text-sm lg:text-base font-semibold transition-all ease-in-out duration-300',
                selectedBillingCycle === 'Promo'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white hover:bg-orange-200 text-black hover:text-orange-500'
              )}
              aria-label="Pilih paket promo"
            >
              Promo
            </button>
          </div>
        </div>
      </div>

      <SpeedSelector
        region={region}
        selectedSpeedRange={selectedSpeedRange}
        onSpeedRangeChange={onSpeedRangeChange}
        loading={loading}
      />

      {/* Clear All Filters */}
      {(selectedSpeedRange || selectedBillingCycle) && (
        <div className="flex justify-center">
          <button
            onClick={() => {
              onSpeedRangeChange(null);
              onBillingCycleChange(null);
            }}
            className="text-orange-600 hover:text-orange-800 font-medium text-sm bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
            aria-label="Hapus semua filter"
          >
            Hapus Semua Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;
