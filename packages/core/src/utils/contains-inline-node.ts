import type { ProseMirrorNode } from '@prosekit/pm/model'

/**
 * @internal
 */
export function containsInlineNode(
  doc: ProseMirrorNode,
  from: number,
  to: number,
): boolean {
  let found = false
  doc.nodesBetween(from, to, (node) => {
    if (found) return false
    if (node.isInline) found = true
  })
  return found
}
