import { canUseRegexLookbehind, type PlainExtension } from '@prosekit/core'

import { defineMarkInputRule } from '../input-rule/index.ts'

/**
 * @internal
 */
export function defineBoldInputRule(): PlainExtension {
  return defineMarkInputRule({
    regex: new RegExp((canUseRegexLookbehind() ? String.raw`(?<=\s|^)` : '') + String.raw`\*\*([^\s*]|[^\s*][^*]*[^\s*])\*\*$`),
    type: 'bold',
  })
}
