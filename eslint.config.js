import { defineESLintConfig } from '@ocavue/eslint-config'

export default defineESLintConfig(
  {
    react: {
      files: ['**/react/**/*.?([cm])[jt]s?(x)'],
    },
    vue: true,
    markdown: true,
    unocss: true,
    command: true,
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: [
      'packages/dev/**/*.ts',
      'website/**/*.{ts,tsx,vue}',
    ],
    rules: {
      '@typescript-eslint/unbound-method': 'off',
    },
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
  },
)
