import { PlainExtension } from "@prosekit/core";

//#region src/drop-cursor/drop-cursor.d.ts
interface DropCursorOptions {
  /**
   * The color of the cursor.  Use `false` to apply no color and rely only on class.
   *
   * @default 'black'
   */
  color?: string | false;
  /**
   * The precise width of the cursor in pixels.
   *
   * @default 1
   */
  width?: number;
  /**
   * A CSS class name to add to the cursor element.
   */
  class?: string;
}
/**
 * @internal
 */
type DropCursorExtension = PlainExtension;
/**
 * Show up a decoration at the drop position when something is dragged over the editor.
 *
 * See [prosemirror-dropcursor](https://github.com/ProseMirror/prosemirror-dropcursor) for more information.
 *
 * You probably want to use `<DropIndicator />` component instead of this extension.
 *
 * @public
 */
declare function defineDropCursor(options?: DropCursorOptions): DropCursorExtension;
//#endregion
export { type DropCursorExtension, type DropCursorOptions, defineDropCursor };
//# sourceMappingURL=prosekit-extensions-drop-cursor.d.ts.map