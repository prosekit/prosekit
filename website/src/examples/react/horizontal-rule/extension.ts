import {
  defineBaseKeymap,
  defineDoc_DEBUG2,
  defineParagraph,
  defineText,
  union,
} from 'prosekit/core'
import { defineHorizontalRule } from 'prosekit/extensions/horizontal-rule'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc_DEBUG2(),
    defineText(),
    defineParagraph(),
    defineHorizontalRule(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
