import { defineProject } from 'vitest/config'

export const config = defineProject({
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
