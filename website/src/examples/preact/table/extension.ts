import {
  defineBaseKeymap,
  defineHistory,
  union,
} from 'prosekit/core'
import { defineDoc } from 'prosekit/extensions/doc'
import { defineGapCursor } from 'prosekit/extensions/gap-cursor'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { defineTable } from 'prosekit/extensions/table'
import { defineText } from 'prosekit/extensions/text'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineTable(),
    defineHistory(),
    defineGapCursor(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
