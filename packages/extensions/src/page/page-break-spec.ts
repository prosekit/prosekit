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
    parseDOM: [{ tag: 'div.prosekit-page-break' }],
    toDOM() {
      return ['div', { class: 'prosekit-horizontal-rule prosekit-page-break' }, ['hr']]
    },
    pageBreak: true,
  })
}

declare module '@prosekit/pm/model' {
  interface NodeSpec {
    pageBreak?: boolean | undefined
  }
}
