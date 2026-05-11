# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> Login Tests >> @TC-0002 Verify that a user receives an error message when attempting to log in with incorrect credentials
- Location: tests/login.spec.ts:28:3

# Error details

```
Error: page.goto: net::ERR_CERT_DATE_INVALID at https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
Call log:
  - navigating to "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login", waiting until "load"

```

# Test source

```ts
  1  | import { type Locator, type Page } from '@playwright/test';
  2  | 
  3  | export class LoginPage {
  4  |   readonly page: Page;
  5  |   readonly usernameTextField: Locator;
  6  |   readonly passwordTextField: Locator;
  7  |   readonly loginButton: Locator;
  8  |   readonly alertContentLabel: Locator;
  9  | 
  10 |   constructor(page: Page) {
  11 |     this.page = page;
  12 |     this.usernameTextField = page.locator('input[name=username]');
  13 |     this.passwordTextField = page.locator('input[type=password]');
  14 |     this.loginButton = page.locator('button[type=submit]');
  15 |     this.alertContentLabel = page.locator('.oxd-alert-content > p');
  16 |   }
  17 | 
  18 |   async goto() {
> 19 |     await this.page.goto('/web/index.php/auth/login');
     |                     ^ Error: page.goto: net::ERR_CERT_DATE_INVALID at https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
  20 |   }
  21 | 
  22 |   async login(username: string, password: string) {
  23 |     await this.usernameTextField.fill(username);
  24 |     await this.passwordTextField.fill(password);
  25 |     await this.loginButton.click();
  26 |   }
  27 | }
  28 | 
```