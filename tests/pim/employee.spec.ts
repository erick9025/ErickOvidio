import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login-page';
import { DashboardPage } from '../../pages/dashboard-page';
import { EmployeeListPage } from '../../pages/pim/employee-list-page';
import { AddEmployeePage } from '../../pages/pim/add-employee-page';
import { GuidGenerator } from '../../utils/guidGenerator';
import Config from '../../utils/config';
import logger from '../../utils/logger';

test.describe('PIM', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let employeeListPage: EmployeeListPage;
  let addEmployeePage: AddEmployeePage;
  const CONFIG = Config.getInstance();

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    employeeListPage = new EmployeeListPage(page);
    addEmployeePage = new AddEmployeePage(page);
    logger.info('Starting the test');
    await loginPage.goto();
    await loginPage.login(CONFIG.userName, CONFIG.password);

    // Navigate to PIM module.
    await dashboardPage.clickPimMenuItem();
  });

  test(
    '@TC-0003 Verify that an employee can be created',
    {
      tag: ['@Smoke', '@Functional', '@Regression'],
    },
    async () => {
      await employeeListPage.clickAddButton();
      const GUID_LENGTH = 10;
      const guid = GuidGenerator.generateNumericGuid(GUID_LENGTH);
      await addEmployeePage.addEmployee('Mary', 'Elizabeth', 'Smith', guid);

      const isEmployeeCreated = await addEmployeePage.verifyEmployeeCreation();
      expect(isEmployeeCreated).toBeTruthy();
    },
  );

  test(
    '@TC-0004 Verify that an employee cannot be created when required fields are left empty',
    {
      tag: ['@Negative', '@Regression'],
    },
    async () => {
      await employeeListPage.clickAddButton();

      await addEmployeePage.addEmployee('', '', '', '');

      const areErrorsVisible = await addEmployeePage.verifyRequiredFields();
      expect(areErrorsVisible).toBeTruthy();
    },
  );
});
