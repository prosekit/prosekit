import {
  defineBaseKeymap,
  defineDoc,
  defineParagraph,
  defineText,
  union,
} from 'prosekit/core'
import { defineHeading } from 'prosekit/extensions/heading'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineHeading(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
