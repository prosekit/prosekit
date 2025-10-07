import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineTextAlign } from 'prosekit/extensions/text-align'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    defineTextAlign({ types: ['paragraph', 'heading'] }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
