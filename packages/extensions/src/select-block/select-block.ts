import {
  union,
  type Union,
} from '@prosekit/core'

import {
  defineSelectBlockCommands,
  type SelectBlockCommandsExtension,
} from './select-block-commands'
import { defineSelectBlockKeymap } from './select-block-keymap'

/**
 * @internal
 */
export type SelectBlockExtension = Union<[SelectBlockCommandsExtension]>

/**
 * @public
 */
export function defineSelectBlock(): SelectBlockExtension {
  return union(
    defineSelectBlockCommands(),
    defineSelectBlockKeymap(),
  )
}

