import React from 'react';

interface NewsHeaderProps {
  searchQuery: string;
  filteredNewsCount: number;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const NewsHeader: React.FC<NewsHeaderProps> = ({
  // searchQuery,
  // filteredNewsCount,
  // onSearchChange,
  // onSearchSubmit,
  // isLoading
}) => {
  return (
    <section className="py-4 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 mt-8 text-left">
          <h1 className="text-6xl md:text-8xl font-medium text-gray-900 mb-4">News</h1>
          <p className="text-base md:text-xl text-gray-600 max-w-3xl leading-relaxed">
            Stay updated with the latest news and press releases from IDPlay.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsHeader;
