import {
  Priority,
  defineCommands,
  defineKeymap,
  defineNodeSpec,
  definePlugin,
  insertNode,
  union,
  withPriority,
  type Extension,
} from '@prosekit/core'
import type { Command } from '@prosekit/pm/state'
import {
  createListPlugins,
  createListSpec,
  createDedentListCommand as dedentList,
  createIndentListCommand as indentList,
  listInputRules,
  listKeymap,
  createMoveListCommand as moveList,
  createSplitListCommand as splitList,
  createToggleCollapsedCommand as toggleCollapsed,
  createToggleListCommand as toggleList,
  createUnwrapListCommand as unwrapList,
  createWrapInListCommand as wrapInList,
  type ListAttributes,
} from 'prosemirror-flat-list'

import { defineInputRule } from '../input-rule'

export { ListDOMSerializer } from 'prosemirror-flat-list'

export type {
  DedentListOptions,
  IndentListOptions,
  ListAttributes,
  ToggleCollapsedOptions,
  UnwrapListOptions,
  WrapInListGetAttrs,
} from 'prosemirror-flat-list'

export function defineListSpec() {
  return defineNodeSpec({ ...createListSpec(), name: 'list' })
}

function insertList(attrs?: ListAttributes): Command {
  return insertNode({ type: 'list', attrs })
}

/**
 * Define list commands
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

export function defineListPlugins() {
  return definePlugin(({ schema }) => createListPlugins({ schema }))
}

/**
 * Returns a extension that adds key bindings for list.
 *
 * @public
 */
export function defineListKeymap() {
  return defineKeymap(listKeymap)
}

export function defineListInputRules(): Extension {
  return union(listInputRules.map(defineInputRule))
}

/**
 * @public
 */
export function defineList() {
  return union([
    defineListSpec(),
    defineListPlugins(),
    // Use a high priority to override the default key bindings.
    withPriority(defineListKeymap(), Priority.high),
    defineListInputRules(),
    defineListCommands(),
  ])
}
