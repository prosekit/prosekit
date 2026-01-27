import { defineBaseCommands, defineBaseKeymap, defineHistory, union } from "@prosekit/core";
import { defineBlockquote } from "@prosekit/extensions/blockquote";
import { defineBold } from "@prosekit/extensions/bold";
import { defineCode } from "@prosekit/extensions/code";
import { defineCodeBlock } from "@prosekit/extensions/code-block";
import { defineDoc } from "@prosekit/extensions/doc";
import { defineGapCursor } from "@prosekit/extensions/gap-cursor";
import { defineHardBreak } from "@prosekit/extensions/hard-break";
import { defineHeading } from "@prosekit/extensions/heading";
import { defineHorizontalRule } from "@prosekit/extensions/horizontal-rule";
import { defineImage } from "@prosekit/extensions/image";
import { defineItalic } from "@prosekit/extensions/italic";
import { defineLink } from "@prosekit/extensions/link";
import { defineList } from "@prosekit/extensions/list";
import { defineModClickPrevention } from "@prosekit/extensions/mod-click-prevention";
import { defineParagraph } from "@prosekit/extensions/paragraph";
import { defineStrike } from "@prosekit/extensions/strike";
import { defineTable } from "@prosekit/extensions/table";
import { defineText } from "@prosekit/extensions/text";
import { defineUnderline } from "@prosekit/extensions/underline";
import { defineVirtualSelection } from "@prosekit/extensions/virtual-selection";

//#region src/index.ts
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
function defineBasicExtension() {
	return union(defineDoc(), defineText(), defineParagraph(), defineHeading(), defineList(), defineBlockquote(), defineImage(), defineHorizontalRule(), defineHardBreak(), defineTable(), defineCodeBlock(), defineItalic(), defineBold(), defineUnderline(), defineStrike(), defineCode(), defineLink(), defineBaseKeymap(), defineBaseCommands(), defineHistory(), defineGapCursor(), defineVirtualSelection(), defineModClickPrevention());
}

//#endregion
export { defineBasicExtension };
//# sourceMappingURL=prosekit-basic.js.map