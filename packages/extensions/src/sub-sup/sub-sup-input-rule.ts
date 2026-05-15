import {
  canUseRegexLookbehind,
  union,
  type PlainExtension,
} from '@prosekit/core'

import { defineMarkInputRule } from '../input-rule/index.ts'

/**
 * @internal
 */
export function defineSubSupInputRule(): PlainExtension {
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
