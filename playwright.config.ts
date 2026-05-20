import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [['html', { outputFolder: 'reports' }]],
  use: {
    headless: false,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    baseURL: 'https://www.bertrand.pt/',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
});