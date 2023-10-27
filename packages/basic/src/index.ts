import {
  defineBaseCommands,
  defineBaseKeymap,
  defineDoc,
  defineHistory,
  defineParagraph,
  defineText,
  union,
} from '@prosekit/core'
import { defineBold } from '@prosekit/extensions/bold'
import { defineHeading } from '@prosekit/extensions/heading'
import { defineImage } from '@prosekit/extensions/image'
import { defineItalic } from '@prosekit/extensions/italic'
import { defineList } from '@prosekit/extensions/list'

/** @public */
export function defineBasicExtension() {
  return union([
    defineDoc(),
    defineText(),
    defineHeading(),
    defineHistory(),
    defineList(),
    defineBaseKeymap(),
    defineBaseCommands(),
    defineItalic(),
    defineBold(),
    defineImage(),
    defineParagraph(),
  ])
}

export type BasicExtension = ReturnType<typeof defineBasicExtension>
