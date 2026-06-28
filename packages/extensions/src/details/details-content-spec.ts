import { defineNodeSpec, type Extension } from '@prosekit/core'
import type { Attrs } from '@prosekit/pm/model'

/**
 * @internal
 */
export type DetailsContentSpecExtension = Extension<{
  Nodes: {
    detailsContent: Attrs
  }
}>

/**
 * Defines the `detailsContent` node spec.
 */
export function defineDetailsContentSpec(): DetailsContentSpecExtension {
  return defineNodeSpec<'detailsContent', Attrs>({
    name: 'detailsContent',
    content: 'block+',
    parseDOM: [{ tag: 'div[data-type="detailsContent"]' }],
    toDOM() {
      return ['div', { 'data-type': 'detailsContent' }, 0]
    },
  })
}
