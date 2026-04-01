import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface ProductCardSkeletonProps {
  className?: string;
}

const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl shadow-lg overflow-hidden border border-transparent flex flex-col',
        className
      )}
      aria-busy="true"
      aria-label="Memuat kartu produk"
    >
      {/* Image Placeholder */}
      <Skeleton className="w-full bg-gray-50 rounded-t-2xl" style={{ minHeight: '90px' }} />

      {/* Name and Speed Placeholder */}
      <div className="p-4 text-center">
        <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
        <Skeleton className="h-5 w-1/2 mx-auto mb-1" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
      </div>

      {/* Price Placeholder */}
      <div className="flex flex-col justify-center items-center p-4 lg:p-6">
        <Skeleton className="h-6 w-1/3 mb-2" />
        <Skeleton className="h-8 w-1/2 mb-4" />
        <Skeleton className="h-5 w-2/3" />
      </div>

      {/* Benefits Placeholder */}
      <div className="mx-4 mb-4 rounded-xl bg-gray-50 border border-gray-100 p-4">
        <div className="space-y-3">
          {/* OTT Benefits */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </div>
            <div className="space-y-3">
              {[...Array(2)].map((_, i) => (
                <div key={`ott-${i}`} className="flex items-start gap-3">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>
          </div>

          <Skeleton className="h-px w-full my-2" />

          {/* Umum Benefits */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Skeleton className="h-4 w-1/3" />
              {false && <Skeleton className="h-5 w-5 rounded-full" />}
            </div>
            <div className="space-y-3">
              {[...Array(2)].map((_, i) => (
                <div key={`umum-${i}`} className="flex items-start gap-3">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <Skeleton className="h-0.5 w-full my-4" />
        <div className="flex items-center justify-around">
          <Skeleton className="h-4 w-16 rounded" />
          <Skeleton className="h-4 w-16 rounded" />
          <Skeleton className="h-4 w-16 rounded" />
        </div>
      </div>

      {/* Button Placeholder */}
      <div className="px-4 pb-6">
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;