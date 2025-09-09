import {
  union,
  type Union,
} from '@prosekit/core'

import {
  defineListCommands,
  type ListCommandsExtension,
} from './list-commands'
import { defineListDropIndicator } from './list-drop-indicator'
import { defineListInputRules } from './list-input-rules'
import { defineListKeymap } from './list-keymap'
import { defineListPlugins } from './list-plugins'
import { defineListSerializer } from './list-serializer'
import {
  defineListSpec,
  type ListSpecExtension,
} from './list-spec'
import type { ListAttrs } from './list-types'

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
    defineListSerializer(),
    defineListDropIndicator(),
  )
}
