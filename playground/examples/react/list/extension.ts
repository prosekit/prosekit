import {
  defineBaseKeymap,
  defineDoc,
  defineParagraph,
  defineText,
  union,
} from 'prosekit/core'
import { defineList } from 'prosekit/extensions/list'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineList(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
