import type { ProseMirrorNode } from '@prosekit/pm/model'

/**
 * @internal
 */
export interface HoverState {
  node: ProseMirrorNode
  pos: number
}

/**
 * @internal
 */
export function isHoverStateEqual(a: HoverState, b: HoverState): boolean {
  return a.pos === b.pos && a.node.eq(b.node)
}
