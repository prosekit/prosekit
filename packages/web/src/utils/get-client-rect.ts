interface Rect {
  top: number
  bottom: number
  right: number
  left: number
}

interface IncludeMarginsOptions {
  top?: boolean
  bottom?: boolean
  right?: boolean
  left?: boolean
}

/**
 * Similar to `element.getBoundingClientRect`, but handles `display: contents` CSS
 * property and optionally includes margins.
 */
export function getClientRect(element: Element, includeMargins?: IncludeMarginsOptions | false): Rect {
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

function addMargins(element: Element, rect: Rect, options: IncludeMarginsOptions): Rect {
  const view = element.ownerDocument?.defaultView
  if (!view) {
    return rect
  }

  const style = view.getComputedStyle(element)
  const marginTop = options.top ? Number.parseFloat(style.marginTop) || 0 : 0
  const marginBottom = options.bottom ? Number.parseFloat(style.marginBottom) || 0 : 0
  const marginRight = options.right ? Number.parseFloat(style.marginRight) || 0 : 0
  const marginLeft = options.left ? Number.parseFloat(style.marginLeft) || 0 : 0

  return {
    top: rect.top - marginTop,
    bottom: rect.bottom + marginBottom,
    right: rect.right + marginRight,
    left: rect.left - marginLeft,
  }
}
