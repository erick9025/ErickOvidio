import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import Config from '../utils/config';
import logger from '../utils/logger';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;
  const CONFIG = Config.getInstance();

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    logger.info('Starting the test');
  });

  test(
    '@TC-0001 Verify that a user can successfully log in with valid credentials',
    {
      tag: ['@Smoke', '@Functional', '@Regression'],
    },
    async ({ page }) => {
      await loginPage.login(CONFIG.userName, CONFIG.password);
      await page.waitForURL(/\/dashboard/);
      // Expect to be redirected to dashboard.
      await expect(page).toHaveURL(/\/dashboard/);
    },
  );
  test(
    '@TC-0002 Verify that a user receives an error message when attempting to log in with incorrect credentials',
    {
      tag: ['@Negative', '@Regression'],
    },
    async ({ page }) => {
      await loginPage.login(CONFIG.userName, 'wrongpass');
      const actualMessage = loginPage.alertContentLabel;
      const expectMessage = 'Invalid credentials';
      await expect(actualMessage).toHaveText(expectMessage);
    },
  );
});
