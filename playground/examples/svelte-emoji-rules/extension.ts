import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'

import { defineEmojiEnterRule } from './emoji'

export function defineRootExtension() {
  return union([defineBasicExtension(), defineEmojiEnterRule()])
}

export type RootExtension = ReturnType<typeof defineRootExtension>
