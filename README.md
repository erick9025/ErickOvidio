# Playwright with TypeScript Project

This project uses [Playwright](https://playwright.dev/docs/intro) and [TypeScript](https://www.typescriptlang.org/) for end-to-end testing.

[allure_report]: https://ovidiocbba.github.io/playwright-typescript-project

[![CI](https://github.com/ovidiocbba/playwright-typescript-project/actions/workflows/ci.yml/badge.svg)](https://github.com/ovidiocbba/playwright-typescript-project/actions/workflows/ci.yml)  
[![Execution](https://github.com/ovidiocbba/playwright-typescript-project/actions/workflows/execution.yml/badge.svg)](https://github.com/ovidiocbba/playwright-typescript-project/actions/workflows/execution.yml)  
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=ovidiocbba_playwright-typescript-project&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=ovidiocbba_playwright-typescript-project)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=ovidiocbba_playwright-typescript-project&metric=bugs)](https://sonarcloud.io/summary/new_code?id=ovidiocbba_playwright-typescript-project)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=ovidiocbba_playwright-typescript-project&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=ovidiocbba_playwright-typescript-project)  
[:bar_chart: View Allure Report][allure_report]

# Table of contents

- [:test_tube: Test Cases](documentation/TestCases.md)
- [:clipboard: Features](#clipboard-features)
- [:robot: GitHub Actions](#robot-github-actions)
- [:scroll: Code Conventions](documentation/CodeConventions.md)
- [:rocket: Getting Started](#rocket-getting-started)
  - [:gear: Prerequisites](#gear-prerequisites)
    - [:package: Node.js](#package-1-nodejs)
    - [:octocat: Git](#octocat-2-git)
    - [:hammer_and_wrench: Visual Studio Code](#hammer_and_wrench-3-visual-studio-code)
  - [:desktop_computer: Environment Configuration](#desktop_computer-environment-configuration)
    - [Clone remote repository](#1-clone-remote-repository)
    - [Install Dependencies](#2-install-dependencies)
- [:runner: Running the tests](#runner-running-the-tests)
  - [:zap: Test Commands](#zap-test-commands)
  - [:bar_chart: Run Tests and Generate Allure Reports](#bar_chart-run-tests-and-generate-allure-reports)
- [Contact](#contact)

---

## :clipboard: Features:

- **Easy Installation & Execution**: Run test cases effortlessly using simple commands. E.g:
  ```bash
  npm run test:ui:chrome
  ```
- **Capture**: Videos, screenshots, trace and others are captured automatically on test failures.  
  **Steps to view the trace**:
  1. Once the tests finish running, open the generated HTML report.
  2. **Navigate to the Failed Test**: In the HTML report, you’ll see a list of test results. Look for the test that failed and was retried.
  3. **Click on the Retry #1 Tab**: This tab will display details specific to the retried run of the test.
  4. **View the Trace**: Once inside the '**Retry #1**' tab, under the "**Traces**" section, you will see an "**Image**" that you need to click on.
  5. **Explore the trace**: Once the trace viewer opens, you can inspect the steps of the test('**Actions**' tab), view screenshots, details('**Metadata**' tab) network activity, and console logs.
- **Environment Management**: Use environment files to easily run tests across different environments. Set in `.env` file. E.g: `ENV='test'`  
   **Enviroments examples**:
  - test
  - staging
  - production
- **Execute Test Filtering Using Tags**: You can tag tests (e.g., @Regression, @Smoke, @Negative) and selectively execute only the required.  
   **Tags examples**:

  - @Regression
  - @Smoke
  - @Acceptance
  - @Functional
  - @E2E
  - @Negative
  - @Boundary

  Run tests tagged with a single tag, such as @Regression:

  ```bash
  npx playwright test --grep '@Regression' --project=chromium --headed
  ```

  Run tests tagged with either @Regression or @Smoke:

  ```bash
  npx playwright test --grep '@Regression|@Smoke' --project=chromium --headed
  ```

  Run tests that have both @Regression and @Smoke tags:

  ```bash
  npx playwright test --grep '@Regression' --grep '@Smoke' --project=chromium --headed
  ```

- **Slow Motion Execution for Debugging**: This feature allows developers to slow down the execution of automated tests.

  - Helps debug flaky or timing-sensitive tests.
  - Makes it easier to observe and review step-by-step behavior of the tests.
  - Reduces the likelihood of missing UI bugs that might be invisible during normal test execution.

  Running tests in slow motion mode(**--project=chromium-slow**):

  ```bash
  npx playwright test --grep '@TC-0001' --project=chromium-slow --headed
  ```

  **Video and Trace**

  - **Video**: Always recorded in `chromium-slow` to watch the test run.
  - **Trace**: Step-by-step record with screenshots, network events, and console logs.

  **View the trace**

  ```bash
  npm run show-trace -- TC-0001
  ```

- **Inspector Mode for Debugging**: This feature allows developers to pause test execution and interactively debug tests using **Playwright's Inspector**.

  - **Step-by-step debugging**: Pause and inspect the test at any point, interact with the page, and review actions in real-time.
  - **Ideal for troubleshooting**: Helps identify issues, verify selectors, and debug flaky or timing-sensitive tests.
  - **Script generation**: Record interactions to automatically generate Playwright test code.

  Using the `--debug` flag enables this mode, making test debugging more efficient and improving test reliability.

  ```bash
  npx playwright test --grep '@TC-0001' --project=chromium --headed --debug
  ```

- **Page Object Model (POM)**: Implemented for better test structure and maintainability.
- **Logger**: Utilizes the winston library to manage logging during test execution.
- **Headed/Headless Mode**: Supports both headed and headless execution for Firefox and Chrome browsers.
- **Allure Reports**: Automatically generated after test execution for clear reporting.
  ```bash
  npm run test:ui:allure
  ```
  <div align="right">
      <b><a href="#table-of-contents">↥ Back to top</a></b>
  </div>

## :robot: GitHub Actions:

- **Automated Execution**: Tests run automatically on every push to the main branch or when a pull request is created.
- **Scheduled Regression Tests**: Schedule a daily regression test at 22:00 PM and deploy the Allure report.  
  [https://ovidiocbba.github.io/playwright-typescript-project](https://ovidiocbba.github.io/playwright-typescript-project)

- **Manual Execution**: Trigger test cases manually with different parameters.
  [/actions/workflows/execution.yml](https://github.com/ovidiocbba/playwright-typescript-project/actions/workflows/execution.yml)

- **Secure Secrets Management**: Use GitHub Secrets to handle sensitive data securely.  
  **Secrets**: SONAR_TOKEN, UI_PASSWORD, UI_PASSWORD
- **Composite Action**: Leverage a custom composite action for deploying Allure reports.  
  [/.github/actions/deploy_allure_report/action.yml](https://github.com/ovidiocbba/playwright-typescript-project/blob/main/.github/actions/deploy_allure_report/action.yml)

- **GitHub Action Reporter**: Integration with GitHub Action reporter to display test results directly in GitHub.
- **SonarQube Integration**: Analyze code for vulnerabilities and code smells using SonarQubeCloud integration.  
  [https://sonarcloud.io/project/issues?id=ovidiocbba_playwright-typescript-project](https://sonarcloud.io/project/issues?issueStatuses=OPEN%2CCONFIRMED&id=ovidiocbba_playwright-typescript-project)
- **Allure Report Deployment**: Automatically deploy Allure reports using GitHub Pages for easy access and sharing.  
 [/actions/workflows/pages/pages-build-deployment](https://github.com/ovidiocbba/playwright-typescript-project/actions/workflows/pages/pages-build-deployment)
<div align="right">
    <b><a href="#table-of-contents">↥ Back to top</a></b>
</div>

## :rocket: Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### :gear: Prerequisites

#### :package: 1. Node.js

1. Ensure you have [Node.js](https://nodejs.org/en) installed (version 14 or higher).
2. Verify the installation by running the following commands in your terminal:

```sh
npm -v
```

#### :octocat: 2. Git

1. Please download Git: https://git-scm.com/downloads
2. Choose the version for your operating system.
3. Accept the defaults and follow the screen instructions to install Git.

#### :hammer_and_wrench: 3. Visual Studio Code

1. Please download Visual Studio Code: https://code.visualstudio.com/
2. Choose your operating system (Windows, macOS, or Linux).
3. Install the following **extensions** for Visual Studio Code:
   - **Playwright Test for VSCode**  
     _Provides integration with Playwright for running, debugging, and managing tests directly within Visual Studio Code._
   - **ESLint**  
     _Automatically checks your code for errors and style issues based on this project's ESLint rules, providing instant feedback and quick fixes as you write._
   - **Prettier - Code formatter**  
     _Automatically formats code to ensure consistent style across this project._
   - **YAML**  
    _Offers syntax highlighting, validation, and autocompletion for YAML files, which are commonly used for configuration files in CI/CD pipelines._
   <div align="right">
       <b><a href="#table-of-contents">↥ Back to top</a></b>
   </div>

### :desktop_computer: Environment Configuration

#### 1. Clone remote repository

Git

##### Step1 Generate SSH Keys

- Open "Git Bash" (This is installed when you install Git).
- Enter the following command :

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

##### Step2 Clone the repository

- By git command line :

```sh
git clone git@github.com:ovidiocbba/playwright-typescript-project.git
```

#### 2. Install Dependencies

Install all the required dependencies using npm. This will install Playwright, TypeScript, and other packages defined in the `package.json` file.

```bash
npm install
```

Install `Chromium` and `Firefox` Playwright Browsers

```bash
npx playwright install chromium firefox
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back to top</a></b>
</div>

## :runner: Running the tests

**IMPORTANT:** Please add the appropriate values for your `.env` file.
For example:

```bash
ENV=test
UI_USERNAME=*****
UI_PASSWORD=*****
```

Run all tests using the Chrome browser:

```bash
npm run test:ui:chrome
```

Run a test case using a tag

```bash
npx playwright test --grep '@TC-0001' --project=chromium --headed
```

View Test Reports

```bash
npx playwright show-report
```

#### :whale: Execution in Docker

1. Clone the repository:
2. Navigate to root project directory
3. Build the docker image

```bash
docker build -t <imagename> .
```

4. Run the Docker container

```bash
docker run <imagename>
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back to top</a></b>
</div>

### :zap: Test Commands

<table>
  <tr>
    <th>Script Command</th>
    <th>Description</th>
  </tr>
  
  <tr>
  <td>

```bash
npm run format
```

  </td>
    <td>Formats the code using Prettier.</td>
  </tr>

  <tr>
  <td>

```bash
npm run lint
```

  </td>
    <td>Checks the code for style issues and errors using ESLint.</td>
  </tr>

  <tr>
  <td>

```bash
npm run test:ui:chrome
```

  </td>
    <td>Run all tests with Chrome browser</td>
  </tr>

  <tr>
  <td>

```bash
npm run test:ui:chrome:headless
```

  </td>
  <td>Run all tests with Chrome browser in headless mode</td>
  </tr>
  
  <tr>
  <td>

```bash
npm run test:ui:functional
```

  </td>
  <td>Run test cases given a specific tag using the Chrome browser. Example: regression, smoke, acceptance, functional, e2e, negative and boundary </td>
  </tr>
  <tr>
  <td>

```bash
npm run test:ui:firefox
```

  </td>
  <td>Run all tests with Firefox browser</td>
  </tr>
    
  <tr>
  <td>

```bash
npm run test:ui:firefox:headless
```

  </td>
  <td>Run all tests with Firefox browser in headless mode</td>
  </tr>
  
  <tr>
  <td>

```bash
npm run test:ui:allure
```

  </td>
    <td>Runs the tests using the Allure reporter and generates the corresponding report.</td>
  </tr>
</table>
<div align="right">
    <b><a href="#table-of-contents">↥ Back to top</a></b>
</div>

### :bar_chart: Run Tests and Generate Allure Reports

#### Install

1. Allure requires Java 8 or higher
2. Use npm to install Allure CLI

```bash
npm install -g allure-commandline --save-dev
```

#### Run

1. Run tests:

```bash
npm run test:ui:chrome
```

2. Serve the Allure report:

```bash
allure generate ./allure-results -o ./allure-report --clean
```

3. Open Allure Report:

```bash
allure open ./allure-report
```

<div align="right">
    <b><a href="#table-of-contents">↥ Back to top</a></b>
</div>

# Contact

For questions or feedback, reach out to ovidiocbba@hotmail.com
