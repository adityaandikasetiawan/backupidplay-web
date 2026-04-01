import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Product } from '@/types/product';

interface ProductBenefitsProps {
  product: Product;
}

const ProductBenefits: React.FC<ProductBenefitsProps> = ({ product }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const ottBenefits = product.benefits?.filter(b => b.type === 'ott') || [];
  const umumBenefits = product.benefits?.filter(b => b.type === 'umum') || [];

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="space-y-3">
      {/* OTT Benefits */}
      {ottBenefits.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-gray-800">Benefits</h4>
            <button
              onClick={toggleCollapse}
              className="text-orange-500 hover:text-orange-600"
              aria-expanded={!isCollapsed}
              aria-controls={`benefits-${product.id}`}
              aria-label={isCollapsed ? 'Tampilkan manfaat' : 'Sembunyikan manfaat'}
            >
              <svg
                className={cn('w-5 h-5 transition-transform', isCollapsed ? 'rotate-180' : '')}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          <div
            id={`benefits-${product.id}`}
            className={cn(
              'space-y-3 overflow-hidden transition-all duration-300',
              isCollapsed ? 'max-h-0' : 'max-h-96'
            )}
          >
            {ottBenefits.map((benefit) => (
              <div key={benefit.id} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white">
                  <Check size={14} strokeWidth={3} />
                </span>
                <span className="text-sm text-gray-800">{benefit.name}</span>
              </div>
            ))}
            {umumBenefits.length > 0 && <div className="h-px w-full bg-orange-200 my-2" />}
          </div>
        </div>
      )}

      {/* Umum Benefits */}
      {umumBenefits.length > 0 && (
        <div>
          {ottBenefits.length === 0 && (
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-gray-800">Benefits</h4>
              <button
                onClick={toggleCollapse}
                className="text-orange-500 hover:text-orange-600"
                aria-expanded={!isCollapsed}
                aria-controls={`benefits-${product.id}`}
                aria-label={isCollapsed ? 'Tampilkan manfaat' : 'Sembunyikan manfaat'}
              >
                <svg
                  className={cn('w-5 h-5 transition-transform', isCollapsed ? 'rotate-180' : '')}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
          <div
            id={`benefits-${product.id}`}
            className={cn(
              'space-y-3 overflow-hidden transition-all duration-300',
              isCollapsed ? 'max-h-0' : 'max-h-96'
            )}
          >
            {umumBenefits.map((benefit) => (
              <div key={benefit.id} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white">
                  <Check size={14} strokeWidth={3} />
                </span>
                <span className="text-sm text-gray-800">{benefit.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductBenefits;