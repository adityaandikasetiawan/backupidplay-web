"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

function LoginRedirectHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Semua kolom wajib diisi.");
      return;
    }

    setIsSubmitting(true);
    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}user/login?apps_id=IDMALL_CUSTOMER`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        setError(data?.message || "Login gagal. Periksa kredensial Anda.");
        return;
      }

      if (data.status === "success" && data.data) {
        login(data.data);
        const redirect = searchParams.get("redirect");
        router.push(redirect || "/dashboard");
      } else {
        setError("Login gagal. Periksa kredensial Anda.");
      }
    } catch (err) {
      setError("Terjadi kesalahan jaringan.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="mt-8 w-full space-y-5" onSubmit={onSubmit}>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="h-12 rounded-full border-0 bg-[#F3EBE7] px-5 text-[15px] placeholder:text-neutral-500"
      />

      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="h-12 rounded-full border-0 bg-[#F3EBE7] px-5 text-[15px] placeholder:text-neutral-500"
      />

      {error ? <p className="text-left text-sm text-red-600">{error}</p> : null}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-full bg-green-500 text-white hover:bg-green-600 disabled:opacity-60"
      >
        {isSubmitting ? "Memproses..." : "Masuk"}
      </Button>

      <p className="pt-2 text-left text-sm text-neutral-600">
        Belum punya akun?{" "}
        <Link href="/register" className="font-medium text-neutral-800 underline">
          Daftar di sini
        </Link>
      </p>
      <p className="pt-2 text-left text-sm text-neutral-600">
        <Link href="/forgot" className="font-medium text-neutral-800 underline">
          Lupa Password?
        </Link>
      </p>
    </form>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-[70vh] w-full bg-[#FFFBF9]">
      <section className="mx-auto flex w-full max-w-md md:max-w-xl flex-col items-center px-4 sm:px-6 py-16 sm:py-20 md:py-24 text-center">
        <h1 className="text-2xl font-semibold text-neutral-900 md:text-[28px]">
          Masuk ke Akun idPlay
        </h1>
        <p className="mt-4 text-sm text-neutral-600">
          Akses tagihan, pengaturan layanan, dan lainnya.
        </p>

        {/* Wrap the component that uses useSearchParams in Suspense */}
        <Suspense fallback={<div>Loading...</div>}>
          <LoginRedirectHandler />
        </Suspense>
      </section>
    </main>
  );
}