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
      name: 'chromium',
      headless: true,
      ui: false,
      screenshotFailures: false,
    },
    fileParallelism: false,
  },
})

export { config }
