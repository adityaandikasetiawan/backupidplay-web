// API endpoint untuk file test speed internet
import { NextRequest, NextResponse } from 'next/server';

// Handler GET untuk mengirim file test sesuai ukuran yang diminta
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    // Ambil parameter size dari query, default 100KB
    const size = parseInt(searchParams.get('size') || '100');

    // Validasi ukuran file (minimal 10KB, maksimal 5000KB/5MB)
    const validSize = Math.max(10, Math.min(5000, size));

    // Generate data test sesuai ukuran (isi dengan karakter 'A')
    const dataSize = validSize * 1024; // Konversi ke byte
    const testData = Buffer.alloc(dataSize, 'A');

    // Header untuk mencegah cache dan mendukung CORS
    const headers = {
      'Content-Type': 'application/octet-stream',
      'Content-Length': dataSize.toString(),
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type'
    };

    // Kirim file test ke client
    return new NextResponse(testData, {
      status: 200,
      headers
    });
  } catch (error) {
    // Log error jika gagal generate file test
    console.error('Speed test API error:', error);
    return NextResponse.json({ error: 'Failed to generate test data' }, { status: 500 });
  }
}

// Handler OPTIONS untuk mendukung preflight CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
