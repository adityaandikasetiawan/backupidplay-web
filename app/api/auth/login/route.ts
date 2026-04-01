import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://10.80.253.78:6868';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email dan password wajib diisi' }, { status: 400 });
    }

    const resp = await fetch(`${BACKEND_URL}/api/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
      cache: 'no-store'
    });

    const data = await resp.json().catch(() => ({}));

    if (!resp.ok) {
      return NextResponse.json(
        { message: data?.message || 'Login gagal' },
        { status: resp.status }
      );
    }

    // Assume token is returned as data.token; adjust if backend differs
    const token: string | undefined = data?.token || data?.accessToken || data?.data?.token;

    const response = NextResponse.json({ success: true, user: data?.user ?? null });

    if (token) {
      response.cookies.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });
    }

    return response;
  } catch (error) {
    return NextResponse.json({ message: 'Terjadi kesalahan saat login' }, { status: 500 });
  }
}
