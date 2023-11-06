import {
  defineBaseKeymap,
  defineDoc,
  defineParagraph,
  defineText,
  union,
} from 'prosekit/core'
import { defineStrike } from 'prosekit/extensions/strike'

export function defineExtension() {
  return union([
    defineBaseKeymap(),
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineStrike(),
  ])
}

export type EditorExtension = ReturnType<typeof defineExtension>
