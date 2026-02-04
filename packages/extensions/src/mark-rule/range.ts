import type { ProseMirrorNode, ResolvedPos } from '@prosekit/pm/model'
import type { EditorState, Transaction } from '@prosekit/pm/state'
import type { ProsemirrorNode } from 'prosemirror-flat-list'

function getSpanTextRanges($from: ResolvedPos, $to: ResolvedPos) {
  const nodeRange = $from.blockRange($to)
  if (!nodeRange) {
    return []
  }

  const stack: Array<[start: number, node: ProseMirrorNode]> = []
  let start = nodeRange.start

  for (let i = nodeRange.startIndex; i < nodeRange.endIndex; i++) {
    const child = nodeRange.parent.child(i)
    stack.push([start, child])
    start += child.nodeSize
  }

  const ranges: Array<[number, number]> = []

  while (stack.length > 0) {
    const [start, node] = stack.pop()!
    if (node.type.spec.code) {
      continue
    }

    if (node.type.isTextblock) {
      ranges.push([start + 1, start + 1 + node.content.size])
      continue
    }

    node.forEach((child, offset) => {
      stack.push([start + offset + 1, child])
    })
  }

  return ranges
}

function getInlineTextRange(
  $from: ResolvedPos,
  $to: ResolvedPos,
): [number, number] {
  return [$from.start(), $to.end()]
}

function getTextRanges(
  doc: ProsemirrorNode,
  from: number,
  to: number,
): Array<[number, number]> {
  const $from = doc.resolve(from)
  const $to = doc.resolve(to)

  if ($from.sameParent($to) && $from.parent.isTextblock) {
    return [getInlineTextRange($from, $to)]
  } else {
    const nodeRange = $from.blockRange($to)
    if (!nodeRange) {
      return []
    }

    return getSpanTextRanges($from, $to)
  }
}

function getMapRange(
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
        hi = Math.max(lo, hi, newEnd)
      })
    }
  }

  lo = Math.min(lo, hi, newState.selection.from)
  hi = Math.min(lo, hi, newState.selection.to)

  return [lo, hi] as const
}

export function getCheckRanges(
  transactions: readonly Transaction[],
  oldState: EditorState,
  newState: EditorState,
): Array<[number, number]> {
  const [from, to] = getMapRange(transactions, oldState, newState)
  return getTextRanges(newState.doc, from, to)
}
