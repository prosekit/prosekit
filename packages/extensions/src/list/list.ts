import { union, type Union } from '@prosekit/core'

import { defineListCommands, type ListCommandsExtension } from './list-commands'
import { defineListInputRules } from './list-input-rules'
import { defineListKeymap } from './list-keymap'
import { defineListPlugins } from './list-plugins'
import { defineListSpec, type ListSpecExtension } from './list-spec'
import type { ListAttrs } from './list-types'

export { ListDOMSerializer } from 'prosemirror-flat-list'
export type {
  DedentListOptions,
  IndentListOptions,
  ToggleCollapsedOptions,
  UnwrapListOptions,
  WrapInListGetAttrs,
} from 'prosemirror-flat-list'

/**
 * @internal
 */
export type ListExtension = Union<[ListSpecExtension, ListCommandsExtension]>

/**
 * @public
 */
export function defineList(): ListExtension {
  return union(
    defineListSpec(),
    defineListPlugins(),
    defineListKeymap(),
    defineListInputRules(),
    defineListCommands(),
  )
}

export {
  defineListCommands,
  defineListInputRules,
  defineListKeymap,
  defineListPlugins,
  defineListSpec,
  type ListAttrs,
  type ListCommandsExtension,
  type ListSpecExtension,
}
