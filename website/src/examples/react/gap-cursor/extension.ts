import {
  defineBaseKeymap,
  defineDoc_DEBUG2,
  defineParagraph,
  defineText,
  union,
} from 'prosekit/core'
import { defineGapCursor } from 'prosekit/extensions/gap-cursor'
import { defineImage } from 'prosekit/extensions/image'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc_DEBUG2(),
    defineText(),
    defineParagraph(),
    defineGapCursor(),
    defineImage(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
