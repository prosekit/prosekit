import { playwright } from '@vitest/browser-playwright'
import { defineProject } from 'vitest/config'

const coverageEnabled = !!process.env.VITEST_COVERAGE

export default defineProject({
  resolve: {
    conditions: ['aria-ui-dev'],
  },
  test: {
    include: ['src/**/*.test.ts'],
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: coverageEnabled
        ? [{ browser: 'chromium' }]
        : [
          { browser: 'chromium' },
          { browser: 'firefox' },
          { browser: 'webkit' },
        ],
    },
  },
})
