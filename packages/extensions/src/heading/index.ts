import { union, type Union } from '@prosekit/core'

import {
  defineHeadingCommands,
  type HeadingCommandsExtension,
} from './commands'
import {
  defineHeadingInputRule,
  
} from './input-rule'
import { defineHeadingKeymap  } from './keymap'
import { defineHeadingSpec, type HeadingSpecExtension } from './spec'
import type { HeadingAttrs } from './types'

/**
 * @internal
 */
export type HeadingExtension = Union<
  [
    HeadingSpecExtension,
  
 
    HeadingCommandsExtension,
  ]
>

/**
 * @public
 */
export function defineHeading(): HeadingExtension {
  return union([
    defineHeadingSpec(),
    defineHeadingInputRule(),
    defineHeadingKeymap(),
    defineHeadingCommands(),
  ])
}

export {
  defineHeadingCommands,
  defineHeadingInputRule,
  defineHeadingKeymap,
  defineHeadingSpec,
 
  type HeadingCommandsExtension,
  type HeadingSpecExtension,
  type HeadingAttrs,
}
