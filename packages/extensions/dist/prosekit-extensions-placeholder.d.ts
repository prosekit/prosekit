import { EditorState } from "@prosekit/pm/state";
import { PlainExtension } from "@prosekit/core";

//#region src/placeholder/index.d.ts
interface PlaceholderOptions {
  /**
   * The placeholder to use. It can be a static string or a function that
   * receives the current editor state and returns a string.
   */
  placeholder: string | ((state: EditorState) => string);
  /**
   * By default, the placeholder text will be shown whenever the current text
   * cursor is in an empty text node and it's not inside a code block or a
   * table node.
   *
   * If you only want to show the placeholder when the whole doc is empty, you
   * can set this option to 'doc'.
   *
   * You can also pass a function that receives the current editor state and
   * returns a boolean value to determine whether the placeholder should be
   * shown.
   *
   * @default 'block'
   */
  strategy?: 'doc' | 'block' | ((state: EditorState) => boolean);
}
/**
 * Add a placeholder text to the editor when the current block or document is
 * empty.
 */
declare function definePlaceholder(options: PlaceholderOptions): PlainExtension;
//#endregion
export { PlaceholderOptions, definePlaceholder };
//# sourceMappingURL=prosekit-extensions-placeholder.d.ts.map