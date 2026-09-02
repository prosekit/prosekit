import { PlainExtension } from "@prosekit/core";
/**
 * @internal
 */
type GapCursorExtension = PlainExtension;
/**
 * Capture clicks near and arrow-key-motion past places that don't have a
 * normally selectable position nearby, and create a gap cursor selection for
 * them. The cursor is drawn as an element with class `ProseMirror-gapcursor`.
 *
 * You can either include `prosekit/extensions/gap-cursor.css` or add your own
 * styles to make it visible.
 *
 * See
 * [prosemirror-gapcursor](https://github.com/ProseMirror/prosemirror-gapcursor)
 * for more information.
 */
declare function defineGapCursor(): GapCursorExtension;
export { type GapCursorExtension, defineGapCursor };
//# sourceMappingURL=gap-cursor.d.ts.map