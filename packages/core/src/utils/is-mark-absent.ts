import type { Attrs, MarkType, ProseMirrorNode } from '@prosekit/pm/model'

import { includesMark } from './includes-mark.ts'

/**
 * Returns true if the given mark is missing in some part of the range.
 * Returns false if the entire range has the given mark.
 * Returns true if the mark is not allowed in the range.
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
  let missing = false
  let available = false

  node.nodesBetween(from, to, (node, pos, parent) => {
    if (missing) {
      return false
    }

    const allowed = parent?.type.allowsMarkType(markType)
      && !node.marks.some((m) => m.type !== markType && m.type.excludes(markType))

    if (allowed) {
      available = true
      if (!includesMark(node.marks, markType, attrs)) {
        missing = true
      }
    }
  })
  return available ? missing : true
}
