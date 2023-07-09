import { addNodeSpec, defineExtension } from '@prosekit/core'

export function addBlockquoteSpec() {
  return addNodeSpec({
    name: 'blockquote',
    spec: {
      content: 'block+',
      group: 'block',
      defining: true,
      parseDOM: [{ tag: 'blockquote' }],
      toDOM() {
        return ['blockquote', 0]
      },
    },
  })
}

/** @public */
export function addBlockquote() {
  return defineExtension([addBlockquoteSpec()])
}
