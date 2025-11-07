import type {
  CursorAwareness,
  LoroDocType,
} from 'loro-prosemirror'
import {
  defineBaseCommands,
  defineBaseKeymap,
} from 'prosekit/core'
import { union } from 'prosekit/core'
import { defineBlockquote } from 'prosekit/extensions/blockquote'
import { defineBold } from 'prosekit/extensions/bold'
import { defineCode } from 'prosekit/extensions/code'
import { defineDoc } from 'prosekit/extensions/doc'
import { defineDropCursor } from 'prosekit/extensions/drop-cursor'
import { defineHeading } from 'prosekit/extensions/heading'
import { defineImage } from 'prosekit/extensions/image'
import { defineItalic } from 'prosekit/extensions/italic'
import { defineLink } from 'prosekit/extensions/link'
import { defineList } from 'prosekit/extensions/list'
import { defineLoro } from 'prosekit/extensions/loro'
import { defineModClickPrevention } from 'prosekit/extensions/mod-click-prevention'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { defineStrike } from 'prosekit/extensions/strike'
import { defineTable } from 'prosekit/extensions/table'
import { defineText } from 'prosekit/extensions/text'
import { defineUnderline } from 'prosekit/extensions/underline'
import { defineVirtualSelection } from 'prosekit/extensions/virtual-selection'

export function defineExtension(doc: LoroDocType, awareness: CursorAwareness) {
  return union([
    defineDoc(),
    defineText(),
    defineHeading(),
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
    defineLoro({ doc, awareness }),
  ])
}

export type EditorExtension = ReturnType<typeof defineExtension>
