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
 * and the optional `<b>` token becomes the head. Returns a {@link NodeSelection}
 * when `<a>` resolves inside a block parent, a {@link TextSelection} when it
 * resolves inside inline content, or `undefined` when the document contains no
 * tags.
 *
 * @example
 *
 * ```ts
 * const editor = createTestEditor({ extension })
 * const n = editor.nodes
 * const doc = n.doc(n.paragraph('<a>Hello<b> world!'))
 * const selection = extractSelection(doc) // TextSelection covering "Hello"
 * ```
 */
export function extractSelection(doc: ProseMirrorNode): Selection | undefined {
  return maybeGetSelection(doc)
}
