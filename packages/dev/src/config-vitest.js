// @ts-check

import { merge } from 'lodash-es'

/** @type {import('vitest/config').UserWorkspaceConfig} */
const defaultConfig = {
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

/**
 * @param {import('vitest/config').UserWorkspaceConfig | undefined} options
 * @returns {import('vitest/config').UserWorkspaceConfig}
 */
export function config(options = undefined) {
  if (!options) {
    return defaultConfig
  }

  /**
   * @type {import('vitest/config').UserWorkspaceConfig}
   */
  const merged = merge({}, defaultConfig, options)

  return merged
}
