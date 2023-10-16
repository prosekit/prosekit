import { defineNodeSpec, union } from '@prosekit/core'

export function defineBlockquoteSpec() {
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

/** @public */
export function defineBlockquote() {
  return union([defineBlockquoteSpec()])
}
