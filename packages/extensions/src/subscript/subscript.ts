import { union, type Union } from '@prosekit/core'

import { defineSubscriptCommands, type SubscriptCommandsExtension } from './subscript-commands.ts'
import { defineSubscriptSpec, type SubscriptSpecExtension } from './subscript-spec.ts'

/**
 * @internal
 */
export type SubscriptExtension = Union<
  [SubscriptSpecExtension, SubscriptCommandsExtension]
>

export function defineSubscript(): SubscriptExtension {
  return union(
    defineSubscriptSpec(),
    defineSubscriptCommands(),
  )
}
