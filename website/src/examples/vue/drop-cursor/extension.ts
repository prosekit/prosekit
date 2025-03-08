import { Themes } from '@prosekit/themes'
import {
  defineBaseKeymap,
  defineDoc,
  defineParagraph,
  defineText,
  union,
} from 'prosekit/core'
import { defineDropCursor } from 'prosekit/extensions/drop-cursor'
import { defineImage } from 'prosekit/extensions/image'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineImage(),
    defineDropCursor({
      color: false,
      width: 4,
      class: Themes.DROP_CURSOR,
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
