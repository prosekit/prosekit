import { canUseRegexLookbehind, union, type PlainExtension } from '@prosekit/core'

import { defineMarkInputRule } from '../input-rule/index.ts'

/**
 * @internal
 */
export type SubSupInputRuleExtension = PlainExtension

/**
 * @internal
 */
export function defineSubSupInputRule(): SubSupInputRuleExtension {
  return union(
    defineMarkInputRule({
      regex: canUseRegexLookbehind()
        ? /(?<=\s|^)~([^\s~]|[^\s~][^~]*[^\s~])~$/
        : /~([^\s~]|[^\s~][^~]*[^\s~])~$/,
      type: 'subscript',
    }),
    defineMarkInputRule({
      regex: canUseRegexLookbehind()
        ? /(?<=\s|^)\^([^\s^]|[^\s^][^^]*[^\s^])\^$/
        : /\^([^\s^]|[^\s^][^^]*[^\s^])\^$/,
      type: 'superscript',
    }),
  )
}
