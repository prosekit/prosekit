import {
  defineBaseCommands,
  defineBaseKeymap,
  defineDoc,
  defineHistory,
  defineParagraph,
  defineText,
  union,
  type BaseKeymapExtension,
  type DocExtension,
  type HistoryExtension,
  type TextExtension,
  type Union,
} from '@prosekit/core'
import { defineBlockquote, type BlockquoteExtension } from '@prosekit/extensions/blockquote'
import { defineBold } from '@prosekit/extensions/bold'
import { defineCode } from '@prosekit/extensions/code'
import { defineDropCursor } from '@prosekit/extensions/drop-cursor'
import { defineHeading, type HeadingExtension } from '@prosekit/extensions/heading'
import { defineImage } from '@prosekit/extensions/image'
import { defineItalic } from '@prosekit/extensions/italic'
import { defineLink } from '@prosekit/extensions/link'
import { defineList, type ListExtension } from '@prosekit/extensions/list'
import { defineModClickPrevention } from '@prosekit/extensions/mod-click-prevention'
import { defineStrike } from '@prosekit/extensions/strike'
import { defineTable } from '@prosekit/extensions/table'
import { defineUnderline } from '@prosekit/extensions/underline'
import { defineVirtualSelection } from '@prosekit/extensions/virtual-selection'

/**
 * @public
 */
export type BasicExtension = Union<[
  DocExtension,
  TextExtension,
  HeadingExtension,
  HistoryExtension,
  ListExtension,
  BlockquoteExtension,
  BaseKeymapExtension,
]>


/**
 * Define a basic extension that includes some common functionality. You can
 * copy this function and customize it to your needs.
 * @public
 */
export function defineBasicExtension() {
  return union([
    defineDoc(),
    defineText(),
    defineHeading(),
    defineHistory(),
    defineList(),
    defineBlockquote(),
    defineBaseKeymap(),
    defineBaseCommands(),
    defineItalic(),
    defineBold(),
    // defineUnderline(),
    // defineStrike(),
    // defineCode(),
    // defineLink(),
    // defineImage(),
    // defineParagraph(),
    // defineDropCursor(),
    // defineVirtualSelection(),
    // defineModClickPrevention(),
    // defineTable(),
  ])
}

