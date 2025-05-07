import {
  defineBaseKeymap,
  defineDoc_DEBUG2,
  defineParagraph,
  defineText,
  union,
} from 'prosekit/core'
import { defineDropCursor } from 'prosekit/extensions/drop-cursor'
import { defineImage } from 'prosekit/extensions/image'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc_DEBUG2(),
    defineText(),
    defineParagraph(),
    defineImage(),
    defineDropCursor({
      color: false,
      width: 4,
      class: 'CSS_DROP_CURSOR',
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
