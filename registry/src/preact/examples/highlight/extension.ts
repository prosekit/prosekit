import { defineBaseKeymap, union } from 'prosekit/core'
import { defineDoc } from 'prosekit/extensions/doc'
import { defineHighlight } from 'prosekit/extensions/highlight'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { defineText } from 'prosekit/extensions/text'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineHighlight(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>