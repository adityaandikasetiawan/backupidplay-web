import { z } from 'zod';

export const passwordValidationRules = {
  minLength: 8,
  maxLength: 20,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSymbol: true,
};

export const passwordSchema = z
  .string()
  .min(passwordValidationRules.minLength, { message: 'Minimal 8 karakter.' })
  .max(passwordValidationRules.maxLength, { message: 'Maksimal 20 karakter.' })
  .refine((password) => /[A-Z]/.test(password), {
    message: 'Harus mengandung huruf kapital.'
  })
  .refine((password) => /[a-z]/.test(password), {
    message: 'Harus mengandung huruf kecil.'
  })
  .refine((password) => /[0-9]/.test(password), {
    message: 'Harus mengandung angka.'
  })
  .refine((password) => /[^a-zA-Z0-9]/.test(password), {
    message: 'Harus mengandung minimal 1 simbol.'
  });

export const validatePassword = (password: string) => {
  const result = passwordSchema.safeParse(password);
  return result.success ? [] : result.error.issues.map(issue => issue.message);
};

export const passwordResetFormSchema = z.object({
  newPassword: passwordSchema,
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Konfirmasi Password Baru harus sama dengan Password Baru.',
  path: ['confirmPassword'],
});