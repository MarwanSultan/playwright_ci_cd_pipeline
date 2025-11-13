import { defineConfig, devices } from '@playwright/test';
import MetricsReporter from './utils/reporters/metrics-reporter';

const reporters: any[] = [
  ['list'],
  ['html', { open: 'never' }],
];

// Only attach metrics reporter in CI (so local dev stays lightweight)
if (process.env.CI) {
  reporters.push([
    new MetricsReporter({
      pushGateway: process.env.PUSHGATEWAY_URL,
      buildLabel: process.env.GITHUB_RUN_ID || process.env.GITHUB_RUN_NUMBER || 'ci',
    }),
  ]);
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 4,
  reporter: reporters,
  use: {
    trace: 'on-first-retry',

    // Reuse the state created in globalSetup
    storageState: 'storageState.json',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Link the global setup file
  globalSetup: require.resolve('./globalSetup.ts'),
});
