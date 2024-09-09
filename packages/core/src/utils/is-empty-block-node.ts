import { type ProseMirrorNode } from '@prosekit/pm/model'

/**
 * Checks if the current node is a block node and empty.
 *
 * @param node - the prosemirror node
 */
export function isEmptyBlockNode(
  node: ProseMirrorNode | null | undefined,
): boolean {
  return !!node && node.type.isBlock && !node.textContent && !node.childCount
}
