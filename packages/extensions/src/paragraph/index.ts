import {
  defineNodeSpec,
  Priority,
  withPriority,
  type Extension,
} from '@prosekit/core'
import type { Attrs } from '@prosekit/pm/model'

/**
 * @internal
 */
type ParagraphSpecExtension = Extension<{
  Nodes: {
    paragraph: Attrs
  }
}>

/**
 * @public
 *
 * Defines a paragraph node spec.
 */
export function defineParagraphSpec(): ParagraphSpecExtension {
  return defineNodeSpec({
    name: 'paragraph',
    content: 'inline*',
    group: 'block',
    parseDOM: [{ tag: 'p' }],
    toDOM() {
      return ['p', 0]
    },
  })
}

/**
 * @internal
 */
export type ParagraphExtension = ParagraphSpecExtension

/**
 * @public
 *
 * Defines a paragraph node spec as the highest priority, because it should be the default block node for most cases.
 */
export function defineParagraph(): ParagraphExtension {
  return withPriority(defineParagraphSpec(), Priority.highest)
}
