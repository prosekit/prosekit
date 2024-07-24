import {
  defineBaseKeymap,
  defineDoc,
  defineParagraph,
  defineText,
  union,
} from 'prosekit/core'
import { defineGapCursor } from 'prosekit/extensions/gap-cursor'
import { defineImage } from 'prosekit/extensions/image'

export function defineExtension() {
  return union([
    defineBaseKeymap(),
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineGapCursor(),
    defineImage(),
  ])
}

export type EditorExtension = ReturnType<typeof defineExtension>
