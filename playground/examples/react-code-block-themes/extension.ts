import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineCodeBlock } from 'prosekit/extensions/code-block'

export function defineExtension() {
  return union([defineBasicExtension(), defineCodeBlock()])
}

export type EditorExtension = ReturnType<typeof defineExtension>
