import {
  defineBaseCommands,
  defineBaseKeymap,
  defineHistory,
  union,
  type BaseCommandsExtension,
  type BaseKeymapExtension,
  type HistoryExtension,
  type Union,
} from '@prosekit/core'
import {
  defineBlockquote,
  type BlockquoteExtension,
} from '@prosekit/extensions/blockquote'
import {
  defineBold,
  type BoldExtension,
} from '@prosekit/extensions/bold'
import {
  defineCode,
  type CodeExtension,
} from '@prosekit/extensions/code'
import {
  defineCodeBlock,
  type CodeBlockExtension,
} from '@prosekit/extensions/code-block'
import {
  defineDoc,
  type DocExtension,
} from '@prosekit/extensions/doc'
import {
  defineDropCursor,
  type DropCursorExtension,
} from '@prosekit/extensions/drop-cursor-v2'
import {
  defineGapCursor,
  type GapCursorExtension,
} from '@prosekit/extensions/gap-cursor'
import {
  defineHardBreak,
  type HardBreakExtension,
} from '@prosekit/extensions/hard-break'
import {
  defineHeading,
  type HeadingExtension,
} from '@prosekit/extensions/heading'
import {
  defineHorizontalRule,
  type HorizontalRuleExtension,
} from '@prosekit/extensions/horizontal-rule'
import {
  defineImage,
  type ImageExtension,
} from '@prosekit/extensions/image'
import {
  defineItalic,
  type ItalicExtension,
} from '@prosekit/extensions/italic'
import {
  defineLink,
  type LinkExtension,
} from '@prosekit/extensions/link'
import {
  defineList,
  type ListExtension,
} from '@prosekit/extensions/list'
import {
  defineModClickPrevention,
  type ModClickPreventionExtension,
} from '@prosekit/extensions/mod-click-prevention'
import {
  defineParagraph,
  type ParagraphExtension,
} from '@prosekit/extensions/paragraph'
import {
  defineStrike,
  type StrikeExtension,
} from '@prosekit/extensions/strike'
import {
  defineTable,
  type TableExtension,
} from '@prosekit/extensions/table'
import {
  defineText,
  type TextExtension,
} from '@prosekit/extensions/text'
import {
  defineUnderline,
  type UnderlineExtension,
} from '@prosekit/extensions/underline'
import {
  defineVirtualSelection,
  type VirtualSelectionExtension,
} from '@prosekit/extensions/virtual-selection'

/**
 * @internal
 */
export type BasicExtension = Union<
  [
    // Nodes
    DocExtension,
    TextExtension,
    ParagraphExtension,
    HeadingExtension,
    ListExtension,
    BlockquoteExtension,
    ImageExtension,
    HorizontalRuleExtension,
    HardBreakExtension,
    TableExtension,
    CodeBlockExtension,
    // Marks
    ItalicExtension,
    BoldExtension,
    UnderlineExtension,
    StrikeExtension,
    CodeExtension,
    LinkExtension,
    // Others
    BaseKeymapExtension,
    BaseCommandsExtension,
    HistoryExtension,
    DropCursorExtension,
    GapCursorExtension,
    VirtualSelectionExtension,
    ModClickPreventionExtension,
  ]
>

/**
 * Define a basic extension that includes some common functionality. You can
 * copy this function and customize it to your needs.
 *
 * It's a combination of the following extension functions:
 *
 * - {@link defineDoc}
 * - {@link defineText}
 * - {@link defineParagraph}
 * - {@link defineHeading}
 * - {@link defineList}
 * - {@link defineBlockquote}
 * - {@link defineImage}
 * - {@link defineHorizontalRule}
 * - {@link defineHardBreak}
 * - {@link defineTable}
 * - {@link defineCodeBlock}
 * - {@link defineItalic}
 * - {@link defineBold}
 * - {@link defineUnderline}
 * - {@link defineStrike}
 * - {@link defineCode}
 * - {@link defineLink}
 * - {@link defineBaseKeymap}
 * - {@link defineBaseCommands}
 * - {@link defineHistory}
 * - {@link defineDropCursor}
 * - {@link defineGapCursor}
 * - {@link defineVirtualSelection}
 * - {@link defineModClickPrevention}
 *
 * @public
 */
export function defineBasicExtension(): BasicExtension {
  return union(
    // Nodes
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineHeading(),
    defineList(),
    defineBlockquote(),
    defineImage(),
    defineHorizontalRule(),
    defineHardBreak(),
    defineTable(),
    defineCodeBlock(),
    // Marks
    defineItalic(),
    defineBold(),
    defineUnderline(),
    defineStrike(),
    defineCode(),
    defineLink(),
    // Others
    defineBaseKeymap(),
    defineBaseCommands(),
    defineHistory(),
    defineDropCursor(),
    defineGapCursor(),
    defineVirtualSelection(),
    defineModClickPrevention(),
  )
}
