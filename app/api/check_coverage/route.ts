import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://10.80.253.78:6868';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const latitude = url.searchParams.get('latitude');
    const longitude = url.searchParams.get('longitude');

    if (!latitude || !longitude) {
      return NextResponse.json(
        { error: 'Missing required query params: latitude and longitude' },
        { status: 400 }
      );
    }

    const upstreamUrl = `${BACKEND_URL}region/check_coverage?longitude=${encodeURIComponent(
      longitude
    )}&latitude=${encodeURIComponent(latitude)}`;

    const upstreamResponse = await fetch(upstreamUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      },
      // Avoid caching on both server and downstream
      cache: 'no-store'
    });

    const data = await upstreamResponse.json().catch(() => null);

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        { error: 'Upstream request failed', status: upstreamResponse.status, data },
        { status: upstreamResponse.status }
      );
    }

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        Pragma: 'no-cache',
        Expires: '0'
      }
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
