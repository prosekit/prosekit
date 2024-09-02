import { defineNodeSpec, type Extension } from '@prosekit/core'
import type { Attrs } from '@prosekit/pm/model'

export type BlockquoteSpecExtension = Extension<{
  Nodes: {
    blockquote: Attrs
  }
}>

export function defineBlockquoteSpec(): BlockquoteSpecExtension {
  return defineNodeSpec({
    name: 'blockquote',
    content: 'block+',
    group: 'block',
    defining: true,
    parseDOM: [{ tag: 'blockquote' }],
    toDOM() {
      return ['blockquote', 0]
    },
  })
}
