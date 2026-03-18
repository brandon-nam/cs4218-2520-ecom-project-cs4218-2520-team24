import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 60 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // Stay on 1 worker for DB consistency in E2E
  reporter: 'html',
  
  globalSetup: './tests/global-setup',
  globalTeardown: './tests/global-teardown',

  use: {
    baseURL: 'http://localhost:6060', // Port defined in server.js
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: false,
    timeout: 180 * 1000,
    env: {
       NODE_ENV: 'test',
       PLAYWRIGHT: 'true',
       BROWSER: 'none', // Prevent React from opening a browser tab
    },
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
