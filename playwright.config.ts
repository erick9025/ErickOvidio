import { defineConfig, devices } from '@playwright/test';
import baseEnvUrl from './utils/environmentBaseUrl';
import type { GitHubActionOptions } from '@estruyf/github-actions-reporter';
import Config from './utils/config';
import 'dotenv/config';

const CONFIG = Config.getInstance();
const envConfig = {
  production: baseEnvUrl.production.home,
  staging: baseEnvUrl.staging.home,
  test: baseEnvUrl.test.home,
};

// Define the baseURL based on the ENV variable, defaulting to 'test'.
const BASE_URL = envConfig[process.env.ENV as keyof typeof envConfig] || baseEnvUrl.test.home;

const reporters: any[] = [
  ['list'],
  ['html'],
  ['junit', { outputFile: 'results.xml' }],
  ['json', { outputFile: 'results.json' }],
  [
    '@estruyf/github-actions-reporter',
    {
      title: 'Playwright with Typescript Project - Test Results',
      useDetails: false,
      showTags: false,
      showError: true,
    } as GitHubActionOptions,
  ],
  ['allure-playwright'],
];

// Add Slack reporter only if webhook exists
if (CONFIG.slackWebhook) {
  reporters.push([
    './node_modules/playwright-slack-report/dist/src/SlackReporter.js',
    {
      slackWebHookUrl: CONFIG.slackWebhook,
      sendResults: 'always', // 'always', 'on-failure', 'off'
    },
  ]);
  console.log('Slack reporter enabled');
} else {
  console.log('Slack reporter disabled (no webhook configured)');
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  retries: 1,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  reporter: reporters,

  timeout: 25000, // Global timeout for each test, in milliseconds.
  expect: {
    timeout: 5000, // Maximum time to wait for `expect` conditions (like toHaveText).
  },
  use: {
    baseURL: BASE_URL, // Use the dynamically set baseURL.
    trace: 'on-first-retry', // Record a trace only when retrying a test for the first time.
    screenshot: 'only-on-failure', // Screenshots only when a test fails.
    headless: true,
    viewport: { width: 1920, height: 1080 },
    // Record video with better quality.
    video: {
      mode: 'retain-on-failure',
      size: { width: 1920, height: 1080 },
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },

    {
      name: 'chromium-slow', // Slow-motion execution. '--project=chromium-slow'
      use: {
        browserName: 'chromium',
        headless: false, // Run with browser UI visible.
        video: {
          mode: 'on', // Record video.
          size: { width: 1920, height: 1080 },
        },
        trace: 'on', // Always record trace for debugging
        launchOptions: {
          slowMo: 1000, // Slow down actions by 1000ms.
        },
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
      },
    },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
