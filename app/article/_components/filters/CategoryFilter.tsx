import React from 'react';
import { Button } from '@/components/ui/button';
import { type Category } from '@/types/article';

interface CategoryFilterProps {
  selectedCategory: number | null;
  onCategoryChange: (categoryId: number | null) => void;
  categories: Category[];
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange, categories }) => {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={() => onCategoryChange(null)}
        variant={selectedCategory === null ? "default" : "outline"}
        size="sm"
        className={`rounded-full transition-colors duration-200 ${
          selectedCategory === null
            ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md'
            : 'border-gray-200 text-gray-700 hover:bg-gray-100'
        }`}
      >
        All Categories
      </Button>
      {categories.map((category: Category) => (
        <Button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          variant={selectedCategory === category.id ? "default" : "outline"}
          size="sm"
          className={`rounded-full transition-colors duration-200 ${
            selectedCategory === category.id
              ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md'
              : 'border-gray-200 text-gray-700 hover:bg-gray-100'
          }`}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
