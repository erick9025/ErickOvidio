import { type Locator, type Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly pimMenuItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pimMenuItem = page.locator("//a[contains(normalize-space(.), 'PIM')]");
  }
  async clickPimMenuItem() {
    await this.pimMenuItem.click();
  }
}
