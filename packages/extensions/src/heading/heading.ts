import { union, type Union } from '@prosekit/core'

import { defineHeadingCommands, type HeadingCommandsExtension } from './heading-commands.ts'
import { defineHeadingInputRule } from './heading-input-rule.ts'
import { defineHeadingKeymap } from './heading-keymap.ts'
import { defineHeadingSpec, type HeadingSpecExtension } from './heading-spec.ts'

/**
 * @internal
 */
export type HeadingExtension = Union<
  [HeadingSpecExtension, HeadingCommandsExtension]
>

/**
 * @public
 */
export function defineHeading(): HeadingExtension {
  return union(
    defineHeadingSpec(),
    defineHeadingInputRule(),
    defineHeadingKeymap(),
    defineHeadingCommands(),
  )
}
