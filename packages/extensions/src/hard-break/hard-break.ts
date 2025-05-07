import {
  union,
  type Union,
} from '@prosekit/core'

import {
  defineHardBreakCommands,
  type HardBreakCommandsExtension,
} from './hard-break-commands'
import { defineHardBreakKeymap } from './hard-break-keymap'
import {
  defineHardBreakSpec,
  type HardBreakSpecExtension,
} from './hard-break-spec'

/**
 * @internal
 */
export type HardBreakExtension = Union<
  [HardBreakSpecExtension, HardBreakCommandsExtension]
>

/**
 * @public
 */
export function defineHardBreak(): HardBreakExtension {
  return union(
    defineHardBreakSpec(),
    defineHardBreakKeymap(),
    defineHardBreakCommands(),
  )
}
