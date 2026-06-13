import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineColumnGroup } from 'prosekit/extensions/columns'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    defineColumnGroup({
      minColumnWidth: 160,
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
