/**
 * Similar to `element.getBoundingClientRect`, but handles `display: contents` elements.
 */
export function getClientRect(element: Element): {
  top: number
  right: number
  bottom: number
  left: number
} {
  const rect = element.getBoundingClientRect()
  if (rect.width === 0 && rect.height === 0 && rect.x === 0 && rect.y === 0) {
    // Suspiciously rect, probably an element with `display: contents`, in
    // which case `element.getClientRects()` will return an empty array.
    if (element.getClientRects().length === 0) {
      const children = Array.from(element.children)
      const rects = children.map(child => getClientRect(child))
      if (rects.length === 0) {
        return rect
      }
      if (rects.length === 1) {
        return rects[0]
      }
      return {
        top: Math.min(...rects.map(rect => rect.top)),
        right: Math.max(...rects.map(rect => rect.right)),
        bottom: Math.max(...rects.map(rect => rect.bottom)),
        left: Math.min(...rects.map(rect => rect.left)),
      }
    }
  }
  return rect
}
