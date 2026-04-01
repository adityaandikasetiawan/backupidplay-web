import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingSkeletonTestimoni: React.FC = () => (
  <div className="flex gap-6">
    {[...Array(6)].map((_, index) => (
      <div
        key={index}
        className="bg-white rounded-2xl p-6 w-[347px] mx-3 flex-shrink-0 shadow"
      >
        <Skeleton className="h-6 w-10 mb-2 bg-gray-200" />
        <Skeleton className="h-8 mb-2 w-2/3 bg-gray-200" />
        <Skeleton className="h-6 mb-3 w-full bg-gray-200" />
        <div className="flex items-center gap-3 mt-3">
          <Skeleton className="w-11 h-11 rounded-full bg-gray-200" />
          <div className="flex-1">
            <Skeleton className="h-4 mb-2 w-24 bg-gray-200" />
            <Skeleton className="h-3 mb-2 w-16" />
            <div className="flex gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="w-4 h-4 rounded"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default LoadingSkeletonTestimoni;
