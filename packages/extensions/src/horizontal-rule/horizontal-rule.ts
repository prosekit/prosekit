import { type Union, union } from '@prosekit/core'

import {
  type HorizontalRuleCommandsExtension,
  defineHorizontalRuleCommands,
} from './horizontal-rule-commands'
import { defineHorizontalRuleInputRule } from './horizontal-rule-input-rule'
import {
  type HorizontalRuleSpecExtension,
  defineHorizontalRuleSpec,
} from './horizontal-rule-spec'

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
