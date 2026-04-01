import { notFound } from 'next/navigation';
import { type Article } from '@/types/article';
import { getArticleBySlug, getRelatedArticles } from '@/lib/services/articleService';
import { resolveThumbnailUrl } from '@/lib/services/imageService';
import ArticleDetailHeader from '../_components/detail/ArticleDetailHeader';
import ArticleContent from '../_components/detail/ArticleContent';
import ShareSection from '../_components/detail/ShareSection';
import RelatedArticles from '../_components/detail/RelatedArticles';
import ProgressBar from '../_components/detail/ProgressBar';
import TableOfContents from '../_components/detail/TableOfContents';
import DiscoverSection from '../_components/detail/DiscoverSection';

interface ArticleDetailProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticleDetail({ params }: ArticleDetailProps) {
  const { slug } = await params;
  
  let article: Article | null = null;
  let relatedArticles: Article[] = [];
  
  try {
    article = await getArticleBySlug(slug);
    
    if (article) {
      const firstCategory = article.categories?.[0];
      if (firstCategory) {
        relatedArticles = await getRelatedArticles(firstCategory.id, article.id);
      }
    }
  } catch (error) {
    console.error('Error fetching from CMS:', error);
  }

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen font-sans bg-white">
      <ProgressBar />
      
      {/* Header Article */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ArticleDetailHeader 
          article={article} 
          contentType="article"
        />
      </div>
      
      <div className="hidden 2xl:grid 2xl:grid-cols-[350px_1fr_350px]">
        {/* Table of Contents */}
        <div className="sticky top-24 h-fit overflow-y-auto p-8">
          <TableOfContents />
        </div>
        
        <div className="max-w-4xl mx-auto px-4">
          <ArticleContent article={article} />
        </div>
        
        <div></div>
      </div>
      
      {/* Mobile View */}
      <div className="2xl:hidden max-w-4xl mx-auto px-4">
        <ArticleContent article={article} />
      </div>
      
      {/* Share & Discover & Related Articles */}
      <div className="mx-auto px-4 pt-8">
        <ShareSection 
          article={article} 
          contentType="article"
        />
      </div>
      <div className='mx-auto px-4'>
        <DiscoverSection />
      </div>
      <div className="mx-auto px-4 pb-8">
        <RelatedArticles 
          currentArticle={article} 
          relatedArticles={relatedArticles}
          contentType="article"
        />
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: ArticleDetailProps) {
  const { slug } = await params;
  
  try {
    const article = await getArticleBySlug(slug);
    
    if (!article) {
      return {
        title: 'Artikel Tidak Ditemukan - IdPlay'
      };
    }

    return {
      title: `${article.title} - IdPlay Blog`,
      description: article.description,
      openGraph: {
        title: article.title,
        description: article.description,
        images: article.thumbnail ? [resolveThumbnailUrl(article.thumbnail)] : [],
        type: 'article'
      }
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Artikel Tidak Ditemukan - IdPlay'
    };
  }
}

export async function generateStaticParams() {
  try {
    const { getArticles } = await import('@/lib/services/articleService');
    const { data: cmsArticles } = await getArticles();

    if (cmsArticles && cmsArticles.length > 0) {
      return cmsArticles.map((article: Article) => ({
        slug: article.slug
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error generating static params from CMS:', error);
    return [];
  }
}
