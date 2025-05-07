import {
  defineBaseKeymap,
  defineDoc_DEBUG2,
  defineParagraph,
  defineText,
  union,
} from 'prosekit/core'
import { defineStrike } from 'prosekit/extensions/strike'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc_DEBUG2(),
    defineText(),
    defineParagraph(),
    defineStrike(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
