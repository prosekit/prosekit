import {
  defineBaseKeymap,
  defineDoc_DEBUG2,
  defineParagraph,
  defineText,
  union,
} from 'prosekit/core'
import { defineUnderline } from 'prosekit/extensions/underline'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc_DEBUG2(),
    defineText(),
    defineParagraph(),
    defineUnderline(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
