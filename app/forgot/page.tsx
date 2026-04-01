"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ForgotPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email.trim()) {
      setError("Email wajib diisi.");
      return;
    }

    setIsSubmitting(true);
    try {
      const resp = await fetch("/api/auth/password-reset/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ target_email: email.trim() }),
      });

      const data = await resp.json().catch(() => ({}));
      
      if (resp.status === 429) {
        setError("Terlalu banyak percobaan. Coba lagi nanti.");
        return;
      }
      
      if (!resp.ok) {
        setError(data?.message || "Gagal mengirim email reset password.");
        return;
      }

      setSuccess(email.trim());
      setEmail("");
      setCountdown(60);
    } catch (err) {
      if (err instanceof TypeError && err.message.includes('fetch')) {
        setError("Tidak dapat terhubung ke server. Periksa koneksi internet Anda.");
      } else {
        setError("Terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-[70vh] w-full bg-[#FFFBF9] font-sans">
      <section className="mx-auto flex w-full max-w-md md:max-w-xl flex-col items-center px-4 sm:px-6 py-16 sm:py-20 md:py-24 text-center">
        <h1 className="text-2xl font-semibold text-neutral-900 md:text-[28px]">
          Lupa Password
        </h1>

        <form className="mt-8 w-full space-y-5" onSubmit={onSubmit}>
          <div>
            <Input
              type="email"
              placeholder="Masukkan alamat email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-describedby={error ? "email-error" : undefined}
              className="h-12 rounded-full border-0 bg-[#F3EBE7] px-5 text-[15px] placeholder:text-neutral-500"
            />
          </div>

          {error && (
            <p id="email-error" className="text-left text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          {success && (
            <p className="text-left text-sm text-green-600" role="status">
              Email reset password telah dikirim ke 
              <span className="font-bold text-green-700">{success}</span>. 
              Silakan cek inbox Anda.
            </p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting || countdown > 0}
            className="h-12 w-full rounded-full bg-green-500 text-white hover:bg-green-600 disabled:opacity-60"
          >
            {isSubmitting 
              ? "Memproses..." 
              : countdown > 0 
              ? `Kirim ulang dalam ${countdown}s`
              : "Kirim"
            }
          </Button>

          <p className="pt-2 text-left text-sm text-neutral-600">
            Sudah ingat password?{" "}
            <Link href="/login" className="font-medium text-neutral-800 underline">
              Masuk di sini
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}