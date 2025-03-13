import {
  defineBaseKeymap,
  defineDoc,
  defineParagraph,
  defineText,
  union,
} from 'prosekit/core'
import { defineUnderline } from 'prosekit/extensions/underline'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineUnderline(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
