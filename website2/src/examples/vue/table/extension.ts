import {
  defineBaseKeymap,
  defineDoc,
  defineParagraph,
  defineText,
  union,
} from 'prosekit/core'
import { defineTable } from 'prosekit/extensions/table'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineTable(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
