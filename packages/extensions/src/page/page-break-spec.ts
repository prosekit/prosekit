import { defineNodeSpec, type Extension } from '@prosekit/core'
import type { Attrs } from '@prosekit/pm/model'

/**
 * @internal
 */
export type PageBreakSpecExtension = Extension<{
  Nodes: {
    pageBreak: Attrs
  }
}>

/**
 * @internal
 */
export function definePageBreakSpec(): PageBreakSpecExtension {
  return defineNodeSpec({
    name: 'pageBreak',
    group: 'block',
    selectable: true,
    parseDOM: [{ tag: 'div.prosemirror-page-break' }],
    toDOM() {
      return ['div', { class: 'prosemirror-page-break' }]
    },
  })
}
