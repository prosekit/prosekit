import { basic, markdown, react, vue } from '@ocavue/eslint-config'
import unocss from '@unocss/eslint-config/flat'

/** @type {import('eslint').Linter.Config[]} */
const configs = [
  unocss,
  ...basic(),
  ...markdown(),
  ...react().map((config) => ({
    ...config,
    files: ['**/react/**/*.?([cm])[jt]s?(x)'],
  })),
  ...vue(),
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
      'playground/**/*.ts',
      'playground/**/*.tsx',
      'playground/**/*.vue',
    ],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/unbound-method': 'off',
      'import/no-extraneous-dependencies': 'off',
    },
  },
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error', 'assert'] }],
    },
  },
  {
    ignores: ['playground/examples/react/loro/vite.config.ts'],
  },
]

export default configs
