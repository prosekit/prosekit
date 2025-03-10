import {
  defineBaseKeymap,
  defineDoc,
  defineParagraph,
  defineText,
  union,
} from 'prosekit/core'
import { defineItalic } from 'prosekit/extensions/italic'

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
