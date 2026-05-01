import { type Locator, type Page } from '@playwright/test';

export class EmployeeListPage {
  readonly page: Page;
  readonly addButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButton = page.locator("//button[contains(normalize-space(.), 'Add')]");
  }

  async clickAddButton() {
    await this.addButton.click();
  }
}
