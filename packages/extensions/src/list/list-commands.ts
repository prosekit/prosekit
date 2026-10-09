import { defineCommands, insertNode, type Extension } from '@prosekit/core'
import type { Command } from '@prosekit/pm/state'
import {
  createDedentListCommand as dedentList,
  createIndentListCommand as indentList,
  createMoveListCommand as moveList,
  createSplitListCommand as splitList,
  createToggleCollapsedCommand as toggleCollapsed,
  createToggleListCommand as toggleList,
  createUnwrapListCommand as unwrapList,
  createWrapInListCommand as wrapInList,
  type DedentListOptions,
  type IndentListOptions,
  type ListAttributes,
  type ToggleCollapsedOptions,
  type UnwrapListOptions,
} from 'prosemirror-flat-list'

import type { ListOptions } from './list-types.ts'

function insertList(attrs?: ListAttributes): Command {
  return insertNode({ type: 'list', attrs })
}

/**
 * @internal
 */
export type ListCommandsExtension = Extension<{
  Commands: {
    dedentList: [options?: DedentListOptions]
    indentList: [options?: IndentListOptions]
    moveList: [direction: 'up' | 'down']
    splitList: []
    toggleCollapsed: [options?: ToggleCollapsedOptions]
    unwrapList: [options?: UnwrapListOptions]
    toggleList: [attrs?: ListAttributes]
    wrapInList: [attrs?: ListAttributes]
    insertList: [attrs?: ListAttributes]
  }
}>

/**
 * Defines list commands.
 *
 * @internal
 */
export function defineListCommands(options?: ListOptions): ListCommandsExtension {
  const strict = options?.strict ?? false
  return defineCommands({
    dedentList: (options?: DedentListOptions) => dedentList({ strict, ...options }),
    indentList: (options?: IndentListOptions) => indentList({ strict, ...options }),
    moveList,
    splitList: () => splitList({ strict }),
    toggleCollapsed,
    unwrapList,
    toggleList,
    wrapInList,
    insertList,
  })
}

export { dedentList, indentList, insertList, moveList, splitList, toggleCollapsed, toggleList, unwrapList, wrapInList }
