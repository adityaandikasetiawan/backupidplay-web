import React from 'react';
import NewsCard from '../cards/NewsCard';
import { type Article } from '@/types/article';

interface NewsGridProps {
  news: Article[];
  showBreaking?: boolean;
}

const NewsGrid: React.FC<NewsGridProps> = ({ news, showBreaking = true }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {news.map((news: Article) => (
        <NewsCard
          key={news.id}
          news={news}
          showBreaking={showBreaking}
        />
      ))}
    </div>
  );
};

export default NewsGrid;
