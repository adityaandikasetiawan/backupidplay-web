"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [agree, setAgree] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!agree) {
      setError("Anda harus menyetujui Syarat & Ketentuan");
      return;
    }

    if (!email || !password || !fullName) {
      setError("Semua kolom wajib diisi.");
      return;
    }

    setIsSubmitting(true);
    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}user/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            full_name: fullName,
          }),
        }
      );

      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        setError(data?.message || "Registrasi gagal. Periksa data Anda.");
        return;
      }

      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        router.push("/login");
      }, 3000);
    } catch (err) {
      setError("Terjadi kesalahan jaringan.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-[70vh] w-full bg-[#FFFBF9] relative">
      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-md z-50">
          Registrasi berhasil! Periksa email Anda.
        </div>
      )}
      <section className="mx-auto flex w-full max-w-md md:max-w-xl flex-col items-center px-4 sm:px-6 py-16 sm:py-20 md:py-24 text-center">
        <h1 className="text-2xl font-semibold text-neutral-900 md:text-[28px]">
          Buat Akun Baru
        </h1>
        <h2 className="mt-1 text-2xl font-semibold text-neutral-900 md:text-[28px]">
          idPlay
        </h2>
        <p className="mt-4 text-sm text-neutral-600">
          Silakan isi informasi berikut untuk mendaftar.
        </p>

        <form className="mt-8 w-full space-y-5" onSubmit={onSubmit}>
          <Input
            type="text"
            placeholder="Nama Lengkap"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="h-12 rounded-full border-0 bg-[#F3EBE7] px-5 text-[15px] placeholder:text-neutral-500"
          />

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

          {error ? (
            <p className="text-left text-sm text-red-600">{error}</p>
          ) : null}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-full bg-[#FF7A4A] text-white hover:bg-[#ff6b33] disabled:opacity-60"
          >
            {isSubmitting ? "Memproses..." : "Daftar"}
          </Button>

          <div className="flex items-start gap-3 pt-2 text-left">
            <Checkbox
              id="terms"
              checked={agree}
              onCheckedChange={(v) => setAgree(Boolean(v))}
              className="mt-0.5"
            />
            <label htmlFor="terms" className="text-sm text-neutral-600">
              Saya setuju dengan {" "}
              <Link href="#" className="font-medium text-neutral-800 underline">
                Syarat & Ketentuan
              </Link>
            </label>
          </div>

          <p className="pt-2 text-left text-sm text-neutral-600">
            Sudah punya akun? {" "}
            <Link href="/login" className="font-medium text-neutral-800 underline">
              Masuk di sini
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}