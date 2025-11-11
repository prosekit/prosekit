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
  }, { ...options, message }).toEqual({
    isVisible: false,
    reason: expect.anything() as string,
  })
}

/**
 * Checks if an element is visible
 */
function isElementVisible(element: Element): {
  isVisible: boolean
  reason: string
} {
  const rect = element.getBoundingClientRect()
  const { width, height } = rect
  if (width === 0 && height === 0) {
    return {
      isVisible: false,
      reason: `Element is not visible: width=${width}, height=${height}.`,
    }
  }

  const style = window.getComputedStyle(element)
  const { visibility, display } = style
  const opacity = Number(style.opacity)
  if (visibility === 'hidden') {
    return {
      isVisible: false,
      reason: `Element is not visible: visibility=${visibility}.`,
    }
  }
  if (display === 'none') {
    return {
      isVisible: false,
      reason: `Element is not visible: display=${display}.`,
    }
  }
  if (opacity === 0) {
    return {
      isVisible: false,
      reason: `Element is not visible: opacity=${opacity}.`,
    }
  }

  return {
    isVisible: true,
    reason: `Element is visible: width=${width}, height=${height}, visibility=${visibility}, display=${display}, opacity=${opacity}.`,
  }
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
