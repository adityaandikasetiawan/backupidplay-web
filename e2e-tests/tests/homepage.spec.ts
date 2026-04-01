import { test, expect } from '@playwright/test';

test.describe('IDPlay Homepage Tests', () => {
  test('Homepage loads successfully', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page).toHaveTitle(/IDPlay|Home/i);
    await page.screenshot({ path: 'homepage-screenshot.png' });
  });

  test('Navigation check', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page.getByRole('navigation')).toBeVisible();
  });
});
