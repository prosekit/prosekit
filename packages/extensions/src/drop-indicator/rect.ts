export interface Rect {
  readonly top: number
  readonly bottom: number
  readonly left: number
  readonly right: number
}

export function unionRect(a: Rect, b: Rect): Rect {
  return {
    top: Math.min(a.top, b.top),
    bottom: Math.max(a.bottom, b.bottom),
    left: Math.min(a.left, b.left),
    right: Math.max(a.right, b.right),
  }
}
