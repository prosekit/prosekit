import {
  union,
  type Union,
} from '@prosekit/core'

import {
  defineSelectBlockCommands,
  type SelectBlockCommandsExtension,
} from './select-block-commands'

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
  )
}

