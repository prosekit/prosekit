import type { Attrs } from '@prosekit/pm/model'

import { withPriority } from '../editor/with-priority'
import type { Extension } from '../types/extension'
import { Priority } from '../types/priority'

import { defineNodeSpec } from './node-spec'

/**
 * @internal
 */
type ParagraphSpecExtension = Extension<{
  Nodes: {
    paragraph: Attrs
  }
}>

/**
 * Defines a paragraph node spec.
 */
function defineParagraphSpec(): ParagraphSpecExtension {
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
 *
 * @deprecated Use the following import instead:
 *
 * ```ts
 * import type { ParagraphExtension } from 'prosekit/extensions/paragraph'
 * ```
 */
export type ParagraphExtension = ParagraphSpecExtension

/**
 * @public
 *
 * Defines a paragraph node spec as the highest priority, because it should be the default block node for most cases.
 *
 * @deprecated Use the following import instead:
 *
 * ```ts
 * import { defineParagraph } from 'prosekit/extensions/paragraph'
 * ```
 */
export function defineParagraph(): ParagraphExtension {
  console.warn(
    '[prosekit] The `defineParagraph` function from `prosekit/core` is deprecated. Use the following import instead: `import { defineParagraph } from "prosekit/extensions/paragraph"`.',
  )

  return withPriority(defineParagraphSpec(), Priority.highest)
}
