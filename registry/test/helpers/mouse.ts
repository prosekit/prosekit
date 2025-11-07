import { expect } from 'vitest'
import {
  page,
  type Locator,
} from 'vitest/browser'
import { mouse } from 'vitest-browser-commands/playwright'

/**
 * Hover over an element.
 *
 * This could be more reliable than `locator.hover()` because it sends multiple
 * mouse move events.
 */
export async function hover(locator: Locator, options?: {
  /**
   * A point to use relative to the top-left corner of element padding box. If
   * not specified, points to the center of the element.
   */
  position?: { x: number; y: number }

  /**
   * How many mouse move events to send.
   */
  steps?: number
}) {
  await expect.element(locator).toBeVisible()
  const box = locator.element().getBoundingClientRect()

  // Coordinates relative to the top-left corner of the element.
  const x = options?.position?.x ?? Math.floor(box.width / 2)
  const y = options?.position?.y ?? Math.floor(box.height / 2)

  const steps = options?.steps ?? 10
  await mouse.move(x + box.x, y + box.y, { steps })
}

export async function unhover(): Promise<void> {
  const body = page.locate('body')
  await hover(body, { position: { x: 0, y: 0 } })
}

/**
 * Drag an element over another element.
 *
 * This is more reliable than `locator.dragTo()` because it sends multiple mouse
 * move events.
 */
export async function dragAndDrop(
  startLocator: Locator,
  endLocator: Locator,
  options?: {
    startPosition?: { x: number; y: number }
    endPosition?: { x: number; y: number }
  },
) {
  await hover(startLocator, { position: options?.startPosition })
  await mouse.down()
  await hover(endLocator, { position: options?.endPosition })
  await mouse.up()
}
