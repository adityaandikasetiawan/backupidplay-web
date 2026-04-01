import React from 'react';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/ui/loading';

interface LoadMoreButtonProps {
  onLoadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
  totalArticles: number;
  displayedArticles: number;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  onLoadMore,
  isLoading,
  hasMore,
}) => {
  if (!hasMore) return null;

  return (
    <div className="flex flex-col items-center mt-16 space-y-4">
      <div className="text-sm text-gray-500">
      </div>
      <Button
        onClick={onLoadMore}
        disabled={isLoading}
        size="lg"
        className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium"
      >
        {isLoading ? (
          <>
            <Loading size="sm" className="mr-2" />
            <span>Memuat...</span>
          </>
        ) : (
          'Lihat Lainnya'
        )}
      </Button>
    </div>
  );
};

export default LoadMoreButton;
