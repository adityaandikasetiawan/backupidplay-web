import { test, expect } from '@playwright/test';

test.describe('Navigasi', () => {
  test('Navbar terlihat', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page.getByRole('navigation')).toBeVisible();
  });

  test('Buka dropdown Berita & Informasi lalu ke Blog', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.getByRole('button', { name: 'Berita & Informasi' }).hover();
    await expect(page.getByRole('link', { name: 'Blog & Artikel' })).toBeVisible();
    await page.getByRole('link', { name: 'Blog & Artikel' }).click();
    await expect(page.getByRole('heading', { name: 'Blog', level: 1 })).toBeVisible();
  });

  test('Buka dropdown Berita & Informasi lalu ke News', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.getByRole('button', { name: 'Berita & Informasi' }).hover();
    await expect(page.getByRole('link', { name: 'Berita' })).toBeVisible();
    await page.getByRole('link', { name: 'Berita' }).click();
    await expect(page.getByRole('heading', { name: 'News', level: 1 })).toBeVisible();
  });
});
