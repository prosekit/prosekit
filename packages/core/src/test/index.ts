/**
 * Some utilities for testing ProseKit.
 *
 * @module
 */

import type { ProseMirrorNode } from '@prosekit/pm/model'
import type { Selection } from '@prosekit/pm/state'

import { maybeGetSelection } from './test-editor.ts'

export { createTestEditor, type TestEditor } from './test-editor.ts'

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
export function extractSelection(doc: ProseMirrorNode): Selection | undefined {
  return maybeGetSelection(doc)
}
