import { NextRequest, NextResponse } from 'next/server';

const isValidCmsUrl = (value: string | undefined): value is string => {
  if (!value) return false;
  try {
    const url = new URL(value);
    if (url.port === '3003') return false;
    return true;
  } catch {
    return false;
  }
};

const normalizeCmsBaseUrl = (rawCmsBaseUrl: string): string => {
  try {
    const url = new URL(rawCmsBaseUrl);
    return url.origin;
  } catch {
    return rawCmsBaseUrl.replace(/\/+$/, '').replace(/\/api$/, '');
  }
};

const handleRequest = async (
  request: NextRequest,
  params: Promise<{ slug: string[] }>,
  method: string
) => {
  let debugTargetUrl: string | undefined;
  let debugCmsBaseUrl: string | undefined;
  try {
    const rawCmsBaseUrl = isValidCmsUrl(process.env.CMS_URL)
      ? process.env.CMS_URL
      : isValidCmsUrl(process.env.NEXT_PUBLIC_CMS_URL)
        ? process.env.NEXT_PUBLIC_CMS_URL
        : 'http://127.0.0.1:3032';

    const cmsBaseUrl = normalizeCmsBaseUrl(rawCmsBaseUrl);
    debugCmsBaseUrl = cmsBaseUrl;

    const resolvedParams = await params;
    const cmsPath = `/${resolvedParams.slug.join('/')}`;
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const fullPath = queryString ? `${cmsPath}?${queryString}` : cmsPath;

    const fetchOptions: RequestInit = {
      method,
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 60 },
    };
    if (['POST', 'PUT'].includes(method)) {
      fetchOptions.body = JSON.stringify(await request.json());
    }

    const targetUrl = `${cmsBaseUrl}/api${fullPath}`;
    debugTargetUrl = (() => {
      try {
        const url = new URL(targetUrl);
        url.username = '';
        url.password = '';
        return url.toString();
      } catch {
        return targetUrl;
      }
    })();
    const response = await fetch(targetUrl, fetchOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`CMS Proxy Error (${method}):`, error);
    const message = error instanceof Error ? error.message : String(error);
    const target = (() => {
      try {
        const url = new URL(request.url);
        return url.pathname;
      } catch {
        return undefined;
      }
    })();
    return NextResponse.json(
      {
        error: `Failed to ${method.toLowerCase()} CMS`,
        message,
        target,
        cmsBaseUrl: debugCmsBaseUrl,
        targetUrl: debugTargetUrl,
      },
      { status: 500 }
    );
  }
};

export const GET = (req: NextRequest, context: { params: Promise<{ slug: string[] }> }) =>
  handleRequest(req, context.params, 'GET');
export const POST = (req: NextRequest, context: { params: Promise<{ slug: string[] }> }) =>
  handleRequest(req, context.params, 'POST');
export const PUT = (req: NextRequest, context: { params: Promise<{ slug: string[] }> }) =>
  handleRequest(req, context.params, 'PUT');
export const DELETE = (req: NextRequest, context: { params: Promise<{ slug: string[] }> }) =>
  handleRequest(req, context.params, 'DELETE');
