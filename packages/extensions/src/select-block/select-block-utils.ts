import {
  findParentNode,
  type FindParentNodeResult,
} from '@prosekit/core'
import type { ResolvedPos } from '@prosekit/pm/model'
import {
  NodeSelection,
  TextSelection,
  type Command,
  type Selection,
} from '@prosekit/pm/state'

function findCurrentBlock(selection: Selection): FindParentNodeResult | null {
  // Handle NodeSelection directly - return the selected node
  if (selection instanceof NodeSelection) {
    const node = selection.node
    const pos = selection.$anchor.pos
    const $pos = selection.$anchor
    const depth = $pos.depth

    // For atomic nodes (like images), return the node itself
    if (node.isAtom) {
      return {
        node,
        pos,
        start: pos,
        depth,
      }
    }

    // For non-atomic nodes, calculate the start position
    const start = $pos.start(depth)
    return {
      node,
      pos,
      start,
      depth,
    }
  }

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
  // Handle NodeSelection directly
  if (selection instanceof NodeSelection) {
    const block = findCurrentBlock(selection)
    if (!block) return false
    return selection.$anchor.pos === block.pos
  }

  const { $from, $to } = selection

  // Find blocks at both ends of the selection
  const fromBlock = findCurrentBlock(selection)
  // For multi-block selections, we need to check the end position
  // Create a temporary selection at the end position to find the block
  const endSelection = $from.pos !== $to.pos
    ? TextSelection.create(selection.$anchor.doc, $to.pos, $to.pos)
    : selection
  const toBlock = findCurrentBlock(endSelection)

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
  const { start, node } = block
  const blockFrom = start
  const blockTo = start + node.content.size

  const selectionFrom = selection.from
  const selectionTo = selection.to

  // If selection fully covers a text block, check if there's a container block
  // If so, check if the container block is selected instead
  if (node.isTextblock && selectionFrom === blockFrom && selectionTo === blockTo) {
    const containerBlock = findContainerBlock($from, block)
    if (containerBlock) {
      const containerFrom = containerBlock.start
      const containerTo = containerBlock.start + containerBlock.node.content.size
      // Check if selection matches the container block
      return selectionFrom === containerFrom && selectionTo === containerTo
    }
  }

  return selectionFrom === blockFrom && selectionTo === blockTo
}

/**
 * Find the container block (non-text block) that contains the text block
 */
function findContainerBlock($pos: ResolvedPos, textBlock: FindParentNodeResult): FindParentNodeResult | null {
  const textBlockDepth = textBlock.depth
  // Search upward for the nearest non-text block ancestor (without crossing doc)
  for (let d = textBlockDepth - 1; d > 0; d--) {
    const ancestor = $pos.node(d)
    if (ancestor.isBlock && !ancestor.isTextblock) {
      const pos = $pos.before(d)
      const start = $pos.start(d)
      return {
        node: ancestor,
        pos,
        start,
        depth: d,
      }
    }
  }
  return null
}

export const selectCurrentBlock: Command = (state, dispatch) => {
  const { selection } = state

  // Handle NodeSelection directly - keep it as NodeSelection
  if (selection instanceof NodeSelection) {
    const block = findCurrentBlock(selection)
    if (!block) return false

    if (dispatch) {
      const tr = state.tr
      // For atomic nodes, keep as NodeSelection
      if (block.node.isAtom) {
        tr.setSelection(NodeSelection.create(tr.doc, block.pos))
      } else {
        // For non-atomic nodes, select the entire node content
        const from = block.start
        const to = block.start + block.node.content.size
        tr.setSelection(TextSelection.create(tr.doc, from, to))
      }
      tr.scrollIntoView()
      dispatch(tr)
    }
    return true
  }

  const { $from, $to } = selection

  // Find blocks at both ends of the selection
  const fromBlock = findCurrentBlock(selection)
  // For multi-block selections, we need to check the end position
  const endSelection = $from.pos !== $to.pos
    ? TextSelection.create(state.doc, $to.pos, $to.pos)
    : selection
  const toBlock = findCurrentBlock(endSelection)

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

  // Single block selection
  const block = fromBlock
  const { node, start, pos } = block

  // Check if the selection fully covers a text block, and if there's a container block
  // If so, we should select the container block instead
  if (!node.isTextblock && !node.isAtom) {
    // Already a container block, select it
    if (dispatch) {
      const tr = state.tr
      const from = start
      const to = start + node.content.size
      tr.setSelection(TextSelection.create(tr.doc, from, to))
      tr.scrollIntoView()
      dispatch(tr)
    }
    return true
  }

  // If it's a text block, check if selection fully covers it
  if (node.isTextblock) {
    const textBlockFrom = start
    const textBlockTo = start + node.content.size
    const selectionFrom = selection.from
    const selectionTo = selection.to

    // If selection fully covers the text block, check for container block
    if (selectionFrom === textBlockFrom && selectionTo === textBlockTo) {
      const containerBlock = findContainerBlock($from, { node, pos, start, depth: block.depth })
      if (containerBlock) {
        // Select the container block instead
        if (dispatch) {
          const tr = state.tr
          const from = containerBlock.start
          const to = containerBlock.start + containerBlock.node.content.size
          tr.setSelection(TextSelection.create(tr.doc, from, to))
          tr.scrollIntoView()
          dispatch(tr)
        }
        return true
      }
    }
  }

  // Default: select the found block
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
