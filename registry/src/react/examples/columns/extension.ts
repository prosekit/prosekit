import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineColumns } from 'prosekit/extensions/columns'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    defineColumns({
      minColumnWidth: 160,
      defaultGap: 20,
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
