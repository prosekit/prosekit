import {
  defineCommands,
  defineNodeSpec,
  definePlugin,
  insertNode,
  union,
  type Extension,
} from '@prosekit/core'
import type { Command } from '@prosekit/pm/state'
import {
  createListPlugins,
  createListSpec,
  createDedentListCommand as dedentList,
  createIndentListCommand as indentList,
  listInputRules,
  createMoveListCommand as moveList,
  createSplitListCommand as splitList,
  createToggleCollapsedCommand as toggleCollapsed,
  createToggleListCommand as toggleList,
  createUnwrapListCommand as unwrapList,
  createWrapInListCommand as wrapInList,
  type ListAttributes,
} from 'prosemirror-flat-list'

import { defineInputRule } from '../input-rule'

import { defineListKeymap } from './keymap'

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
    defineListKeymap(),
    defineListInputRules(),
    defineListCommands(),
  ])
}

export { defineListKeymap }
