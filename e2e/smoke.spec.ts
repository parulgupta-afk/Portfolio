import { test, expect } from '@playwright/test';

test.describe('Portfolio smoke', () => {
  test('hero and primary journey', async ({ page }) => {
    await page.goto('/');
    // Skip boot/intro if present
    const skip = page.getByRole('button', { name: /skip/i }).first();
    if (await skip.isVisible().catch(() => false)) {
      await skip.click();
    }
    await expect(page.getByRole('heading', { name: /Parul Gupta/i }).first()).toBeVisible({ timeout: 15000 });
    await expect(page.locator('#projects')).toBeVisible();
    await page
      .locator('#projects button')
      .filter({ hasText: /Priceloop|PriceLoop/i })
      .first()
      .click();
    await expect(page.getByText(/Price|FastAPI|track/i).first()).toBeVisible({ timeout: 5000 });
    await page.keyboard.press('Escape');
  });

  test('command center opens with Control+K', async ({ page }) => {
    await page.goto('/');
    const skip = page.getByRole('button', { name: /skip/i }).first();
    if (await skip.isVisible().catch(() => false)) await skip.click();
    await page.keyboard.press('Control+k');
    await expect(page.getByPlaceholder(/Search portfolio/i)).toBeVisible({ timeout: 5000 });
    await page.keyboard.press('Escape');
  });
});
