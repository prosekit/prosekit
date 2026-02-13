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
    // TODO: remove this ignores
    ignores: ['**/check-version-overrides.mjs'],
  },
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error', 'assert'] }],
    },
    ignores: ['**/*.md', '**/*.md/**/*'],
  },
)
