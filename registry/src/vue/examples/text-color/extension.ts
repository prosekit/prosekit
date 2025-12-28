import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineTextColor } from 'prosekit/extensions/text-color'

export function defineExtension() {
  return union(defineBasicExtension(), defineTextColor())
}

export type EditorExtension = ReturnType<typeof defineExtension>
