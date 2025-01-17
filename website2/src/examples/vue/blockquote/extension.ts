import {
  defineBaseKeymap,
  defineDoc,
  defineParagraph,
  defineText,
  union,
} from 'prosekit/core'
import { defineBlockquote } from 'prosekit/extensions/blockquote'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineBlockquote(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
