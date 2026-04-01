import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { passwordSchema } from '@/lib/validations/password';
import { logApiError, logCaughtError } from '@/lib/logger';

const schema = z.object({
  new_password: passwordSchema,
});

export async function POST(req: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    logCaughtError({
      req,
      error: new Error('Missing environment variable: NEXT_PUBLIC_BASE_URL'),
      message: 'Server configuration error.'
    });
    return NextResponse.json(
      { error: { message: 'Server configuration error.', code: 'CONFIG_ERROR' } },
      { status: 500 }
    );
  }

  const urlPath = `${baseUrl}user/password/reset/submit`;

  try {
    const body = await req.json().catch(() => ({}));
    const { new_password } = schema.parse(body);

    const resp = await fetch(urlPath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ new_password }),
    });

    const data = await resp.json().catch(() => ({
      message: 'Invalid JSON response from server'
    }));

    if (!resp.ok) {
      logApiError({
        req,
        resp,
        data,
        message: 'API call to password-reset-submit endpoint failed.',
      });
      return NextResponse.json(
        { error: { message: data.message || 'An external API error occurred', code: 'API_ERROR' } },
        { status: resp.status }
      );
    }

    return NextResponse.json(data, { status: resp.status });

  } catch (error) {
    logCaughtError({
      req,
      error,
      message: 'An unexpected error occurred in the submit-form route.',
    });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: { message: error.issues[0].message, code: 'VALIDATION_ERROR' } },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: { message: 'Terjadi kesalahan server', code: 'SERVER_ERROR' } },
      { status: 500 }
    );
  }
}