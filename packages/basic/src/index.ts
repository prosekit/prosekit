import {
  Priority,
  defineBaseCommands,
  defineBaseKeymap,
  defineDoc,
  defineHistory,
  defineParagraph,
  defineText,
  union,
  withPriority,
} from '@prosekit/core'
import { defineBold } from '@prosekit/extensions/bold'
import { defineHeading } from '@prosekit/extensions/heading'
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
    withPriority(defineParagraph(), Priority.high),
  ])
}

export type BasicExtension = ReturnType<typeof defineBasicExtension>
