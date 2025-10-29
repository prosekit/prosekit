import {
  expect,
  type ExpectPollOptions,
} from 'vitest'
import type { Locator } from 'vitest/browser'

export async function expectLocatorToHaveCount(locator: Locator, count: number, options?: ExpectPollOptions): Promise<void> {
  await expect.poll(() => {
    return locator.elements()
  }, options).toHaveLength(count)
}

export async function expectLocatorToNotExist(locator: Locator, options?: ExpectPollOptions): Promise<void> {
  await expect.poll(() => {
    return locator
  }, options).not.toBeInTheDocument()
}

export async function expectLocatorToBeHidden(locator: Locator, options?: ExpectPollOptions): Promise<void> {
  await expect.poll(() => {
    const elements = locator.elements()
    return elements.some((element) => isElementVisible(element))
  }, options).toBe(false)
}

function isElementVisible(element: Element): boolean {
  const rect = element.getBoundingClientRect()
  if (rect.width === 0 && rect.height === 0) {
    return false
  }

  if (element instanceof HTMLElement) {
    const style = window.getComputedStyle(element)
    if (style.visibility === 'hidden' || style.display === 'none' || Number(style.opacity) === 0) {
      return false
    }
  }

  return true
}
