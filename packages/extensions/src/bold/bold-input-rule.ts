import {
  canUseRegexLookbehind,
  type PlainExtension,
} from '@prosekit/core'

import { defineMarkInputRule } from '../input-rule'

/**
 * @internal
 */
export function defineBoldInputRule(): PlainExtension {
  return defineMarkInputRule({
    regex: canUseRegexLookbehind()
      ? /(?<=\s|^)\*\*([^\s*]|[^\s*][^*]*[^\s*])\*\*$/
      : /\*\*([^\s*]|[^\s*][^*]*[^\s*])\*\*$/,
    type: 'bold',
  })
}
