import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameTextField: Locator;
  readonly passwordTextField: Locator;
  readonly loginButton: Locator;
  readonly alertContentLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameTextField = page.locator('input[name=username]');
    this.passwordTextField = page.locator('input[type=password]');
    this.loginButton = page.locator('button[type=submit]');
    this.alertContentLabel = page.locator('.oxd-alert-content > p');
  }

  async goto() {
    await this.page.goto('/web/index.php/auth/login');
  }

  async login(username: string, password: string) {
    await this.usernameTextField.fill(username);
    await this.passwordTextField.fill(password);
    await this.loginButton.click();
  }
}
