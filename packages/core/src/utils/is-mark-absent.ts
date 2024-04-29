import type { Attrs, Mark, MarkType, ProseMirrorNode } from '@prosekit/pm/model'

/**
 * Returns true if the given mark is not seen in the given range.
 *
 * @internal
 */
export function isMarkAbsent(
  node: ProseMirrorNode,
  from: number,
  to: number,
  markType: MarkType,
  attrs?: Attrs | null,
): boolean {
  const mark: MarkType | Mark = attrs ? markType.create(attrs) : markType

  let missing = false
  node.nodesBetween(from, to, (node, pos, parent) => {
    if (missing) return false
    missing =
      !mark.isInSet(node.marks) &&
      !!parent &&
      parent.type.allowsMarkType(markType)
  })
  return missing
}
