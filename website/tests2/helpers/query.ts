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
