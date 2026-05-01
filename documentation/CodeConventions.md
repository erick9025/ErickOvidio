# :scroll: Code Conventions

Here are some code conventions used for this project.

# Table of contents

- [:file_folder: 1. File Naming](#file_folder-1-file-naming)
- [:card_file_box: 2. Project Organization](#card_file_box-2-project-organization)
- [:dromedary_camel: 3. Variable and Function Naming](#dromedary_camel-3-variable-and-function-naming)
- [:gear: 4. Class and Interface Naming](#gear-4-class-and-interface-naming)
- [:lock: 5. Use of `const` and `let`](#lock-5-use-of-const-and-let)
  - [1. Fixed constant](#1-fixed-constant)
  - [2. Dynamically generated but unchanging value](#2-dynamically-generated-but-unchanging-value)
  - [3. Function result](#3-function-result)
- [:crystal_ball: 6. Consistent Spacing and Indentation](#crystal_ball-6-consistent-spacing-and-indentation)
  - [Example:](#example)
- [:crystal_ball: 7. Avoid Magic Numbers](#crystal_ball-7-avoid-magic-numbers)
  - [Bad Example](#bad-example)
  - [Good Example](#good-example)
- [:memo: 8. Commenting and Documentation](#memo-8-commenting-and-documentation)
- [:straight_ruler: 9. Code Formatting and Linting](#straight_ruler-9-code-formatting-and-linting)
  - [Example 1 (Spacing around operators and assignments)](#example-1-spacing-around-operators-and-assignments)
  - [Example 2 (Consistent use of semicolons)](#example-2-consistent-use-of-semicolons)
- [:jigsaw: 10. Single Responsibility Principle](#jigsaw-10-single-responsibility-principle)
  - [Bad Example](#bad-example-1)
  - [Good Example](#good-example-1)
- [:repeat: 11. DRY (Don't Repeat Yourself) Principle](#repeat-11-dry-dont-repeat-yourself-principle)
  - [Bad Example](#bad-example-2)
  - [Good Example](#good-example-2)
- [:no_entry_sign: 12. YAGNI (You Aren’t Gonna Need It) Principle](#no_entry_sign-12-yagni-you-arent-gonna-need-it-principle)
  - [Bad Example](#bad-example-3)
  - [Good Example](#good-example-3)

## :file_folder: 1. File Naming

In this project, we use **kebab-case** for **file** and **folder names** to ensure consistency and avoid any potential issues with case sensitivity across different file systems.

**Example:**

```
login-page.ts
home-page.ts
user-details.spec.ts
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back to top</a></b>
</div>

## :card_file_box: 2. Project Organization

The project files are organized logically. For example, the tests, pages, and utils directories are used to ensure the codebase is easy to navigate and maintain.

**Example:**

```
/pages
  └── login-page.ts
/tests
/utils
  └── helper.ts
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back to top</a></b>
</div>

## :dromedary_camel: 3. Variable and Function Naming

Our project follows the **camelCase naming convention** for **variables** and **functions**, with clear and descriptive names to make the code more readable.

**Example:**

```typescript
const loginButton = page.locator('#loginButton');

async function performLogin(username: string, password: string): Promise<void> {
  await page.fill('#username', username);
  await page.fill('#password', password);
  await loginButton.click();
}
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back to top</a></b>
</div>

## :gear: 4. Class and Interface Naming

We follow the **PascalCase** convention for naming **classes** and **interfaces**, ensuring that the class names clearly represent the entities or pages they model.

**Example:**

```typescript
class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.fill('#username', username);
    await this.page.fill('#password', password);
    await this.page.click('#loginButton');
  }
}
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back to top</a></b>
</div>

## :lock: 5. Use of `const` and `let`

In this project, we always use `const` for variables whose values do not change, and `let` for variables that are reassigned. We don't use `var` because it can cause confusing behavior.

- **const**: Use this when the value stays the same after being assigned (e.g., settings, constants, or dynamically generated values that don't change).
- **let**: Use this when the value may change during execution.

Additionally:

- For constants, we follow the **SCREAMING_SNAKE_CASE** naming convention (**uppercase with underscores**).
- For variables that can change, we use **camelCase** naming convention.

**Example:**

```typescript
const API_TIMEOUT = 5000; // Constant: timeout in milliseconds.
let retries = 0; // Variable: will be reassigned during execution.

while (retries < 3) {
  try {
    await fetchData();
    break;
  } catch (error) {
    retries++;
  }
}
```

**Examples of `const` Usage**:

#### 1. Fixed constant

```typescript
const GUID_LENGTH = 10;
```

#### 2. Dynamically generated but unchanging value

```typescript
const guid = GuidGenerator.generateNumericGuid(GUID_LENGTH); // GUID is generated but won't be reassigned.
await addEmployeePage.addEmployee('Mary', 'Elizabeth', 'Smith', guid);
```

#### 3. Function result

```typescript
const isEmployeeCreated = await addEmployeePage.verifyEmployeeCreation(); // The result won't change after assignment.
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back to top</a></b>
</div>

## :crystal_ball: 6. Consistent Spacing and Indentation

Use 2 spaces for indentation. This should be enforced through a code formatter like Prettier to ensure consistency.

#### Example:

```typescript
async function navigateToDashboard() {
  await page.click('#dashboard');
  await page.waitForSelector('#dashboard-content');
}
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back to top</a></b>
</div>

## :crystal_ball: 7. Avoid Magic Numbers

This project avoids magic numbers (unnamed constants) by using well-named constants to make the code more readable and maintainable.

#### Bad Example

```typescript
const discount = price * 0.15; // What does 0.15 represent?
```

In this case, it's unclear what 0.15 represents. Someone reading the code might not immediately know that it's a 15% discount.

#### Good Example

```typescript
const DISCOUNT_RATE = 0.15; // 15% discount rate.
const discount = price * DISCOUNT_RATE;
```

By defining `DISCOUNT_RATE` as a constant, it’s now clear that 0.15 represents a 15% discount, making the code easier to read and maintain.

<div align="right">
    <b><a href="#table-of-contents">↥ Back to top</a></b>
</div>

## :memo: 8. Commenting and Documentation

We document functions, classes, and complex logic using **JSDoc** to provide context and improve readability.

```typescript
/**
 * Submits the login form with the provided username and password.
 * @param username - The user's username.
 * @param password - The user's password.
 */
async function submitLoginForm(username: string, password: string) { ... }

```

<div align="right">
    <b><a href="#table-of-contents">↥ Back to top</a></b>
</div>

## :straight_ruler: 9. Code Formatting and Linting

We use **Prettier** and **ESLint** to ensure consistent code formatting and quality. These tools are integrated into the project to automatically **format** and **lint** the code according to the rules defined in the configuration files (`.eslintrc` and `.prettierrc`).

#### Example 1 (Spacing around operators and assignments)

**Bad Example**: No spaces around the assignment operator(`=`).

```typescript
// prettier-ignore
let x=10;
// prettier-ignore
const y=20;
```

**Good Example**: Correct spacing around the assignment operator(`=`).

```typescript
let x = 10;
const y = 20;
```

#### Example 2 (Consistent use of semicolons)

**Bad Example**:

```typescript
// prettier-ignore
const name = 'John'
// prettier-ignore
const age = 30;
```

**Good Example**: Always use semicolons at the end of statements.

```typescript
const name = 'John';
const age = 30;
```

Here are some formatting rules that ensure readability and consistency, reducing the likelihood of errors and improving collaboration between developers.

**Formats the code using Prettier**

```bash
npm run format
```

**Checks the code for style issues and errors using ESLint**.

```bash
npm run lint
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back to top</a></b>
</div>

## :jigsaw: 10. Single Responsibility Principle

Follow the **Single Responsibility Principle** (SRP) to ensure each function or class in the project has one responsibility. This keeps the code modular and easier to test and maintain.

#### Bad Example

```typescript
async function loginAndNavigateToDashboard(username: string, password: string) {
  await page.fill('#username', username);
  await page.fill('#password', password);
  await page.click('#login');
  await page.waitForNavigation();
  await page.click('#dashboard-link');
}
```

In this example, the function is doing two things:

1. Logging in.
2. Navigating to the dashboard.
   These are two separate responsibilities, and combining them violates SRP.

#### Good Example

```typescript
async function login(username: string, password: string) {
  await page.fill('#username', username);
  await page.fill('#password', password);
  await page.click('#login');
  await page.waitForNavigation();
}

async function navigateToDashboard() {
  await page.click('#dashboard-link');
  await page.waitForSelector('#dashboard-header');
}

async function loginAndGoToDashboard(username: string, password: string) {
  await login(username, password);
  await navigateToDashboard();
}
```

In this improved example:

- The `login()` function is only responsible for handling the login process.
- The `navigateToDashboard()` function is only responsible for navigating to the dashboard.

The `loginAndGoToDashboard()` function orchestrates the two, keeping each piece of logic separate and following SRP. This makes the code easier to maintain, test, and extend if needed (e.g., **adding a different navigation after login**).

<div align="right">
    <b><a href="#table-of-contents">↥ Back to top</a></b>
</div>

## :repeat: 11. DRY (Don't Repeat Yourself) Principle

Avoid duplicating code by creating reusable functions or components. Whenever you see repeated code, it's a good indicator that you should refactor it into a separate function.

#### Bad Example

```typescript
await page.click('#submit');
await page.waitForSelector('#success');

await page.click('#cancel');
await page.waitForSelector('#cancel-confirm');
```

#### Good Example

```typescript
async function clickAndWait(buttonSelector: string, waitSelector: string) {
  await page.click(buttonSelector);
  await page.waitForSelector(waitSelector);
}

await clickAndWait('#submit', '#success');
await clickAndWait('#cancel', '#cancel-confirm');
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back to top</a></b>
</div>

## :no_entry_sign: 12. YAGNI (You Aren’t Gonna Need It) Principle

The YAGNI principle emphasizes that you should not add functionality unless it is absolutely necessary. Writing code in anticipation of future requirements often leads to unnecessary complexity and maintenance burden.

#### Bad Example

```typescript
class UserForm {
  private username: string;
  private password: string;
  private email: string;
  private phoneNumber: string; // Unnecessary, not required yet
  private address: string; // Unnecessary, not required yet

  constructor(username: string, password: string, email: string) {
    this.username = username;
    this.password = password;
    this.email = email;
  }

  async submitForm() {
    await page.fill('#username', this.username);
    await page.fill('#password', this.password);
    await page.fill('#email', this.email);
    // Leaving unnecessary fields empty
  }
}

const userForm = new UserForm('john_doe', 'password123', 'john@example.com');
await userForm.submitForm();
```

In this example, the class **UserForm** has attributes like `phoneNumber` and `address` that are not currently needed. These fields add complexity but have no practical use at the moment.

#### Good Example

```typescript
class UserForm {
  private username: string;
  private password: string;
  private email: string;

  constructor(username: string, password: string, email: string) {
    this.username = username;
    this.password = password;
    this.email = email;
  }

  async submitForm() {
    await page.fill('#username', this.username);
    await page.fill('#password', this.password);
    await page.fill('#email', this.email);
  }
}

const userForm = new UserForm('john_doe', 'password123', 'john@example.com');
await userForm.submitForm();
```

In this improved version:

- Only the necessary fields (username, password, and email) are included in the class, since that’s all that’s needed for the current form.
- The code is simpler, easier to understand, and avoids future maintenance of unused fields.

<div align="right">
    <b><a href="#table-of-contents">↥ Back to top</a></b>
</div>

<div align="left">
    <b><a href="https://github.com/ovidiocbba/playwright-typescript-project?tab=readme-ov-file#table-of-contents">↥ Back to main page</a></b>
</div>
