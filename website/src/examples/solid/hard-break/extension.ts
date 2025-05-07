import {
  defineBaseKeymap,
  defineDoc,
  defineParagraph,
  defineText,
  union,
} from 'prosekit/core'
import { defineHardBreak } from 'prosekit/extensions/hard-break'

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
