import { definePlugin, union, type Extension } from '@prosekit/core'
import { createListPlugins, listInputRules } from 'prosemirror-flat-list'

import { defineInputRule } from '../input-rule'

import { defineListCommands } from './commands'
import { defineListKeymap } from './keymap'
import { defineListSpec } from './spec'
import type { ListAttrs } from './types'

export { ListDOMSerializer } from 'prosemirror-flat-list'
export type {
  DedentListOptions,
  IndentListOptions,
  ListAttributes,
  ToggleCollapsedOptions,
  UnwrapListOptions,
  WrapInListGetAttrs,
} from 'prosemirror-flat-list'

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

export { defineListCommands, defineListKeymap, defineListSpec, type ListAttrs }
