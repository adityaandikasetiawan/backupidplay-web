import type { NextConfig } from "next";

// const isDevelopment = process.env.NODE_ENV === 'development';

const cmsUrlString = process.env.CMS_URL;

if (!cmsUrlString) {
  throw new Error("Environment variable CMS_URL is not set");
}

// STRAPI CLOUD MEDIA HOSTNAME CASE
const cmsUrl = new URL(cmsUrlString);
const cmsHostName = cmsUrl.hostname;
const cmsMediaHostname = cmsHostName.replace('strapiapp.com', 'media.strapiapp.com');

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.idplay.co.id',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      // CMS API uploads kalau pakai cloud media seperti strapi cloud
      {
        protocol: 'https',
        hostname: cmsMediaHostname,
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  // Local development: proxy /uploads to CMS_URL
  // async rewrites() {
  //   if (isDevelopment) {
  //     return [
  //       {
  //         source: '/uploads/:path*',
  //         destination: `${process.env.CMS_URL}/uploads/:path*`,
  //       },
  //     ];
  //   }
  //   return [];
  // }
};

export default nextConfig;