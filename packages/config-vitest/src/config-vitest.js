// @ts-check

import { playwright } from '@vitest/browser-playwright'
import { merge } from 'lodash-es'

/** @type {import('vitest/config').UserWorkspaceConfig} */
const defaultConfig = {
  optimizeDeps: {
    include: ['@vitest/coverage-v8/browser'],
  },
  test: {
    browser: {
      enabled: true,
      provider: playwright({
        launchOptions: {},
        contextOptions: {
          hasTouch: true,
          permissions: ['clipboard-read', 'clipboard-write'],
        },
      }),
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
  /**
   * @type {import('vitest/config').UserWorkspaceConfig}
   */
  return merge({}, defaultConfig, options || {})
}
