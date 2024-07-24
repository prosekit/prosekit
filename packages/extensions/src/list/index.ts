import { union, type Union } from '@prosekit/core'

import { defineListCommands, type ListCommandsExtension } from './commands'
import { defineListInputRules } from './input-rules'
import { defineListKeymap } from './keymap'
import { defineListPlugins } from './plugins'
import { defineListSpec, type ListSpecExtension } from './spec'
import type { ListAttrs } from './types'

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
  return union([
    defineListSpec(),
    defineListPlugins(),
    defineListKeymap(),
    defineListInputRules(),
    defineListCommands(),
  ])
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
