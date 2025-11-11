import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineSelectBlock } from 'prosekit/extensions/select-block'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    defineSelectBlock(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
