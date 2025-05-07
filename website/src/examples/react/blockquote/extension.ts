import {
  defineBaseKeymap,
  defineDoc_DEBUG2,
  defineParagraph,
  defineText,
  union,
} from 'prosekit/core'
import { defineBlockquote } from 'prosekit/extensions/blockquote'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc_DEBUG2(),
    defineText(),
    defineParagraph(),
    defineBlockquote(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
