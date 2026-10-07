import { canUseRegexLookbehind, defineBaseKeymap, union } from 'prosekit/core'
import { defineDoc } from 'prosekit/extensions/doc'
import { defineMarkInputRule } from 'prosekit/extensions/input-rule'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { defineSubscript } from 'prosekit/extensions/subscript'
import { defineSuperscript } from 'prosekit/extensions/superscript'
import { defineText } from 'prosekit/extensions/text'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineSubscript(),
    defineSuperscript(),
    defineMarkInputRule({
      regex: new RegExp(
        (canUseRegexLookbehind() ? String.raw`(?<=\s|^)` : '')
          + String.raw`~([^\s~]|[^\s~][^~]*[^\s~])~$`,
      ),
      type: 'subscript',
    }),
    defineMarkInputRule({
      regex: new RegExp(
        (canUseRegexLookbehind() ? String.raw`(?<=\s|^)` : '')
          + String.raw`\^([^\s^]|[^\s^][^^]*[^\s^])\^$`,
      ),
      type: 'superscript',
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
