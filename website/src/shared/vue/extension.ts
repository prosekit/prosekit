import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineMention } from 'prosekit/extensions/mention'

export function defineExtension() {
  return union([defineBasicExtension(), defineMention()])
}

export type EditorExtension = ReturnType<typeof defineExtension>
