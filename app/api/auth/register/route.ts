import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://10.80.253.78:6868";

export async function POST(request: Request) {
  try {
    const { email, password, first_name, last_name } = await request.json();

    if (!email || !password || !first_name || !last_name) {
      return NextResponse.json(
        { message: "Email, password, first_name, dan last_name wajib diisi" },
        { status: 400 }
      );
    }

    const resp = await fetch(`${BACKEND_URL}/api/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, first_name, last_name }),
      cache: "no-store",
    });

    const data = await resp.json().catch(() => ({}));

    if (!resp.ok) {
      return NextResponse.json(
        { message: data?.message || "Registrasi gagal" },
        { status: resp.status }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan saat registrasi" },
      { status: 500 }
    );
  }
}