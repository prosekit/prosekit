import {
  defineBaseKeymap,
  defineDoc,
  defineParagraph,
  defineText,
  union,
} from 'prosekit/core'
import { defineHorizontalRule } from 'prosekit/extensions/horizontal-rule'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineHorizontalRule(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
