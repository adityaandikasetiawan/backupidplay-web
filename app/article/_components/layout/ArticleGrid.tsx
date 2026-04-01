import React from 'react';
import { type Article } from '@/types/article';
import ArticleCard from '../cards/ArticleCard';

interface ArticleGridProps {
  articles: Article[];
  showCategory?: boolean;
}

const ArticleGrid: React.FC<ArticleGridProps> = ({ articles, showCategory = false }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article: Article) => (
        <ArticleCard
          key={article.id}
          article={article}
          showCategory={showCategory}
        />
      ))}
    </div>
  );
};

export default ArticleGrid;
