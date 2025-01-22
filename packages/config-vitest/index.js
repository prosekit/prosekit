// @ts-check

/** @type {import('vitest/config').UserWorkspaceConfig} */
const config = {
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
}

export { config }
