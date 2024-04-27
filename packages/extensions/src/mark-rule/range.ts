import { EditorState, Transaction } from '@prosekit/pm/state'
import type { ProsemirrorNode } from 'prosemirror-flat-list'

import { getSpanTextRanges } from './changed-range'

export function getAffectedRange(
  transactions: readonly Transaction[],
  oldState: EditorState,
  newState: EditorState,
) {
  let lo = oldState.selection.from
  let hi = oldState.selection.to

  for (const tr of transactions) {
    for (const map of tr.mapping.maps) {
      lo = map.map(lo)
      hi = map.map(hi)

      map.forEach((_oldStart, _oldEnd, newStart, newEnd) => {
        lo = Math.min(lo, hi, newStart)
        hi = Math.max(hi, hi, newEnd)
      })
    }
  }

  lo = Math.min(lo, hi, newState.selection.from)
  hi = Math.min(lo, hi, newState.selection.to)

  return [lo, hi] as const
}

export function getCheckRanges(
  doc: ProsemirrorNode,
  from: number,
  to: number,
): Array<[number, number]> {
  const $from = doc.resolve(from)
  const $to = doc.resolve(to)

  if ($from.sameParent($to) && $from.parent.isTextblock) {
    return [[$from.start(), $to.end()]]
  } else {
    const nodeRange = $from.blockRange($to)
    if (!nodeRange) {
      return []
    }

    return getSpanTextRanges($from, $to)
  }
}
