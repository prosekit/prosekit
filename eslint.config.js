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
      reactCompiler: !!process.env.CI,
    },
    vue: true,
    markdown: true,
    command: true,
  },
  {
    rules: {
      'no-console': ['warn', {
        allow: ['warn', 'error', 'assert'],
      }],
    },
    ignores: ['**/*.md', '**/*.md/**/*'],
  },
  {
    rules: {
      // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v61.0.0/docs/rules/consistent-function-scoping.md
      'unicorn/consistent-function-scoping': 'error',
    },
    ignores: ['**/*.test.*', '**/*.spec.*', '**/*.md', '**/*.md/**/*'],
  },
  {
    files: ['**/*.md', '**/*.md/**/*'],
    rules: {
      'no-duplicate-imports': 'off',
      'unicorn/prefer-add-event-listener': 'off',
    },
  },
  {
    files: [
      'registry/src/react/ui/code-block-view/code-block-view.tsx',
      'registry/src/preact/ui/code-block-view/code-block-view.tsx',
    ],
    rules: {
      '@eslint-react/dom-no-dangerously-set-innerhtml': 'off',
    },
  },
  {
    files: [
      'registry/src/vue/ui/code-block-view/code-block-view.vue',
    ],
    rules: {
      'vue/no-v-html': 'off',
    },
  },
)
