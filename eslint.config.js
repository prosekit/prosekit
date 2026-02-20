// @ts-check

import { defineESLintConfig } from '@ocavue/eslint-config'

export default defineESLintConfig(
  {
    react: {
      files: [
        '**/react/**/*.ts',
        '**/react/**/*.tsx',
        '**/preact/**/*.ts',
        '**/preact/**/*.tsx',
      ],
      version: '18.0',
    },
    vue: true,
    markdown: true,
    command: true,
  },
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error', 'assert'] }],
    },
    ignores: ['**/*.md', '**/*.md/**/*'],
  },
  {
    rules: {
      // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v63.0.0/docs/rules/consistent-function-scoping.md
      'unicorn/consistent-function-scoping': 'error',
    },
    ignores: ['**/*.test.*', '**/*.spec.*'],
  },
)
