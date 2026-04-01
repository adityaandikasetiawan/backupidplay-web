import { notFound } from 'next/navigation';
import { type Article } from '@/types/article';
import { getNewsBySlug, getRecentNews } from '@/lib/services/newsService';
import { resolveThumbnailUrl } from '@/lib/services/imageService';
import ArticleDetailHeader from '../../article/_components/detail/ArticleDetailHeader';
import ArticleContent from '../../article/_components/detail/ArticleContent';
import ShareSection from '../../article/_components/detail/ShareSection';
import RelatedArticles from '../../article/_components/detail/RelatedArticles';
import ProgressBar from '../../article/_components/detail/ProgressBar';
import TableOfContents from '../../article/_components/detail/TableOfContents';
import DiscoverSection from '@/app/article/_components/detail/DiscoverSection';

interface NewsDetailProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function NewsDetail({ params }: NewsDetailProps) {
  const { slug } = await params;
  
  let news: Article | null = null;
  let relatedNews: Article[] = [];
  
  try {
    news = await getNewsBySlug(slug);
    
    if (news) {
      relatedNews = await getRecentNews(news.id, 3);
    }
  } catch (error) {
    console.error('Error fetching from CMS:', error);
  }

  if (!news) {
    notFound();
  }

  return (
    <div className="min-h-screen font-sans bg-white">
      <ProgressBar />
      
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ArticleDetailHeader 
          article={news} 
          contentType="news"
        />
      </div>
      
      <div className="hidden 2xl:grid 2xl:grid-cols-[350px_1fr_350px]">
        {/* Table of Contents */}
        <div className="sticky top-24 h-fit overflow-y-auto p-8">
          <TableOfContents />
        </div>
        
        <div className="max-w-4xl mx-auto px-4">
          <ArticleContent article={news} />
        </div>
        
        <div></div>
      </div>
      
      {/* Mobile View */}
      <div className="2xl:hidden max-w-4xl mx-auto px-4">
        <ArticleContent article={news} />
      </div>
      
      {/* Share & Related News */}
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <ShareSection 
          article={news} 
          contentType="news"
        />
      </div>
      <div className='mx-auto px-4'>
        <DiscoverSection />
      </div>
      <div className="mx-auto px-4 pb-8">
        <RelatedArticles 
          currentArticle={news} 
          relatedArticles={relatedNews}
          contentType="news"
        />
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: NewsDetailProps) {
  const { slug } = await params;
  
  try {
    const news = await getNewsBySlug(slug);
    
    if (!news) {
      return {
        title: 'News Tidak Ditemukan - IdPlay'
      };
    }

    return {
      title: `${news.title} - IdPlay News`,
      description: news.description,
      openGraph: {
        title: news.title,
        description: news.description,
        images: news.thumbnail ? [resolveThumbnailUrl(news.thumbnail)] : [],
        type: 'article'
      }
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'News Tidak Ditemukan - IdPlay'
    };
  }
}

export async function generateStaticParams() {
  try {
    const { getNews } = await import('@/lib/services/newsService');
    const { data: cmsNews } = await getNews();

    if (cmsNews && cmsNews.length > 0) {
      return cmsNews.map((news: Article) => ({
        slug: news.slug
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error generating static params from CMS:', error);
    return [];
  }
}
