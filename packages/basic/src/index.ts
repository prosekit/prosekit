import {
  defineBaseCommands,
  defineBaseKeymap,
  defineDoc,
  defineHistory,
  defineParagraph,
  defineText,
  union,
  type BaseCommandsExtension,
  type BaseKeymapExtension,
  type DocExtension,
  type HistoryExtension,
  type TextExtension,
  type Union,
} from '@prosekit/core'
import {
  defineBlockquote,
  type BlockquoteExtension,
} from '@prosekit/extensions/blockquote'
import { defineBold, type BoldExtension } from '@prosekit/extensions/bold'
import { defineCode, type CodeExtension } from '@prosekit/extensions/code'
import {
  defineDropCursor,
  type DropCursorExtension,
} from '@prosekit/extensions/drop-cursor'
import {
  defineHeading,
  type HeadingExtension,
} from '@prosekit/extensions/heading'
import { defineImage, type ImageExtension } from '@prosekit/extensions/image'
import { defineItalic, type ItalicExtension } from '@prosekit/extensions/italic'
import { defineLink, type LinkExtension } from '@prosekit/extensions/link'
import { defineList, type ListExtension } from '@prosekit/extensions/list'
import {
  defineModClickPrevention,
  type ModClickPreventionExtension,
} from '@prosekit/extensions/mod-click-prevention'
import { defineStrike, type StrikeExtension } from '@prosekit/extensions/strike'
import { defineTable, type TableExtension } from '@prosekit/extensions/table'
import {
  defineUnderline,
  type UnderlineExtension,
} from '@prosekit/extensions/underline'
import {
  defineVirtualSelection,
  type VirtualSelectionExtension,
} from '@prosekit/extensions/virtual-selection'

import type { ParagraphExtension } from '../../core/src/extensions/paragraph'

/**
 * @public
 */
export type BasicExtension = Union<
  [
    DocExtension,
    TextExtension,
    HeadingExtension,
    HistoryExtension,
    ListExtension,
    BlockquoteExtension,
    BaseKeymapExtension,
    BaseCommandsExtension,
    ItalicExtension,
    BoldExtension,
    UnderlineExtension,
    StrikeExtension,
    CodeExtension,
    LinkExtension,
    ImageExtension,
    ParagraphExtension,
    DropCursorExtension,
    VirtualSelectionExtension,
    ModClickPreventionExtension,
    TableExtension,
  ]
>

/**
 * Define a basic extension that includes some common functionality. You can
 * copy this function and customize it to your needs.
 * @public
 */
export function defineBasicExtension(): BasicExtension {
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
    defineUnderline(),
    defineStrike(),
    defineCode(),
    defineLink(),
    defineImage(),
    defineParagraph(),
    defineDropCursor(),
    defineVirtualSelection(),
    defineModClickPrevention(),
    defineTable(),
  ])
}
