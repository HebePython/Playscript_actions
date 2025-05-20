import { defineConfig, devices } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

// Check if storage state file exists, create empty one if not
const storageStatePath = './resources/storage-state/storage-state.json';
const storageStateDir = path.dirname(storageStatePath);

if (!fs.existsSync(storageStateDir)) {
  fs.mkdirSync(storageStateDir, { recursive: true });
}

if (!fs.existsSync(storageStatePath)) {
  fs.writeFileSync(storageStatePath, JSON.stringify({ cookies: [], origins: [] }));
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  
  // Added timeouts to address earlier issues
  timeout: 60000,        // Test timeout: 60 seconds
  expect: {
    timeout: 15000       // Assertion timeout: 15 seconds
  },
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'results/playwright-report' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'volvo',
      testMatch: '**/volvo_tests/**/*.spec.ts',
      use: {
        storageState: storageStatePath,
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'test-automation-blog',
      testMatch: '**/testautomationblogspot_tests/**/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'], // Add browser config here
      },
    },
    {
      name: 'orange-hrm-page',
      testMatch: '**/orangeHRM_tests/**/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    /*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    */
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
      //   name: 'Google Chrome',
      //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
      // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
