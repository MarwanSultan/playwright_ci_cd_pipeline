import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.amazon.com/');

  await expect(page.getByRole('link', { name: 'Hello, sign in Account & Lists' })).toBeVisible();
  await page.getByRole('searchbox', { name: 'Search Amazon' }).click();
  await page.getByRole('link', { name: 'Amazon', exact:true }).click();
  await page.getByRole('searchbox', { name: 'Search Amazon' }).fill('80\' TV');
  await page.getByRole('searchbox', { name: 'Search Amazon' }).press('Enter');
  await page.getByRole('button', { name: 'Go', exact: true }).click();
  await expect(page.getByRole('link', { name: 'Sponsored Ad - Sony 98 Inch' }).first()).toBeVisible();
});