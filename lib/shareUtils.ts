export interface SharePlatform {
  name: string;
  getUrl: (url: string, title: string) => string;
  icon: string;
  bgColor: string;
  hoverColor: string;
}

export const sharePlatforms: Record<string, SharePlatform> = {
  facebook: {
    name: 'Facebook',
    getUrl: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    icon: 'facebook',
    bgColor: 'bg-blue-600',
    hoverColor: 'hover:bg-blue-700'
  },
  x: {
    name: 'X',
    getUrl: (url: string, title: string) =>
      `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    icon: 'x',
    bgColor: 'bg-sky-500',
    hoverColor: 'hover:bg-sky-600'
  },
  linkedin: {
    name: 'LinkedIn',
    getUrl: (url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    icon: 'linkedin',
    bgColor: 'bg-blue-700',
    hoverColor: 'hover:bg-blue-800'
  }
};

export function getShareUrl(platform: string, url: string, title: string): string {
  const platformConfig = sharePlatforms[platform];
  if (!platformConfig) return '#';

  return platformConfig.getUrl(url, title);
}
