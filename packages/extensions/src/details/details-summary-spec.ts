import { defineNodeSpec, type Extension } from '@prosekit/core'
import type { Attrs } from '@prosekit/pm/model'

/**
 * @internal
 */
export type DetailsSummarySpecExtension = Extension<{
  Nodes: {
    detailsSummary: Attrs
  }
}>

/**
 * Defines the `detailsSummary` node spec. This node can only appear as the
 * first child of a `details` node.
 */
export function defineDetailsSummarySpec(): DetailsSummarySpecExtension {
  return defineNodeSpec({
    name: 'detailsSummary',
    content: 'inline*',
    defining: true,
    parseDOM: [{ tag: 'summary' }],
    toDOM() {
      return ['summary', 0]
    },
  })
}
