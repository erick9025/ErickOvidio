import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import playwrightPlugin from 'eslint-plugin-playwright';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.ts'], // Target TypeScript files.
    ignores: ['node_modules/', 'dist/', 'build/'], // Directories to ignore.
    languageOptions: {
      parser: typescriptParser, // TypeScript parser.
      ecmaVersion: 'latest', // Latest ECMAScript support.
      sourceType: 'module', // Handle ES module syntax.
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      playwright: playwrightPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // TypeScript rules.
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['UPPER_CASE'],
        },
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['camelCase'],
          filter: {
            regex: '^[A-Z0-9_]+$',
            match: false,
          },
        },
        {
          selector: 'variable',
          format: ['camelCase'],
        },
        {
          selector: 'function',
          format: ['camelCase'],
        },
        {
          selector: 'method',
          format: ['camelCase'],
        },
        {
          selector: 'class',
          format: ['PascalCase'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
        },
      ],

      // Playwright rules.
      'playwright/no-force-option': 'warn',
      'playwright/no-wait-for-timeout': 'warn',

      // Prettier as an ESLint rule to enforce formatting
      'prettier/prettier': ['error', { singleQuote: true }], // Ensure Prettier follows single quote rule.

      // Custom rules.
      quotes: [
        'error',
        'single', // Prefer single quotes (' ') for strings
        {
          avoidEscape: true, // Allows double quotes (" ") if needed to avoid escaping.
          allowTemplateLiterals: true, // Allows backticks (`` ` ``) for strings, useful when interpolation is needed.
        },
      ],
      'eol-last': ['error', 'always'], // Add a newline at the end of each file.
      // Disallow the use of "var" and recommend "let" or "const" instead.
      'no-var': 'error', // Error if "var" is used.
      'prefer-const': 'error', // Suggest using "const" if the variable is not reassigned.
      // Avoid Magic Numbers - Enforce defining constants instead of using numbers directly
      'no-magic-numbers': [
        'error',
        {
          ignore: [0, 1], // Allow 0 and 1 as valid numbers.
          ignoreArrayIndexes: true, // Allow array indexes (e.g., arr[0], arr[1]).
          enforceConst: true, // Require constant variables for magic numbers.
          detectObjects: false, // Don't flag object properties as magic numbers.
        },
      ],
    },
  },
  // Disable ESLint rules that conflict with Prettier.
  prettierConfig, // Extends Prettier configuration to avoid conflicts.
];
