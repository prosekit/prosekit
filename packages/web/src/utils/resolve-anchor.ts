import type { ReferenceElement, VirtualElement } from '@floating-ui/dom'

/**
 * A reference for an overlay to position against. This can be a DOM element, a
 * Floating UI virtual element, or a function that returns either of them.
 */
export type AnchorProp =
  | Element
  | VirtualElement
  | (() => Element | VirtualElement | null)
  | null

/**
 * Resolves an {@link AnchorProp} to a Floating UI reference element, or
 * `undefined` when no anchor is available.
 */
export function resolveAnchor(anchor: AnchorProp): ReferenceElement | undefined {
  if (!anchor) {
    return undefined
  }
  if (typeof anchor === 'function') {
    return anchor() ?? undefined
  }
  return anchor
}
