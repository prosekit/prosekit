import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { definePlaceholder } from 'prosekit/extensions/placeholder'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    definePlaceholder({
      placeholder: ({ node }) => {
        if (node.type.name === 'heading') {
          return `Heading ${node.attrs.level}`
        }
        return 'Type something...'
      },
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
