import {
  defineBaseKeymap,
  defineDoc,
  defineParagraph,
  defineText,
  union,
} from 'prosekit/core'
import { defineDropCursor } from 'prosekit/extensions/drop-cursor'
import { defineHeading } from 'prosekit/extensions/heading'
import { defineImage } from 'prosekit/extensions/image'

export function defineExtension() {
  return union([
    defineBaseKeymap(),
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineHeading(),
    defineImage(),
    defineDropCursor({color: "red", width: 4}),
  ])
}

export type EditorExtension = ReturnType<typeof defineExtension>
