import React from 'react';

interface BlogHeaderProps {
  searchQuery: string;
  selectedCategory: number | null;
  filteredArticlesCount: number;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onCategoryChange: (categoryId: number | null) => void;
  isLoading: boolean;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({
}) => {
  return (
    <section className="py-4 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 mt-8 text-left">
          <h1 className="text-6xl md:text-8xl font-medium text-gray-900 mb-4">Blog</h1>
          <p className="text-base md:text-xl text-gray-600 max-w-3xl leading-relaxed">
            Cek berita terbaru kita!
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogHeader;
