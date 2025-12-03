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
      version: '19.2',
    },
    vue: true,
    markdown: true,
    command: true,
  },
  {
    files: [
      'packages/**/*.gen.ts',
      'packages/**/*.gen.tsx',
      'packages/**/types.ts',
    ],
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error', 'assert'] }],
    },
    ignores: ['**/*.md', '**/*.md/**/*'],
  },
  {
    rules: {
      'unicorn/prefer-single-call': 'off',
    },
  },
  {
    rules: {
      // Disable this rule because of https://github.com/facebook/react/issues/34775
      // TODO: Enable this when the issue is fixed.
      'react-hooks/refs': 'off',
    },
  },
)
