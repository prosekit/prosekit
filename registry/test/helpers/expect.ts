import { expect, type ExpectPollOptions } from 'vitest'
import type { Locator } from 'vitest/browser'

export async function expectLocatorToHaveCount(locator: Locator, count: number, options?: ExpectPollOptions): Promise<void> {
  await expect.poll(() => locator.elements(), options).toHaveLength(count)
}

export async function expectLocatorToNotExist(locator: Locator, options?: ExpectPollOptions): Promise<void> {
  await expect.element(locator, options).not.toBeInTheDocument()
}

export async function expectLocatorToBeHidden(locator: Locator, options?: {
  timeout?: number
  interval?: number
}): Promise<void> {
  const message = `Expect locator '${locator.selector}' to be hidden, but found at least one visible element`
  await expect.poll(() => {
    const { isVisible, reason } = checkLocatorVisibility(locator)
    return isVisible ? reason : undefined
  }, { ...options, message }).toBeUndefined()
}

interface ElementVisibility {
  isVisible: boolean
  reason: string
}

/**
 * Checks if an element is visible
 */
function checkElementVisibility(element: Element): ElementVisibility {
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

function checkLocatorVisibility(locator: Locator): ElementVisibility {
  const elements = locator.elements()
  if (elements.length === 0) {
    return {
      isVisible: false,
      reason: `Locator '${locator.selector}' has no elements.`,
    }
  }
  const results = elements.map(checkElementVisibility)
  const isVisible = results.some(result => result.isVisible)
  const reason = results.map(result => result.reason).join('\n')
  return { isVisible, reason }
}
