import { basic, react, tsPlugin } from '@ocavue/eslint-config'

export default [
  ...basic({
    typescript: {
      project: 'tsconfig.eslint.json',
    },
  }),
  ...react(),
  {
    plugins: {
      '@typescript-eslint/': tsPlugin,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['packages/dev/**/*.ts', 'examples/**/*.ts', 'examples/**/*.tsx'],
    plugins: {
      '@typescript-eslint/': tsPlugin,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/unbound-method': 'off',
    },
  },
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error', 'assert'] }],
    },
  },
]
