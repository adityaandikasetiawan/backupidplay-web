'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { validatePassword, passwordResetFormSchema } from '@/lib/validations/password';

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [passwordIssues, setPasswordIssues] = useState<string[]>([]);

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setNewPassword(value);
    const issues = validatePassword(value);
    setPasswordIssues(issues);
  }

  function handleConfirmPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setConfirmPassword(value);
    const result = passwordResetFormSchema.safeParse({ newPassword, confirmPassword: value });
    if (!result.success) {
      setPasswordIssues(result.error.issues.map((issue) => issue.message));
    } else {
      setPasswordIssues([]);
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formResult = passwordResetFormSchema.safeParse({ newPassword, confirmPassword });
    if (!formResult.success) {
      setError(formResult.error.issues[0].message);
      setPasswordIssues(formResult.error.issues.map((issue) => issue.message));
      return;
    }

    setIsSubmitting(true);
    try {
      const resp = await fetch('/api/auth/password-reset/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ new_password: newPassword.trim() })
      });

      const data = await resp.json().catch(() => ({}));

      if (resp.status === 429) {
        setError('Terlalu banyak percobaan. Coba lagi nanti.');
        return;
      }

      if (!resp.ok) {
        setError(data?.message || 'Gagal reset password.');
        return;
      }

      setSuccess('Password berhasil direset. Silakan login dengan password baru.');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordIssues([]);
    } catch (err) {
      if (err instanceof TypeError && err.message.includes('fetch')) {
        setError('Tidak dapat terhubung ke server. Periksa koneksi internet Anda.');
      } else {
        setError('Terjadi kesalahan. Silakan coba lagi.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-[70vh] w-full bg-[#FFFBF9] font-sans">
      <section className="mx-auto flex w-full max-w-md md:max-w-xl flex-col items-center px-4 sm:px-6 py-16 sm:py-20 md:py-24 text-center">
        <h1 className="text-2xl font-semibold text-neutral-900 md:text-[28px]">Reset Password</h1>
        <div
          role="alert"
          aria-live="polite"
          aria-atomic="true"
          className="mt-2 w-full rounded bg-yellow-100 border border-yellow-300 text-yellow-900 px-4 py-2 text-sm"
        >
          Hindari menggunakan password yang sudah pernah Anda gunakan di tempat lain untuk mencegah
          potensi risiko keamanan.
        </div>
        <form
          className="mt-8 w-full space-y-5"
          onSubmit={onSubmit}
        >
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Masukkan password baru"
              value={newPassword}
              onChange={handlePasswordChange}
              required
              className="h-12 rounded-full border-0 bg-[#F3EBE7] px-5 text-[15px] placeholder:text-neutral-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {passwordIssues.length > 0 && (
            <ul className="text-left text-xs text-red-600 space-y-1">
              {passwordIssues
                .filter(
                  (msg) => msg !== 'Konfirmasi Password Baru harus sama dengan Password Baru.'
                )
                .map((msg, idx) => (
                  <li key={idx}>{msg}</li>
                ))}
            </ul>
          )}
          <div className="relative">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Konfirmasi password baru"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="h-12 w-full rounded-full border-0 bg-[#F3EBE7] px-5 text-[15px] placeholder:text-neutral-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {passwordIssues.includes('Konfirmasi Password Baru harus sama dengan Password Baru.') && (
            <p className="mt-2 text-xs text-red-600 text-left" role="alert"
            >
              {passwordIssues.find(
                (msg) => msg === 'Konfirmasi Password Baru harus sama dengan Password Baru.'
              )}
            </p>
          )}
          {error && (
            <p className="text-left text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          {success && (
            <p className="text-left text-sm text-green-600" role="status">
              {success}
            </p>
          )}

          <div className="flex gap-3 w-full">
            <Button
              type="submit"
              disabled={
                isSubmitting ||
                !newPassword.trim() ||
                !confirmPassword.trim() ||
                passwordIssues.length > 0
              }
              className="h-12 flex-1 rounded-full bg-green-500 text-white hover:bg-green-600 disabled:opacity-60"
            >
              {isSubmitting ? 'Memproses...' : 'Reset Password'}
            </Button>
            <Link
              href="/login"
              className="flex-1"
            >
              <Button
                type="button"
                variant="outline"
                className="h-12 w-full rounded-full border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50"
              >
                Batal
              </Button>
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
