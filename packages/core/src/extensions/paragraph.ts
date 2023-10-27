import { withPriority } from '../editor/with-priority'
import { Priority } from '../types/priority'

import { defineNodeSpec } from './node-spec'

/**
 * @public
 *
 * Defines a paragraph node spec.
 */
export function defineParagraphSpec() {
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
 * @public
 *
 * Defines a paragraph node spec as the highest priority, because it should be the default block node for most cases.
 */
export function defineParagraph() {
  return withPriority(defineParagraphSpec(), Priority.highest)
}
