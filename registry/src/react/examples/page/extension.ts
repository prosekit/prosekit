import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { definePageBreak } from 'prosekit/extensions/page'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    definePageBreak(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
