import {
  defineBaseKeymap,
  defineDoc_DEBUG2,
  defineHistory,
  defineParagraph,
  defineText,
  union,
} from 'prosekit/core'
import { defineGapCursor } from 'prosekit/extensions/gap-cursor'
import { defineTable } from 'prosekit/extensions/table'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc_DEBUG2(),
    defineText(),
    defineParagraph(),
    defineTable(),
    defineHistory(),
    defineGapCursor(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
