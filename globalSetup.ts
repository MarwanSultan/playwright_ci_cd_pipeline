// globalSetup.ts
import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  console.log('Global setup: Launching browser and navigating to Amazon...');

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate to Amazon once before all tests
  await page.goto('https://www.amazon.com/');

  // Save the session/state so tests can use it
  await page.context().storageState({ path: 'storageState.json' });

  await browser.close();
  console.log('Global setup completed.');
}

export default globalSetup;
