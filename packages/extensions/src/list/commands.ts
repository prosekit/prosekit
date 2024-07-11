import { defineCommands, insertNode } from '@prosekit/core'
import type { Command } from '@prosekit/pm/state'
import type { ListAttributes } from 'prosemirror-flat-list'
import {
  createDedentListCommand as dedentList,
  createIndentListCommand as indentList,
  createMoveListCommand as moveList,
  createSplitListCommand as splitList,
  createToggleCollapsedCommand as toggleCollapsed,
  createToggleListCommand as toggleList,
  createUnwrapListCommand as unwrapList,
  createWrapInListCommand as wrapInList,
} from 'prosemirror-flat-list'

function insertList(attrs?: ListAttributes): Command {
  return insertNode({ type: 'list', attrs })
}

/**
 * Defines list commands
 */
export function defineListCommands() {
  return defineCommands({
    dedentList,
    indentList,
    moveList,
    splitList,
    toggleCollapsed,
    toggleList,
    unwrapList,
    wrapInList,
    insertList,
  })
}
