const base = require('@playwright/test');
 
const test = base.test.extend({
  browser: async ({}: any, use: (arg0: any) => Promise<void>) => {
    const browser = await base.chromium.launch({ headless: false });
    await use(browser);
    await browser.close();
  },
});
 
test('Open Facebook and check title', async function ({ browser }: { browser: any }) {
        const page = await browser.newPage();
        await page.goto('https://www.amazon.com/');
        const fbTitle = await page.title();
        console.log(fbTitle);
    });