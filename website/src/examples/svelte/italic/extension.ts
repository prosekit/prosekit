import { defineBaseKeymap } from 'prosekit/core'
import { union } from 'prosekit/core'
import { defineDoc } from 'prosekit/extensions/doc'
import { defineItalic } from 'prosekit/extensions/italic'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { defineText } from 'prosekit/extensions/text'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineItalic(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
