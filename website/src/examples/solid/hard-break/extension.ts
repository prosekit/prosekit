import {
  defineBaseKeymap,
  union,
} from 'prosekit/core'
import { defineDoc } from 'prosekit/extensions/doc'
import { defineHardBreak } from 'prosekit/extensions/hard-break'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { defineText } from 'prosekit/extensions/text'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineHardBreak(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
