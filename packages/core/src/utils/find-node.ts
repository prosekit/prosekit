import type { ProseMirrorNode } from '@prosekit/pm/model'

/**
 * Finds the first node that satisfies the predicate from the given document.
 *
 * @internal
 */
export function findNode(
  doc: ProseMirrorNode,
  predicate: (node: ProseMirrorNode) => boolean,
): FindNodeResult | undefined {
  let found: FindNodeResult | undefined
  doc.descendants((node, pos, parent, index) => {
    if (found) {
      return false
    }
    if (predicate(node)) {
      found = { node, pos, parent, index }
      return false
    }
  })
  return found
}

/**
 * The result of the {@link findNode} function.
 *
 * @internal
 */
export interface FindNodeResult {
  /**
   * The node that satisfies the predicate.
   */
  node: ProseMirrorNode
  /**
   * The position of the node.
   */
  pos: number
  /**
   * The parent of the node.
   */
  parent: ProseMirrorNode | null
  /**
   * The index of the node in the parent.
   */
  index: number
}
