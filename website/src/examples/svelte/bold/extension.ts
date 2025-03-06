import {
  defineBaseKeymap,
  defineDoc,
  defineParagraph,
  defineText,
  union,
} from 'prosekit/core'
import { defineBold } from 'prosekit/extensions/bold'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineBold(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
