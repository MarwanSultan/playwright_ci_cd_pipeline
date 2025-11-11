// fixtures.ts
import { test as base, Browser, Page, chromium, expect } from '@playwright/test';

type GlobalFixtures = {
  page: Page;
  browser: Browser;
};

export const test = base.extend<GlobalFixtures>({
  browser: [
    async ({}, use) => {
      const browser = await chromium.launch();
      console.log('Global browser launched');
      await use(browser); // provide the browser to tests
      await browser.close(); // closes after all tests
      console.log('Global browser closed');
    },
    { scope: 'worker' }, // run once per worker
  ],

  page: async ({ browser }, use) => {
    const page = await browser.newPage();
    await page.goto('https://www.amazon.com/');
    await use(page);
    await page.close(); // close page after all tests
  },
});

export { expect };
