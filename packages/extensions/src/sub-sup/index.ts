import { union, type Union } from '@prosekit/core'

export { defineSubSupCommands, type SubSupCommandsExtension } from './sub-sup-commands.ts'
export { defineSubSupInputRule, type SubSupInputRuleExtension } from './sub-sup-input-rule.ts'
export { defineSubSupSpec, type SubSupSpecExtension } from './sub-sup-spec.ts'

import { defineSubSupCommands, type SubSupCommandsExtension } from './sub-sup-commands.ts'
import { defineSubSupInputRule, type SubSupInputRuleExtension } from './sub-sup-input-rule.ts'
import { defineSubSupSpec, type SubSupSpecExtension } from './sub-sup-spec.ts'

/**
 * @internal
 */
export type SubSupExtension = Union<
  [SubSupSpecExtension, SubSupCommandsExtension, SubSupInputRuleExtension]
>

export function defineSubSup(): SubSupExtension {
  return union(
    defineSubSupSpec(),
    defineSubSupCommands(),
    defineSubSupInputRule(),
  )
}
