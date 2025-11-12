import {
  findParentNode,
  type FindParentNodeResult,
} from '@prosekit/core'
import {
  NodeSelection,
  TextSelection,
  type Command,
  type Selection,
} from '@prosekit/pm/state'

export function findCurrentBlock(selection: Selection): FindParentNodeResult | null {
  const { $from } = selection

  // Prefer text block
  const textBlock = findParentNode(
    (node) => node.isTextblock,
    $from,
  )

  let block: FindParentNodeResult | null = textBlock
    ? {
      node: textBlock.node,
      pos: textBlock.pos,
      start: textBlock.start,
      depth: textBlock.depth,
    }
    : null

  // If text block exists, search upward for the nearest non-text block ancestor (without crossing doc)
  if (textBlock) {
    const textBlockDepth = textBlock.depth
    for (let d = textBlockDepth - 1; d > 0; d--) {
      const ancestor = $from.node(d)
      if (ancestor.isBlock && !ancestor.isTextblock) {
        const pos = $from.before(d)
        const start = $from.start(d)
        block = {
          node: ancestor,
          pos,
          start,
          depth: d,
        }
        break
      }
    }
  }

  // If not found, try to find non-text block directly
  if (!block) {
    const nonText = findParentNode(
      (node) => node.isBlock && !node.isTextblock,
      $from,
    )
    block = nonText
      ? {
        node: nonText.node,
        pos: nonText.pos,
        start: nonText.start,
        depth: nonText.depth,
      }
      : null
  }

  // If still not found, and parent is a block, fall back to parent block
  if (!block) {
    const parent = $from.parent
    if (parent.isBlock) {
      const depth = $from.depth
      const pos = depth === 0 ? 0 : $from.before(depth)
      const start = $from.start(depth)
      block = {
        node: parent,
        pos,
        start,
        depth,
      }
    }
  }

  return block
}

export function isBlockSelected(selection: Selection): boolean {
  const { $from, $to } = selection

  // Find blocks at both ends of the selection
  const fromBlock = findCurrentBlock(TextSelection.create(selection.$anchor.doc, $from.pos, $from.pos))
  const toBlock = findCurrentBlock(TextSelection.create(selection.$anchor.doc, $to.pos, $to.pos))

  if (!fromBlock || !toBlock) return false

  // If selection spans multiple blocks, check if all blocks are selected
  if (fromBlock.start !== toBlock.start) {
    const selectionFrom = selection.from
    const selectionTo = selection.to
    const firstBlockFrom = fromBlock.start
    const lastBlockTo = toBlock.start + toBlock.node.content.size
    return selectionFrom === firstBlockFrom && selectionTo === lastBlockTo
  }

  // Single block selection
  const block = fromBlock
  const { start, node, pos } = block
  const blockFrom = start
  const blockTo = start + node.content.size

  if (selection instanceof NodeSelection) {
    return selection.$anchor.pos === pos
  }

  const selectionFrom = selection.from
  const selectionTo = selection.to
  return selectionFrom === blockFrom && selectionTo === blockTo
}

export const selectCurrentBlock: Command = (state, dispatch) => {
  const { selection } = state
  const { $from, $to } = selection

  // Find blocks at both ends of the selection
  const fromBlock = findCurrentBlock(TextSelection.create(state.doc, $from.pos, $from.pos))
  const toBlock = findCurrentBlock(TextSelection.create(state.doc, $to.pos, $to.pos))

  if (!fromBlock || !toBlock) return false

  // If selection spans multiple blocks, select from first block start to last block end
  if (fromBlock.start !== toBlock.start) {
    if (dispatch) {
      const tr = state.tr
      const from = fromBlock.start
      const to = toBlock.start + toBlock.node.content.size
      tr.setSelection(TextSelection.create(tr.doc, from, to))
      tr.scrollIntoView()
      dispatch(tr)
    }
    return true
  }

  // Single block selection - use existing logic
  const { node, start, pos } = fromBlock

  if (dispatch) {
    const tr = state.tr
    if (node.isAtom) {
      tr.setSelection(NodeSelection.create(tr.doc, pos))
    } else {
      const from = start
      const to = start + node.content.size
      tr.setSelection(TextSelection.create(tr.doc, from, to))
    }
    tr.scrollIntoView()
    dispatch(tr)
  }
  return true
}
