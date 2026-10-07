import { union, type Union } from '@prosekit/core'

import { defineHighlightCommands, type HighlightCommandsExtension } from './highlight-commands.ts'
import { defineHighlightInputRule } from './highlight-input-rule.ts'
import { defineHighlightKeymap } from './highlight-keymap.ts'
import { defineHighlightSpec, type HighlightSpecExtension } from './highlight-spec.ts'

/**
 * @internal
 */
export type HighlightExtension = Union<[HighlightSpecExtension, HighlightCommandsExtension]>

export function defineHighlight(): HighlightExtension {
  return union(
    defineHighlightSpec(),
    defineHighlightCommands(),
    defineHighlightKeymap(),
    defineHighlightInputRule(),
  )
}
