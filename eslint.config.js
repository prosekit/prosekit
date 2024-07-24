/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { basic, react, vue } from '@ocavue/eslint-config'
import unocss from '@unocss/eslint-config/flat'

/** @type {import('eslint').Linter.FlatConfig[]} */
const configs = [
  unocss,
  ...basic(),
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
    ignores: [
      '**/_/**',
      '**/.temp',
      '**/.tsup',
      '**/playwright-report',
      '**/config-tsup.d.ts',
      '**/vite.config.ts.timestamp*',
      '**/tsup.config.bundled*',
    ],
  },
]

// Enable EXPERIMENTAL_useProjectService
//
// TODO: remove EXPERIMENTAL_useProjectService when typescript-eslint v8 stable is released
//
// See https://github.com/typescript-eslint/typescript-eslint/pull/6754
let projectServiceEnabled = false
for (const config of configs) {
  if (config?.languageOptions?.parserOptions?.project) {
    projectServiceEnabled = true
    config.languageOptions.parserOptions.EXPERIMENTAL_useProjectService = {
      // TODO: remove MAX_SAFE_INTEGER once the following is fixed
      // https://github.com/typescript-eslint/typescript-eslint/issues/9032
      maximumDefaultProjectFileMatchCount_THIS_WILL_SLOW_DOWN_LINTING:
        Number.MAX_SAFE_INTEGER,
    }
  }
}

if (!projectServiceEnabled) {
  throw new Error('Unable to find any project service enabled config')
}

export default configs
