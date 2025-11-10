import {
  expect,
  type ExpectPollOptions,
} from 'vitest'
import type { Locator } from 'vitest/browser'

export async function expectLocatorToHaveCount(locator: Locator, count: number, options?: ExpectPollOptions): Promise<void> {
  await expect.poll(() => locator.elements(), options).toHaveLength(count)
}

export async function expectLocatorToNotExist(locator: Locator, options?: ExpectPollOptions): Promise<void> {
  await expect.element(locator, options).not.toBeInTheDocument()
}

export async function expectLocatorToBeHidden(locator: Locator, options?: ExpectPollOptions): Promise<void> {
  const message: string = [
    options?.message || '',
    `Expect locator '${locator.selector}' to be hidden, but found at least one visible element`,
  ].filter(Boolean).join(': ')

  await expect.poll(() => {
    return findVisibleElement(locator)
  }, { ...options, message }).toBe(undefined)
}

function isElementVisible(element: Element): boolean {
  const rect = element.getBoundingClientRect()
  if (rect.width === 0 && rect.height === 0) {
    return false
  }

  const style = window.getComputedStyle(element)
  if (style.visibility === 'hidden' || style.display === 'none' || Number(style.opacity) === 0) {
    return false
  }

  return true
}

function findVisibleElement(locator: Locator): Element | undefined {
  const elements = locator.elements()
  for (const element of elements) {
    if (isElementVisible(element)) {
      return element
    }
  }
  return undefined
}
