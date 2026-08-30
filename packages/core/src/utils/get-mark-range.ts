import type { Attrs, Mark, MarkType, ResolvedPos } from '@prosekit/pm/model'

import { findMarkRange, type MarkRange } from './find-mark-range.ts'
import { isSubset } from './is-subset.ts'

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
  const markTypeName = typeof type === 'string' ? type : type.name
  const predicate = attrs
    ? (mark: Mark) => mark.type.name === markTypeName && isSubset(attrs, mark.attrs)
    : (mark: Mark) => mark.type.name === markTypeName
  return findMarkRange($pos, predicate)
}
