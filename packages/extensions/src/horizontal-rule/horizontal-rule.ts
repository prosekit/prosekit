import { union, type Union } from '@prosekit/core'

import { defineHorizontalRuleCommands, type HorizontalRuleCommandsExtension } from './horizontal-rule-commands'
import { defineHorizontalRuleInputRule } from './horizontal-rule-input-rule'
import { defineHorizontalRuleSpec, type HorizontalRuleSpecExtension } from './horizontal-rule-spec'

export type HorizontalRuleExtension = Union<
  [HorizontalRuleSpecExtension, HorizontalRuleCommandsExtension]
>

/**
 * @public
 */
export function defineHorizontalRule(): HorizontalRuleExtension {
  return union(
    defineHorizontalRuleSpec(),
    defineHorizontalRuleInputRule(),
    defineHorizontalRuleCommands(),
  )
}
