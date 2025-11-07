import type { Locator } from 'vitest/browser'

interface BoundingBox {
  x: number
  y: number
  width: number
  height: number
}

export function getBoundingBox(locator: Locator): BoundingBox {
  const element = locator.element()
  const rect = element.getBoundingClientRect()
  return {
    x: rect.x,
    y: rect.y,
    width: rect.width,
    height: rect.height,
  }
}

export async function waitForStableElement(
  getElement: () => Element,
  stableCount = 3,
  maxAttempts: number = 100,
  maxTime: number = 4000,
): Promise<void> {
  let stableCounter = 0
  let attempts = 0
  let lastHTML: string | undefined
  let lastRect: { x: number; y: number; width: number; height: number } | undefined
  let startTime = Date.now()

  while (
    stableCounter < stableCount
    && attempts < maxAttempts
    && Date.now() - startTime < maxTime
  ) {
    attempts += 1

    let element = getElement()
    let html = element.innerHTML
    let { x, y, width, height } = element.getBoundingClientRect()
    let rect = { x, y, width, height }

    const isStable = html === lastHTML
      && lastRect
      && lastRect.x === rect.x
      && lastRect.y === rect.y
      && lastRect.width === rect.width
      && lastRect.height === rect.height

    if (isStable) {
      stableCounter += 1
    } else {
      stableCounter = 0
    }

    if (stableCounter >= stableCount) {
      return
    }

    lastHTML = html
    lastRect = rect

    await new Promise((resolve) => requestAnimationFrame(resolve))
  }

  throw new Error(`Unable to wait for the element to be stable after ${Date.now() - startTime}ms and ${attempts} attempts`)
}
