import { defineProject } from 'vitest/config'

/** @type {import('vitest/config').UserProjectConfigExport} */
const config = defineProject({
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
