import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { definePageBreak, definePageRendering } from 'prosekit/extensions/page'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    definePageBreak(),
    definePageRendering(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
