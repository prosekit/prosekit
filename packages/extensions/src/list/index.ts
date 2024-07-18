import { union } from '@prosekit/core'

import { defineListCommands } from './commands'
import { defineListInputRules } from './input-rules'
import { defineListKeymap } from './keymap'
import { defineListPlugins } from './plugins'
import { defineListSpec } from './spec'
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

export {
  defineListCommands,
  defineListInputRules,
  defineListKeymap,
  defineListPlugins,
  defineListSpec,
  type ListAttrs,
}
