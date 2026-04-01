import React from 'react';
import Image from 'next/image';
import { FaShare, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { type Article } from '@/types/article';
import { sharePlatforms, getShareUrl } from '@/lib/shareUtils';
import { resolveAvatarUrl } from '@/lib/services/imageService';
import { getContentType, getContentText, type ContentType } from '@/lib/contentTypeUtils';

interface ShareSectionProps {
  article: Article;
  contentType?: ContentType;
}

interface ShareButtonProps {
  platform: string;
  url: string;
  title: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ platform, url, title }) => {
  const platformConfig = sharePlatforms[platform];

  if (!platformConfig) return null;

  const getIcon = () => {
    switch (platform) {
      case 'facebook':
        return <FaFacebook />;
      case 'x':
        return <FaXTwitter />;
      case 'linkedin':
        return <FaLinkedin />;
      default:
        return <FaShare />;
    }
  };

  return (
    <a
      href={getShareUrl(platform, url, title)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors ${platformConfig.bgColor} ${platformConfig.hoverColor}`}
    >
      {getIcon()}
      <span className="capitalize">{platform}</span>
    </a>
  );
};

const ShareSection: React.FC<ShareSectionProps> = ({ article, contentType }) => {
  const detectedType = getContentType(contentType);
  
  const contentText = getContentText(detectedType);
  
  const articleUrl = detectedType === 'news' 
    ? `https://idplay.co.id/news/${article.slug}`
    : `https://idplay.co.id/article/${article.slug}`;
  
  const authorData = (article as any).author ?? (article as any).user;
  const avatarData = authorData?.avatar;
  const avatar = resolveAvatarUrl(avatarData);
  const authorName = authorData?.name ?? 'Admin IdPlay';
  const authorInterest = authorData?.interest ?? 'Content Writer';
  const authorDescription = authorData?.description ?? '';

  return (
    <div className="max-w-4xl mx-auto">
      <div className="my-2 py-8 border-t border-b border-gray-200">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            {contentText.shareTitle}
          </h3>
          <div className="flex gap-2 sm:gap-3">
            <ShareButton
              platform="facebook"
              url={articleUrl}
              title={article.title}
            />
            <ShareButton
              platform="x"
              url={articleUrl}
              title={article.title}
            />
            <ShareButton
              platform="linkedin"
              url={articleUrl}
              title={article.title}
            />
          </div>
        </div>
        
        {/* Author info */}
        <div className="bg-gray-50 rounded-xl p-3 sm:p-6 mt-8">
          <div className="flex items-center gap-4">
            {avatar ? (
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                <Image
                  src={avatar}
                  alt={authorName}
                  width={80}
                  height={80}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="8" r="4" fill="#9ca3af"/>
                  <rect x="6" y="16" width="12" height="4" rx="2" fill="#9ca3af"/>
                </svg>
              </div>
            )}
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 text-lg mb-1">
                {authorName}
              </h4>
              <p className="text-gray-600 mb-2">
                {authorInterest}
              </p>
              <p className="text-gray-700 text-sm">
                {authorDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareSection;
