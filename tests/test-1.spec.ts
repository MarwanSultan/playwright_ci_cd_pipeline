import { test, expect } from '../fixtures';

test('test', async ({ page }) => {
  await page.getByRole('searchbox', { name: 'Search Amazon' }).click();
  await page.getByRole('searchbox', { name: 'Search Amazon' }).fill('Mac Mini');
  await page.getByRole('searchbox', { name: 'Search Amazon' }).press('Enter');
  await page.getByRole('button', { name: 'Go', exact: true }).click();
  await expect(page.locator('.a-link-normal.s-no-outline').first()).toBeVisible();
  
});