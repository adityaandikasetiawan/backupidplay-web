import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.toLowerCase() ?? '';
  const hostname = host.split(':')[0] ?? '';

  const isLocal =
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '0.0.0.0' ||
    hostname === '10.1.1.33' ||
    hostname === '10.80.253.214' ||
    hostname === '103.135.224.125' ||
    /^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname) ||
    /^192\.168\.\d{1,3}\.\d{1,3}$/.test(hostname) ||
    /^172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}$/.test(hostname);

  const isAllowedDomain =
    hostname === 'idplay.co.id' ||
    hostname === 'www.idplay.co.id' ||
    hostname === 'dev.idplay.co.id' ||
    hostname === 'www.dev.idplay.co.id';

  if (!isLocal && !isAllowedDomain) {
    const url = request.nextUrl.clone();
    url.hostname = 'idplay.co.id';
    url.port = '';
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
