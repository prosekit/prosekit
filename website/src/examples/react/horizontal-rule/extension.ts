import { defineBaseKeymap } from 'prosekit/core'

import {
  defineDoc,
  defineDoc,
} from 'prosekit/extensions/doc'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { defineText } from 'prosekit/extensions/text'

import { union } from 'prosekit/core'
import { defineHorizontalRule } from 'prosekit/extensions/horizontal-rule'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineHorizontalRule(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
