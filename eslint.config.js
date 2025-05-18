import { defineESLintConfig } from '@ocavue/eslint-config'
import unocss from '@unocss/eslint-config/flat'
import command from 'eslint-plugin-command/config'

/** @type {import('eslint').Linter.Config[]} */
const configs = [
  unocss,
  ...defineESLintConfig({
    react: {
      files: ['**/react/**/*.?([cm])[jt]s?(x)'],
    },
    vue: true,
    markdown: true,
  }),
  command(),
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-declaration-merging': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
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
]

export default configs
