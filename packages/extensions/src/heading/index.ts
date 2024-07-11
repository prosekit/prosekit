import { union } from '@prosekit/core'

import { defineHeadingCommands } from './commands'
import { defineHeadingInputRule } from './input-rule'
import { defineHeadingKeymap } from './keymap'
import { defineHeadingSpec } from './spec'
import type { HeadingAttrs } from './types'

/**
 * @public
 */
export function defineHeading() {
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
  type HeadingAttrs,
}
