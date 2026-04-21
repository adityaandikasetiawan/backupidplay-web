import { NextRequest, NextResponse } from 'next/server';

const normalizeBaseUrl = (value: string): string => value.trim().replace(/\/+$/, '');

const getUpstreamBases = (): string[] => {
  const bases: string[] = [];

  const primary = process.env.NEXT_PUBLIC_MEDIA_URL || 'https://idplay.co.id';
  if (primary) bases.push(primary);

  const fallbackCsv = process.env.MEDIA_FALLBACK_URLS || process.env.NEXT_PUBLIC_MEDIA_FALLBACK_URLS;
  if (fallbackCsv) {
    for (const raw of fallbackCsv.split(',')) {
      const trimmed = raw.trim();
      if (trimmed) bases.push(trimmed);
    }
  }

  return Array.from(new Set(bases.map(normalizeBaseUrl)));
};

const placeholderSvg = (label: string) =>
  `<?xml version="1.0" encoding="UTF-8"?>` +
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">` +
  `<rect width="1200" height="630" fill="#F3F4F6"/>` +
  `<rect x="60" y="60" width="1080" height="510" rx="24" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="2"/>` +
  `<path d="M180 435 L360 255 L480 375 L660 195 L840 375 L1020 255 L1020 435 Z" fill="#E5E7EB"/>` +
  `<circle cx="345" cy="222" r="42" fill="#D1D5DB"/>` +
  `<text x="600" y="505" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial" font-size="28" fill="#6B7280">` +
  `${label.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}` +
  `</text>` +
  `</svg>`;

const buildUpstreamUrls = (pathParts: string[], search: string): string[] => {
  const safeParts = pathParts.filter((p) => p && !p.includes('..'));
  const path = safeParts.map(encodeURIComponent).join('/');
  const suffix = search ? `?${search}` : '';
  return getUpstreamBases().map((base) => `${base}/uploads/${path}${suffix}`);
};

const fetchFirstImage = async (urls: string[]) => {
  for (const url of urls) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);
    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
        },
        cache: 'no-store',
      });

      const contentType = response.headers.get('content-type') ?? '';
      if (!response.ok) continue;
      if (!contentType.startsWith('image/')) continue;

      const body = await response.arrayBuffer();
      return { contentType, body };
    } catch {
      continue;
    } finally {
      clearTimeout(timeout);
    }
  }

  return null;
};

const respondImage = (contentType: string, body?: ArrayBuffer | Uint8Array, cacheControl?: string) => {
  const headers: Record<string, string> = {
    'content-type': contentType,
    'cache-control': cacheControl ?? 'public, max-age=60',
  };
  const normalizedBody: ArrayBuffer | null = (() => {
    if (!body) return null;
    if (body instanceof ArrayBuffer) return body;
    return body.slice().buffer as ArrayBuffer;
  })();
  return new NextResponse(normalizedBody, { status: 200, headers });
};

export const GET = async (request: NextRequest, context: { params: Promise<{ path: string[] }> }) => {
  const { path } = await context.params;
  const urls = buildUpstreamUrls(path, request.nextUrl.searchParams.toString());
  const result = await fetchFirstImage(urls);
  if (result) return respondImage(result.contentType, result.body, 'public, max-age=86400');
  const svg = placeholderSvg('Gambar sementara tidak tersedia');
  return respondImage('image/svg+xml; charset=utf-8', new TextEncoder().encode(svg), 'public, max-age=60');
};

export const HEAD = async (request: NextRequest, context: { params: Promise<{ path: string[] }> }) => {
  const { path } = await context.params;
  const urls = buildUpstreamUrls(path, request.nextUrl.searchParams.toString());
  const result = await fetchFirstImage(urls);
  if (result) return respondImage(result.contentType, undefined, 'public, max-age=86400');
  return respondImage('image/svg+xml; charset=utf-8', undefined, 'public, max-age=60');
};
