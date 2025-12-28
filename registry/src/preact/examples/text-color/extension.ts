import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineBackgroundColor } from 'prosekit/extensions/background-color'
import { defineTextColor } from 'prosekit/extensions/text-color'

export function defineExtension() {
  return union(defineBasicExtension(), defineTextColor(), defineBackgroundColor())
}

export type EditorExtension = ReturnType<typeof defineExtension>
