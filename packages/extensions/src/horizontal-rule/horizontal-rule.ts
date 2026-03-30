import { union, type Union } from '@prosekit/core'

import { defineHorizontalRuleCommands, type HorizontalRuleCommandsExtension } from './horizontal-rule-commands.ts'
import { defineHorizontalRuleInputRule } from './horizontal-rule-input-rule.ts'
import { defineHorizontalRuleSpec, type HorizontalRuleSpecExtension } from './horizontal-rule-spec.ts'

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
