// @ts-check

import { defineESLintConfig } from '@ocavue/eslint-config'

export default defineESLintConfig(
  {
    react: {
      files: ['**/react/**/*.?([cm])[jt]s?(x)'],
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
      'unicorn/prefer-single-call': 'off',
    },
  },
)
