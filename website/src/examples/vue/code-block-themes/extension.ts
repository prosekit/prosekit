import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'

export function defineExtension() {
  return union(defineBasicExtension())
}

export type EditorExtension = ReturnType<typeof defineExtension>
