import {
  basic,
  markdown,
  react,
  vue,
} from '@ocavue/eslint-config'
import unocss from '@unocss/eslint-config/flat'
import command from 'eslint-plugin-command/config'

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
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/unbound-method': 'off',
      'import/no-extraneous-dependencies': 'off',
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
