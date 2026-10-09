import { canUseRegexLookbehind, type PlainExtension } from '@prosekit/core'

import { defineMarkInputRule, type MarkInputRuleOptions } from '../input-rule/index.ts'

/**
 * The input rule options behind {@link defineBoldInputRule}.
 *
 * @internal
 */
export const boldInputRule: MarkInputRuleOptions = {
  regex: /* @__PURE__ */ new RegExp(
    (canUseRegexLookbehind() ? String.raw`(?<=\s|^)` : '')
      + String.raw`\*\*([^\s*]|[^\s*][^*]*[^\s*])\*\*$`,
  ),
  type: 'bold',
}

/**
 * @internal
 */
export function defineBoldInputRule(): PlainExtension {
  return defineMarkInputRule(boldInputRule)
}
