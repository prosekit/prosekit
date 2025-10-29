// @ts-check

import { playwright } from '@vitest/browser-playwright'
import { merge } from 'lodash-es'

const debug = !!process.env.debug && !process.env.CI

/** @type {import('vitest/config').UserWorkspaceConfig} */
const defaultConfig = {
  test: {
    maxWorkers: process.env.CI ? 1 : 2,
    browser: {
      enabled: true,
      viewport: {
        width: 900,
        height: 600,
      },
      provider: playwright({
        launchOptions: {},
        contextOptions: {
          hasTouch: true,
          permissions: ['clipboard-read', 'clipboard-write'],
        },
      }),
      headless: !debug,
      ui: debug,
      fileParallelism: true,
      screenshotFailures: debug,
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
