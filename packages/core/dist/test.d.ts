import { n as EditorInstance, r as EditorOptions, t as Editor, w as Extension } from "./editor.js";
import { Selection } from "@prosekit/pm/state";
import { ProseMirrorNode } from "@prosekit/pm/model";
import { EditorView } from "@prosekit/pm/view";
/**
 * Pastes plain text into the editor.
 *
 * @example
 *
 * ```ts
 * pasteText(editor.view, 'Hello')
 * ```
 *
 * @internal
 */
declare function pasteText(view: EditorView, text: string): void;
/**
 * Pastes HTML into the editor.
 *
 * @example
 *
 * ```ts
 * pasteHTML(editor.view, '<p>Hello <strong>world</strong></p>')
 * ```
 *
 * @internal
 */
declare function pasteHTML(view: EditorView, html: string): void;
/**
 * Pastes files into the editor.
 *
 * @example
 *
 * ```ts
 * pasteFiles(editor.view, [new File(['hi'], 'hi.txt')])
 * ```
 *
 * @internal
 */
declare function pasteFiles(view: EditorView, files: File[]): void;
/**
 * Reads text of the given MIME type from the clipboard (defaults to plain text).
 *
 * @example
 *
 * ```ts
 * const text = await readClipboardText()
 * ```
 *
 * @internal
 */
declare function readClipboardText(mimeType?: string): Promise<string | undefined>;
/**
 * Reads raw HTML from the clipboard.
 *
 * @example
 *
 * ```ts
 * const html = await readClipboardHTML()
 * ```
 *
 * @internal
 */
declare function readClipboardHTML(): Promise<string | undefined>;
/**
 * An editor for testing purposes.
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
declare function createTestEditor<E extends Extension>(options: EditorOptions<E>): TestEditor<E>;
/**
 * Extracts a {@link Selection} from a tagged ProseMirror document built with
 * the test node builders. The position of the `<a>` token becomes the anchor,
 * and the optional `<b>` token becomes the head. Returns a `TextSelection` when
 * `<a>` resolves inside inline content, a `NodeSelection` when `<a>` resolves
 * inside a block parent, or `undefined` when the document contains no tags.
 *
 * @example
 *
 * Extracting a `TextSelection`:
 *
 * ```ts
 * const editor = createTestEditor({ extension })
 * const n = editor.nodes
 * const doc = n.doc(n.paragraph('<a>Hello<b> world!'))
 * const selection = extractSelection(doc) // TextSelection covering "Hello"
 * ```
 *
 * @example
 *
 * Extracting a `NodeSelection`:
 *
 * ```ts
 * const editor = createTestEditor({ extension })
 * const n = editor.nodes
 * const doc = n.doc('<a>', n.paragraph('foo'))
 * const selection = extractSelection(doc) // NodeSelection on the paragraph
 * ```
 *
 * @example
 *
 * A document without tags returns `undefined`:
 *
 * ```ts
 * const editor = createTestEditor({ extension })
 * const n = editor.nodes
 * const doc = n.doc(n.paragraph('Hello world!'))
 * const selection = extractSelection(doc) // undefined
 * ```
 */
declare function extractSelection(doc: ProseMirrorNode): Selection | undefined;
export { type TestEditor, createTestEditor, extractSelection, pasteFiles, pasteHTML, pasteText, readClipboardHTML, readClipboardText };
//# sourceMappingURL=test.d.ts.map