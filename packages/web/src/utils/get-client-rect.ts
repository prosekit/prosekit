interface Rect {
  top: number
  right: number
  bottom: number
  left: number
}

interface IncludeMarginsOptions {
  top: boolean
  right: boolean
  bottom: boolean
  left: boolean
}

/**
 * Similar to `element.getBoundingClientRect`, but handles `display: contents` elements.
 */
export function getClientRect(element: Element, includeMargins?: IncludeMarginsOptions): Rect {
  const rect = element.getBoundingClientRect()
  if (rect.width === 0 && rect.height === 0 && rect.x === 0 && rect.y === 0) {
    // Suspiciously rect, probably an element with `display: contents`, in
    // which case `element.getClientRects()` will return an empty array.
    if (element.getClientRects().length === 0) {
      const children = [...element.children]
      const rects = children.map(child => getClientRect(child, includeMargins))
      if (rects.length === 0) {
        return rect
      }
      if (rects.length === 1) {
        return rects[0]
      }
      let { top, bottom, left, right } = rects[0]
      for (let i = 1; i < rects.length; i++) {
        const r = rects[i]
        if (r.top < top) top = r.top
        if (r.bottom > bottom) bottom = r.bottom
        if (r.left < left) left = r.left
        if (r.right > right) right = r.right
      }
      return { top, bottom, left, right }
    }
  }
  return includeMargins ? addMargins(element, rect, includeMargins) : rect
}

function addMargins(element: Element, rect: Rect, includeMargins: IncludeMarginsOptions): Rect {
  const view = element.ownerDocument?.defaultView
  if (!view) {
    return rect
  }

  const style = view.getComputedStyle(element)
  const marginTop = includeMargins?.top ? Number.parseFloat(style.marginTop) || 0 : 0
  const marginRight = includeMargins?.right ? Number.parseFloat(style.marginRight) || 0 : 0
  const marginBottom = includeMargins?.bottom ? Number.parseFloat(style.marginBottom) || 0 : 0
  const marginLeft = includeMargins?.left ? Number.parseFloat(style.marginLeft) || 0 : 0

  return {
    top: rect.top - marginTop,
    right: rect.right + marginRight,
    bottom: rect.bottom + marginBottom,
    left: rect.left - marginLeft,
  }
}
