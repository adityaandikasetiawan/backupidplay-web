import React from 'react';

interface NewsEmptyStateProps {
  searchQuery?: string;
}

const NewsEmptyState: React.FC<NewsEmptyStateProps> = ({ searchQuery }) => {
  return (
    <div className="text-center py-20">
      <h3 className="text-3xl font-bold text-gray-900 mb-4">No Result</h3>
      <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
        {searchQuery
          ? `No news match your search "${searchQuery}"`
          : 'No news available at the moment'}
      </p>
    </div>
  );
};

export default NewsEmptyState;
