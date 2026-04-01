import { test, expect } from '@playwright/test';

test.describe('IDPlay CMS Tests', () => {
  test('CMS Admin Panel loads', async ({ page }) => {
    await page.goto('http://localhost:1337/admin');
    await expect(page).toHaveTitle(/Strapi|Admin|Login/i);
  });
});
