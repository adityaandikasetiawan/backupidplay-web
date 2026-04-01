import { test, expect } from '@playwright/test';

test.describe('Autentikasi', () => {
  test('Navigasi ke halaman Login', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.getByRole('link', { name: 'Sign In' }).click();
    await expect(page.getByRole('heading', { name: /Masuk ke Akun idPlay/i, level: 1 })).toBeVisible();
    await expect(page.getByPlaceholder('Email')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
  });
});
