// @ts-check

import { defineProject } from 'vitest/config'

/** @type {import('vitest/config').UserProjectConfigExport} */
const config = defineProject({
  optimizeDeps: {
    include: ['@vitest/coverage-v8/browser'],
  },
  test: {
    browser: {
      enabled: true,
      provider: 'playwright',
      headless: true,
      ui: false,
      fileParallelism: false,
      screenshotFailures: false,
      instances: [
        {
          browser: 'chromium',
        },
      ],
    },
  },
})

export { config }
