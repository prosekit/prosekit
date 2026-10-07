import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineFontFamily } from 'prosekit/extensions/font-family'

export function defineExtension() {
  return union(defineBasicExtension(), defineFontFamily())
}

export type EditorExtension = ReturnType<typeof defineExtension>
