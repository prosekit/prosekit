import type { ProseMirrorNode } from '@prosekit/pm/model'
import { NodeSelection, TextSelection, type Selection } from '@prosekit/pm/state'

import type { TaggedProseMirrorNode } from './test-builder.ts'

function maybeResolve(doc: ProseMirrorNode, pos?: number) {
  if (pos != null) {
    return doc.resolve(pos)
  }
  return
}

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
  const tagged: TaggedProseMirrorNode = doc
  const tags = tagged.tags
  const $a = maybeResolve(tagged, tags?.a)
  const $b = maybeResolve(tagged, tags?.b)

  if ($a) {
    if ($a.parent.inlineContent) {
      return new TextSelection($a, $b)
    } else {
      return new NodeSelection($a)
    }
  }
}

/**
 * @internal
 */
export function getSelection(doc: TaggedProseMirrorNode): Selection {
  return extractSelection(doc) || TextSelection.atStart(doc)
}
