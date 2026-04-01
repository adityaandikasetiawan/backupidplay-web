import React from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from '@/components/ui/carousel';
import { Article } from '@/types/article';
import FeaturedArticle from './FeaturedArticle';

interface FeaturedArticleCarouselProps {
  articles: Article[];
}

const FeaturedArticleCarousel: React.FC<FeaturedArticleCarouselProps> = ({ articles }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const [api, setApi] = React.useState<any>(null);

  React.useEffect(() => {
    if (!api) return;
    
    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };
    
    api.on('select', onSelect);
    onSelect();
    
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  if (articles.length === 1) {
    return <FeaturedArticle article={articles[0]} />;
  }

  return (
    <div className="w-full">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {articles.map((article) => (
            <CarouselItem key={article.id}>
              <FeaturedArticle article={article} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
      
      {/* Dot pagination */}
      <div className="flex justify-center gap-2 mb-8">
        {articles.map((_, idx) => ( 
          <button
            key={idx}
            onClick={() => api?.scrollTo(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              activeIndex === idx ? 'bg-orange-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedArticleCarousel;