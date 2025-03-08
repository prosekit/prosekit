import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'

import { defineEmojiEnterRule } from './emoji'

export function defineExtension() {
  return union(defineBasicExtension(), defineEmojiEnterRule())
}

export type EditorExtension = ReturnType<typeof defineExtension>
