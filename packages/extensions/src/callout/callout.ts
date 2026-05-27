import { union, type PlainExtension, type Union } from '@prosekit/core'

import { defineCalloutCommands, type CalloutCommandsExtension } from './callout-commands.ts'
import { defineCalloutInputRule } from './callout-input-rule.ts'
import { defineCalloutSpec, type CalloutSpecExtension } from './callout-spec.ts'

/**
 * @internal
 */
export type CalloutExtension = Union<
  [CalloutSpecExtension, PlainExtension, CalloutCommandsExtension]
>

export function defineCallout(): CalloutExtension {
  return union(
    defineCalloutSpec(),
    defineCalloutInputRule(),
    defineCalloutCommands(),
  )
}
