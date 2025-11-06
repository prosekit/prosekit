import { n as EditorInstance, r as EditorOptions, t as Editor, w as Extension } from "./editor-KZlceNQ1.js";
import { ProseMirrorNode } from "@prosekit/pm/model";

//#region src/test/test-editor.d.ts

/**
 * An editor for testing purposes.
 * @public
 */
declare class TestEditor<E extends Extension = Extension> extends Editor<E> {
  constructor(instance: EditorInstance);
  /**
   * Set the editor state to the given document. You can use special tokens
   * `<a>` and `<b>` to set the anchor and head positions of the selection.
   *
   * @example
   *
   * ```ts
   * const editor = createTestEditor({ extension })
   * const n = editor.nodes
   * const doc = n.doc(n.paragraph('<a>Hello<b> world!'))
   * editor.set(doc) // "Hello" is selected.
   * ```
   */
  set(doc: ProseMirrorNode): void;
  dispatchEvent(event: Event): void;
}
/**
 * @public
 */
declare function createTestEditor<E extends Extension>(options: EditorOptions<E>): TestEditor<E>;
//#endregion
export { type TestEditor, createTestEditor };
//# sourceMappingURL=prosekit-core-test.d.ts.map