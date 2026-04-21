import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'node:crypto';

export async function GET(req: NextRequest) {
  const sizeParam = req.nextUrl.searchParams.get('size');
  const sizeKb = Number.parseInt(sizeParam || '500', 10);

  if (!Number.isFinite(sizeKb) || Number.isNaN(sizeKb) || sizeKb <= 0) {
    return NextResponse.json({ error: { message: 'Invalid size parameter' } }, { status: 400 });
  }

  const cappedSizeKb = Math.min(sizeKb, 5000);
  const byteLength = cappedSizeKb * 1024;
  const buffer = randomBytes(byteLength);
  const body = new Uint8Array(buffer);

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Length': byteLength.toString(),
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      Pragma: 'no-cache',
      Expires: '0',
      'X-Content-Type-Options': 'nosniff',
      'Content-Encoding': 'identity'
    }
  });
}
