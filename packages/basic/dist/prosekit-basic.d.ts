import { BaseCommandsExtension, BaseKeymapExtension, HistoryExtension, Union } from "@prosekit/core";
import { BlockquoteExtension } from "@prosekit/extensions/blockquote";
import { BoldExtension } from "@prosekit/extensions/bold";
import { CodeExtension } from "@prosekit/extensions/code";
import { CodeBlockExtension } from "@prosekit/extensions/code-block";
import { DocExtension } from "@prosekit/extensions/doc";
import { GapCursorExtension } from "@prosekit/extensions/gap-cursor";
import { HardBreakExtension } from "@prosekit/extensions/hard-break";
import { HeadingExtension } from "@prosekit/extensions/heading";
import { HorizontalRuleExtension } from "@prosekit/extensions/horizontal-rule";
import { ImageExtension } from "@prosekit/extensions/image";
import { ItalicExtension } from "@prosekit/extensions/italic";
import { LinkExtension } from "@prosekit/extensions/link";
import { ListExtension } from "@prosekit/extensions/list";
import { ModClickPreventionExtension } from "@prosekit/extensions/mod-click-prevention";
import { ParagraphExtension } from "@prosekit/extensions/paragraph";
import { StrikeExtension } from "@prosekit/extensions/strike";
import { TableExtension } from "@prosekit/extensions/table";
import { TextExtension } from "@prosekit/extensions/text";
import { UnderlineExtension } from "@prosekit/extensions/underline";
import { VirtualSelectionExtension } from "@prosekit/extensions/virtual-selection";

//#region src/index.d.ts
/**
 * @internal
 */
type BasicExtension = Union<[DocExtension, TextExtension, ParagraphExtension, HeadingExtension, ListExtension, BlockquoteExtension, ImageExtension, HorizontalRuleExtension, HardBreakExtension, TableExtension, CodeBlockExtension, ItalicExtension, BoldExtension, UnderlineExtension, StrikeExtension, CodeExtension, LinkExtension, BaseKeymapExtension, BaseCommandsExtension, HistoryExtension, GapCursorExtension, VirtualSelectionExtension, ModClickPreventionExtension]>;
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
 * - {@link defineGapCursor}
 * - {@link defineVirtualSelection}
 * - {@link defineModClickPrevention}
 *
 * @public
 */
declare function defineBasicExtension(): BasicExtension;
//#endregion
export { BasicExtension, defineBasicExtension };
//# sourceMappingURL=prosekit-basic.d.ts.map