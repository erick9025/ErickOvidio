import { type Locator, type Page } from '@playwright/test';

export class AddEmployeePage {
  readonly page: Page;
  readonly firstNameTextField: Locator;
  readonly firstNameErrorMessage: Locator;
  readonly middleNameTextField: Locator;
  readonly lastNameTextField: Locator;
  readonly lastNameErrorMessage: Locator;
  readonly employeeIdTextField: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameTextField = page.locator('input[name=firstName]');
    this.firstNameErrorMessage = page.locator(
      "//input[@name='firstName']//parent::div//following::span[text()='Required'][1]",
    );
    this.middleNameTextField = page.locator('input[name=middleName]');
    this.lastNameTextField = page.locator('input[name=lastName]');
    this.lastNameErrorMessage = page.locator(
      "//input[@name='lastName']//parent::div//following::span[text()='Required'][1]",
    );
    this.employeeIdTextField = page.locator(
      "//label[contains(text(), 'Employee Id')]/parent::div/following::div/input",
    );
    this.saveButton = page.locator("//button[contains(normalize-space(.), 'Save')]");
  }

  async addEmployee(firstName: string, middleName: string, lastName: string, employeeId: string) {
    await this.firstNameTextField.fill(firstName);
    await this.middleNameTextField.fill(middleName);
    await this.lastNameTextField.fill(lastName);
    await this.employeeIdTextField.fill(employeeId);
    await this.saveButton.click();
  }

  async verifyEmployeeCreation() {
    // Waits for the loading spinner to disappear before proceeding, ensuring the page has finished loading.
    await this.page.waitForSelector('div.oxd-loading-spinner', {
      state: 'hidden',
    });
    const personalDetailsLabel = 'h6:has-text("Personal Details")';
    await this.page.waitForSelector(personalDetailsLabel, { timeout: 9000 });
    return await this.page.isVisible(personalDetailsLabel);
  }

  async verifyRequiredFields() {
    const isFirstNameErrorVisible = await this.firstNameErrorMessage.waitFor({
      state: 'visible',
      timeout: 3000,
    });
    const isLastNameErrorVisible = await this.lastNameErrorMessage.waitFor({
      state: 'visible',
      timeout: 3000,
    });
    return isFirstNameErrorVisible !== null && isLastNameErrorVisible !== null;
  }
}
