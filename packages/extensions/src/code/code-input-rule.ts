import { canUseRegexLookbehind, type PlainExtension } from '@prosekit/core'

import { defineMarkInputRule } from '../input-rule/index.ts'

/**
 * @internal
 */
export function defineCodeInputRule(): PlainExtension {
  return defineMarkInputRule({
    regex: new RegExp((canUseRegexLookbehind() ? String.raw`(?<=\s|^)` : '') + '`([^\\s`]|[^\\s`][^`]*[^\\s`])`$'),
    type: 'code',
  })
}
