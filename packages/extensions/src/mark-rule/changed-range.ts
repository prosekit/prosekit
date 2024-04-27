import { isTextSelection } from '@prosekit/core'
import type { ProseMirrorNode, ResolvedPos } from '@prosekit/pm/model'
import type { Selection } from '@prosekit/pm/state'

const MIN_BUFFER = 30
const MAX_BUFFER = 200

/**
 * @internal
 */
export function findChangedTextRanges(
  selection: Selection,
): Array<[from: number, to: number]> {
  if (!isTextSelection(selection)) {
    return []
  }

  const { $from, $to } = selection

  // Only check the text around the selection
  if ($from.sameParent($to)) {
    const selectionFrom = $from.pos
    const selectionTo = $to.pos

    const parentStart = $from.start()
    const parentEnd = $from.end()
    const parent = $from.parent

    let contextFrom = parentStart

    for (let i = 0; i < parent.childCount; i++) {
      const newContextFrom = contextFrom + parent.child(i).nodeSize

      if (newContextFrom <= selectionFrom - MIN_BUFFER) {
        contextFrom = newContextFrom
      } else {
        break
      }
    }

    let contextTo = parentEnd
    for (let i = parent.childCount - 1; i >= 0; i--) {
      const newContextTo = contextTo - parent.child(i).nodeSize

      if (newContextTo >= selectionTo + MIN_BUFFER) {
        contextTo = newContextTo
      } else if (newContextTo >= selectionTo + MAX_BUFFER) {
        contextTo = selectionTo + MAX_BUFFER
      } else {
        break
      }
    }

    contextFrom = Math.max(contextFrom, selectionFrom - MAX_BUFFER)
    contextTo = Math.min(contextTo, selectionTo + MAX_BUFFER)

    return [[contextFrom, contextTo]]
  }

  // Check all text in the nodes that the selection spans
  else {
    return getSpanTextRanges($from, $to)
  }
}

export function getSpanTextRanges($from: ResolvedPos, $to: ResolvedPos) {
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
