import type { Locator, LocatorFilterOptions } from 'vitest/browser'
import { locators, page } from 'vitest/browser'

declare module 'vitest/browser' {
  interface LocatorSelectors {
    locate(selector: string, options?: LocatorFilterOptions): Locator
  }
}

locators.extend({
  locate(selector: string, options?: LocatorFilterOptions): Locator | string {
    if (!options) {
      return selector
    }
    const locator = page.locate(selector)
    return locator.filter(options)
  },
})
