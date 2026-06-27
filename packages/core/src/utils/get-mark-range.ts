import type { Attrs, Mark, MarkType, ResolvedPos } from '@prosekit/pm/model'

import { getMarkType } from './get-mark-type.ts'
import { isSubset } from './is-subset.ts'

export interface MarkRange {
  /** The document position where the mark run starts. */
  from: number
  /** The document position where the mark run ends. */
  to: number
  /** The matched mark. */
  mark: Mark
}

/**
 * Finds the contiguous range of a mark of the given `type` (optionally matching
 * `attrs`) that touches the resolved position `$pos`, or `undefined` if no such
 * mark is present.
 *
 * A position exactly at either edge of a run counts as touching it, so a caret
 * placed immediately before or after the mark still finds it. The run is
 * delimited by mark identity: a neighbouring child whose mark differs in
 * attributes starts a new run. When a matching mark sits on both sides of the
 * position, the run to the right is returned.
 */
export function getMarkRange(
  $pos: ResolvedPos,
  type: string | MarkType,
  attrs?: Attrs | null,
): MarkRange | undefined {
  const parent = $pos.parent
  const markType = getMarkType(parent.type.schema, type)
  const matches = attrs
    ? (mark: Mark) => mark.type === markType && isSubset(attrs, mark.attrs)
    : (mark: Mark) => mark.type === markType

  // Prefer a matching child to the right (a caret at a run's left edge finds
  // it), then fall back to a matching child to the left (the right edge).
  const after = parent.childAfter($pos.parentOffset)
  const before = parent.childBefore($pos.parentOffset)

  let index: number
  let childOffset: number
  let mark: Mark | undefined
  if (after.node && (mark = after.node.marks.find(matches))) {
    index = after.index
    childOffset = after.offset
  } else if (before.node && (mark = before.node.marks.find(matches))) {
    index = before.index
    childOffset = before.offset
  } else {
    return
  }

  const start = $pos.start()
  let from = start + childOffset
  let to = from + parent.child(index).nodeSize
  // `mark.isInSet` compares type and attributes, so a neighbour with the same
  // type but different attributes ends the run.
  for (let i = index - 1; i >= 0 && mark.isInSet(parent.child(i).marks); i--) {
    from -= parent.child(i).nodeSize
  }
  for (let i = index + 1; i < parent.childCount && mark.isInSet(parent.child(i).marks); i++) {
    to += parent.child(i).nodeSize
  }

  return { from, to, mark }
}
