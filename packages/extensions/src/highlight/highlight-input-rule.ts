import { canUseRegexLookbehind, type PlainExtension } from '@prosekit/core'

import { defineMarkInputRule } from '../input-rule/index.ts'

/**
 * @internal
 */
export function defineHighlightInputRule(): PlainExtension {
  return defineMarkInputRule({
    regex: canUseRegexLookbehind()
      ? /(?<=\s|^)==([^\s=]|[^\s=][^=]*[^\s=])==$/
      : /==([^\s=]|[^\s=][^=]*[^\s=])==$/,
    type: 'highlight',
  })
}
