import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { definePlaceholder } from 'prosekit/extensions/placeholder'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    definePlaceholder({ placeholder: 'Press / for commands...' }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
