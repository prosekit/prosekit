import {
  defineBaseKeymap,
  defineDoc,
  defineParagraph,
  defineText,
  union,
} from 'prosekit/core'
import { defineLink } from 'prosekit/extensions/link'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineLink(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
