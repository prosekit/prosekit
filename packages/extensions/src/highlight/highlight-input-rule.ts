import { canUseRegexLookbehind, type PlainExtension } from '@prosekit/core'

import { defineMarkInputRule, type MarkInputRuleOptions } from '../input-rule/index.ts'

/**
 * The input rule options behind {@link defineHighlightInputRule}.
 *
 * @internal
 */
export const highlightInputRule: MarkInputRuleOptions = {
  regex: /* @__PURE__ */ new RegExp(
    (canUseRegexLookbehind() ? String.raw`(?<=\s|^)` : '')
      + String.raw`==([^\s=]|[^\s=][^=]{0,400}[^\s=])==$`,
  ),
  type: 'highlight',
}

/**
 * @internal
 */
export function defineHighlightInputRule(): PlainExtension {
  return defineMarkInputRule(highlightInputRule)
}
