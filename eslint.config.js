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
)
