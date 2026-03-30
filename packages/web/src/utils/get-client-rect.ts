interface Rect {
  top: number
  bottom: number
  right: number
  left: number
}

interface IncludeExtraOptions {
  top?: boolean
  bottom?: boolean
  right?: boolean
  left?: boolean
}

/**
 * Similar to `element.getBoundingClientRect`, but handles `display: contents` CSS
 * property and optionally includes margins and outlines.
 */
export function getClientRect(element: Element, includeExtra?: IncludeExtraOptions | false): Rect {
  const rect = element.getBoundingClientRect()
  if (rect.width === 0 && rect.height === 0 && rect.x === 0 && rect.y === 0) {
    // Suspiciously rect, probably an element with `display: contents`, in
    // which case `element.getClientRects()` will return an empty array.
    if (element.getClientRects().length === 0) {
      const children = [...element.children]
      const rects = children.map(child => getClientRect(child, includeExtra))
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
  return includeExtra ? addExtra(element, rect, includeExtra) : rect
}

function addExtra(element: Element, rect: Rect, options: IncludeExtraOptions): Rect {
  const view = element.ownerDocument?.defaultView
  if (!view) {
    return rect
  }

  const style = view.getComputedStyle(element)
  const marginTop = options.top ? Number.parseFloat(style.marginTop) || 0 : 0
  const marginBottom = options.bottom ? Number.parseFloat(style.marginBottom) || 0 : 0
  const marginRight = options.right ? Number.parseFloat(style.marginRight) || 0 : 0
  const marginLeft = options.left ? Number.parseFloat(style.marginLeft) || 0 : 0

  const outlineWidth = Number.parseFloat(style.outlineWidth) || 0
  const outlineOffset = Number.parseFloat(style.outlineOffset) || 0
  const outline = Math.max(outlineWidth + outlineOffset, 0)
  const outlineTop = options.top ? outline : 0
  const outlineBottom = options.bottom ? outline : 0
  const outlineRight = options.right ? outline : 0
  const outlineLeft = options.left ? outline : 0

  return {
    top: rect.top - Math.max(marginTop, outlineTop),
    bottom: rect.bottom + Math.max(marginBottom, outlineBottom),
    right: rect.right + Math.max(marginRight, outlineRight),
    left: rect.left - Math.max(marginLeft, outlineLeft),
  }
}
