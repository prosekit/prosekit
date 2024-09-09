import { canUseRegexLookbehind } from '@prosekit/core'

import { defineMarkInputRule } from '../input-rule'

/**
 * @internal
 */
export function defineCodeInputRule() {
  return defineMarkInputRule({
    regex: canUseRegexLookbehind()
      ? /(?<=\s|^)`([^\s`]|[^\s`][^`]*[^\s`])`$/
      : /`([^\s`]|[^\s`][^`]*[^\s`])`$/,
    type: 'code',
  })
}
