import type { Attrs, Mark, MarkType, ProseMirrorNode } from '@prosekit/pm/model'

/**
 * Returns true if the given mark is missing in some part of the range.
 * Returns false if the entire range has the given mark.
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
