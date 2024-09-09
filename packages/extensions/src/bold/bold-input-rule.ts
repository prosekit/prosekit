import { canUseRegexLookbehind } from '@prosekit/core'

import { defineMarkInputRule } from '../input-rule'

/**
 * @internal
 */
export function defineBoldInputRule() {
  return defineMarkInputRule({
    regex: canUseRegexLookbehind()
      ? /(?<=\s|^)\*\*([^\s*]|[^\s*][^*]*[^\s*])\*\*$/
      : /\*\*([^\s*]|[^\s*][^*]*[^\s*])\*\*$/,
    type: 'bold',
  })
}
