import { expect } from 'vitest'
import type { Locator } from 'vitest/browser'

export async function waitForAnimationEnd(locator: Locator): Promise<void> {
  await expect.poll(() => checkElementIsStable(locator)).toBe(true)
}

// Based on https://github.com/microsoft/playwright/blob/21bb265aa1f290b297cc7c9c78596a785216b667/packages/injected/src/injectedScript.ts#L651
function checkElementIsStable(locator: Locator, stableCount = 2): Promise<boolean> {
  const continuePolling = Symbol('continuePolling')
  let lastRect: { x: number; y: number; width: number; height: number } | undefined
  let stableCounter = 0

  const check = () => {
    const element = locator.element()
    const clientRect = element.getBoundingClientRect()
    const rect = {
      x: clientRect.top,
      y: clientRect.left,
      width: clientRect.width,
      height: clientRect.height,
    }
    if (lastRect) {
      const samePosition = rect.x === lastRect.x
        && rect.y === lastRect.y
        && rect.width === lastRect.width
        && rect.height === lastRect.height
      if (!samePosition) return false
      stableCounter += 1
      if (stableCounter >= stableCount) return true
    }
    lastRect = rect
    return continuePolling
  }

  const { promise, resolve, reject } = Promise.withResolvers<boolean>()

  const start = () => {
    try {
      const success = check()
      if (success !== continuePolling) resolve(success)
      else requestAnimationFrame(start)
    } catch (e) {
      reject(e)
    }
  }

  requestAnimationFrame(start)

  return promise
}
