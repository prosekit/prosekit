// @ts-check

import { defineESLintConfig } from '@ocavue/eslint-config'

export default defineESLintConfig(
  {
    react: {
      // React eslint rules are disabled because of the issue: https://github.com/facebook/react/issues/34775
      // TODO: Enable this when the issue is fixed.
      // files: ['**/react/**/*.?([cm])[jt]s?(x)'],
      files: ['**/react_TEMPORARILY_DISABLED.tsx'],
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
    ignores: ['**/*.md'],
  },
  {
    rules: {
      'unicorn/prefer-single-call': 'off',
    },
  },
)
