import { union, type Union } from '@prosekit/core'

import { defineHeadingCommands, type HeadingCommandsExtension } from './heading-commands'
import { defineHeadingInputRule } from './heading-input-rule'
import { defineHeadingKeymap } from './heading-keymap'
import { defineHeadingSpec, type HeadingSpecExtension } from './heading-spec'

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
