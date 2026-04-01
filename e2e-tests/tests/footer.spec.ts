import { test, expect } from '@playwright/test';

test.describe('Footer', () => {
  test('Footer terlihat di halaman', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page.getByRole('contentinfo')).toBeVisible();
    await expect(page.getByAltText('IdPlay Logo')).toBeVisible();
  });
});
