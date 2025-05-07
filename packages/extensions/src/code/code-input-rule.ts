import {
  canUseRegexLookbehind,
  type PlainExtension,
} from '@prosekit/core'

import { defineMarkInputRule } from '../input-rule'

/**
 * @internal
 */
export function defineCodeInputRule(): PlainExtension {
  return defineMarkInputRule({
    regex: canUseRegexLookbehind()
      ? /(?<=\s|^)`([^\s`]|[^\s`][^`]*[^\s`])`$/
      : /`([^\s`]|[^\s`][^`]*[^\s`])`$/,
    type: 'code',
  })
}
