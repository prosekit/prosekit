import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { definePlaceholder } from 'prosekit/extensions/placeholder'

import { defineEmojiEnterRule, defineEmojiSpaceRule } from './emoji'

export function defineRootExtension() {
  return union([
    defineBasicExtension(),
    definePlaceholder({
      placeholder: 'Try to type :apple: or :banana: then press Enter or Space',
    }),
    defineEmojiEnterRule(),
    defineEmojiSpaceRule(),
  ])
}

export type RootExtension = ReturnType<typeof defineRootExtension>
