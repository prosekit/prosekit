import {
  defineBaseKeymap,
  defineDoc,
  defineParagraph,
  defineText,
  union,
} from 'prosekit/core'
import { defineCode } from 'prosekit/extensions/code'

export function defineExtension() {
  return union([
    defineBaseKeymap(),
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineCode(),
  ])
}

export type EditorExtension = ReturnType<typeof defineExtension>
