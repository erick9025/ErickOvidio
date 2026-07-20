# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: pim/employee.spec.ts >> PIM >> @TC-0003 Verify that an employee can be created
- Location: tests/pim/employee.spec.ts:30:3

# Error details

```
Test timeout of 25000ms exceeded while running "beforeEach" hook.
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { LoginPage } from '../../pages/login-page';
  3  | import { DashboardPage } from '../../pages/dashboard-page';
  4  | import { EmployeeListPage } from '../../pages/pim/employee-list-page';
  5  | import { AddEmployeePage } from '../../pages/pim/add-employee-page';
  6  | import { GuidGenerator } from '../../utils/guidGenerator';
  7  | import Config from '../../utils/config';
  8  | import logger from '../../utils/logger';
  9  | 
  10 | test.describe('PIM', () => {
  11 |   let loginPage: LoginPage;
  12 |   let dashboardPage: DashboardPage;
  13 |   let employeeListPage: EmployeeListPage;
  14 |   let addEmployeePage: AddEmployeePage;
  15 |   const CONFIG = Config.getInstance();
  16 | 
> 17 |   test.beforeEach(async ({ page }) => {
     |        ^ Test timeout of 25000ms exceeded while running "beforeEach" hook.
  18 |     loginPage = new LoginPage(page);
  19 |     dashboardPage = new DashboardPage(page);
  20 |     employeeListPage = new EmployeeListPage(page);
  21 |     addEmployeePage = new AddEmployeePage(page);
  22 |     logger.info('Starting the test');
  23 |     await loginPage.goto();
  24 |     await loginPage.login(CONFIG.userName, CONFIG.password);
  25 | 
  26 |     // Navigate to PIM module.
  27 |     await dashboardPage.clickPimMenuItem();
  28 |   });
  29 | 
  30 |   test(
  31 |     '@TC-0003 Verify that an employee can be created',
  32 |     {
  33 |       tag: ['@Smoke', '@Functional', '@Regression'],
  34 |     },
  35 |     async () => {
  36 |       await employeeListPage.clickAddButton();
  37 |       const GUID_LENGTH = 10;
  38 |       const guid = GuidGenerator.generateNumericGuid(GUID_LENGTH);
  39 |       await addEmployeePage.addEmployee('Mary', 'Elizabeth', 'Smith', guid);
  40 | 
  41 |       const isEmployeeCreated = await addEmployeePage.verifyEmployeeCreation();
  42 |       expect(isEmployeeCreated).toBeTruthy();
  43 |     },
  44 |   );
  45 | 
  46 |   test(
  47 |     '@TC-0004 Verify that an employee cannot be created when required fields are left empty',
  48 |     {
  49 |       tag: ['@Negative', '@Regression'],
  50 |     },
  51 |     async () => {
  52 |       await employeeListPage.clickAddButton();
  53 | 
  54 |       await addEmployeePage.addEmployee('', '', '', '');
  55 | 
  56 |       const areErrorsVisible = await addEmployeePage.verifyRequiredFields();
  57 |       expect(areErrorsVisible).toBeTruthy();
  58 |     },
  59 |   );
  60 | });
  61 | 
```