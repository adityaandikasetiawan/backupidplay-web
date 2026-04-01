import { test, expect } from '@playwright/test';

test.describe('Kategori', () => {
  test('Navigasi ke Kategori Rumah', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.getByRole('button', { name: 'Kategori' }).click();
    await expect(page.getByRole('link', { name: 'Rumah' })).toBeVisible();
    await page.getByRole('link', { name: 'Rumah' }).click();
    await expect(page.getByAltText('Kategori Rumah')).toBeVisible();
    await expect(page.getByText('Mulai Berlangganan')).toBeVisible();
  });
});
