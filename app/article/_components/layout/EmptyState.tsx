import React from 'react';

interface EmptyStateProps {
  searchQuery: string;
  selectedCategory: number | null;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  searchQuery,
  selectedCategory
}) => {
  return (
    <div className="text-center py-20">
      <h3 className="text-3xl font-bold text-gray-900 mb-4">No Result</h3>
      <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
        {searchQuery
          ? `No articles match your search "${searchQuery}"`
          : selectedCategory
            ? `No articles found in this category`
            : 'No articles available at the moment'}
      </p>
    </div>
  );
};

export default EmptyState;
