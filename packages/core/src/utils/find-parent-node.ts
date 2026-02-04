import type { ProseMirrorNode, ResolvedPos } from '@prosekit/pm/model'

/**
 * @public
 */
export interface FindParentNodeResult {
  /**
   * The closest parent node that satisfies the predicate.
   */
  node: ProseMirrorNode

  /**
   * The position directly before the node.
   */
  pos: number

  /**
   * The position at the start of the node.
   */
  start: number

  /**
   * The depth of the node.
   */
  depth: number
}

/**
 * Find the closest parent node that satisfies the predicate.
 *
 * @public
 */
export function findParentNode(
  /**
   * The predicate to test the parent node.
   */
  predicate: (node: ProseMirrorNode) => boolean,
  /**
   * The position to start searching from.
   */
  $pos: ResolvedPos,
): FindParentNodeResult | undefined {
  for (let depth = $pos.depth; depth >= 0; depth -= 1) {
    const node = $pos.node(depth)

    if (predicate(node)) {
      const pos = depth === 0 ? 0 : $pos.before(depth)
      const start = $pos.start(depth)
      return { node, pos, start, depth }
    }
  }
}
