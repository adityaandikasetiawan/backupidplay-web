import React from 'react';
import { type Category, type Article } from '@/types/article';
import ArticleGrid from './ArticleGrid';

interface ArticlesByCategoryProps {
  articlesByCategory: { [key: number]: Article[] };
  categories: Category[];
  onCategoryFilter: (categoryId: number) => void;
}

const ArticlesByCategory: React.FC<ArticlesByCategoryProps> = ({
  articlesByCategory,
  categories,
  onCategoryFilter
}) => {
  return (
    <div className="space-y-16">
      {categories
        .filter((category) => articlesByCategory[category.id]?.length > 0)
        .map((category: Category) => (
          <div key={category.id}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{category.name}</h2>
                <div className="w-20 h-1 bg-blue-600 mt-2"></div>
              </div>
            </div>

            <ArticleGrid
              articles={articlesByCategory[category.id].slice(0, 6)}
              showCategory={false}
            />

            {articlesByCategory[category.id].length > 6 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => onCategoryFilter(category.id)}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  View All {category.name} Articles
                  <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                    {articlesByCategory[category.id].length}
                  </span>
                </button>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default ArticlesByCategory;
