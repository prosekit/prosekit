import { union, type Union } from '@prosekit/core'

import { defineSuperscriptCommands, type SuperscriptCommandsExtension } from './superscript-commands.ts'
import { defineSuperscriptSpec, type SuperscriptSpecExtension } from './superscript-spec.ts'

/**
 * @internal
 */
export type SuperscriptExtension = Union<
  [SuperscriptSpecExtension, SuperscriptCommandsExtension]
>

export function defineSuperscript(): SuperscriptExtension {
  return union(
    defineSuperscriptSpec(),
    defineSuperscriptCommands(),
  )
}
