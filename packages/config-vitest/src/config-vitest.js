// @ts-check

import { playwright } from '@vitest/browser-playwright'
import { defu } from 'defu'

const debug = !!process.env.debug && !process.env.CI

/**
 * @returns {import('vitest/config').UserWorkspaceConfig}
 */
function getDefaultConfig() {
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
            reducedMotion: 'reduce',
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
  return defaultConfig
}

/**
 * @param {import('vitest/config').UserWorkspaceConfig | undefined} userConfig
 * @returns {import('vitest/config').UserWorkspaceConfig}
 */
export function config(userConfig = undefined) {
  return defu(userConfig, getDefaultConfig())
}
