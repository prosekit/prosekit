import { canUseRegexLookbehind, type PlainExtension } from '@prosekit/core'

import { defineMarkInputRule, type MarkInputRuleOptions } from '../input-rule/index.ts'

/**
 * The input rule options behind {@link defineCodeInputRule}.
 *
 * @internal
 */
export const codeInputRule: MarkInputRuleOptions = {
  regex: /* @__PURE__ */ new RegExp(
    (canUseRegexLookbehind() ? String.raw`(?<=\s|^)` : '')
      + '`([^\\s`]|[^\\s`][^`]{0,490}[^\\s`])`$',
  ),
  type: 'code',
}

/**
 * @internal
 */
export function defineCodeInputRule(): PlainExtension {
  return defineMarkInputRule(codeInputRule)
}
