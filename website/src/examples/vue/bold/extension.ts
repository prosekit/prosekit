import {
  defineBaseKeymap,
  defineDoc_DEBUG2,
  defineParagraph,
  defineText,
  union,
} from 'prosekit/core'
import { defineBold } from 'prosekit/extensions/bold'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc_DEBUG2(),
    defineText(),
    defineParagraph(),
    defineBold(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
