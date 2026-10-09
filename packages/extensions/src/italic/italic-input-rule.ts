import { canUseRegexLookbehind, type PlainExtension } from '@prosekit/core'

import { defineMarkInputRule, type MarkInputRuleOptions } from '../input-rule/index.ts'

/**
 * The input rule options behind {@link defineItalicInputRule}.
 *
 * @internal
 */
export const italicInputRule: MarkInputRuleOptions = {
  regex: /* @__PURE__ */ new RegExp(
    (canUseRegexLookbehind() ? String.raw`(?<=\s|^)` : '')
      + String.raw`\*([^\s*]|[^\s*][^*]*[^\s*])\*$`,
  ),
  type: 'italic',
}

/**
 * @internal
 */
export function defineItalicInputRule(): PlainExtension {
  return defineMarkInputRule(italicInputRule)
}
