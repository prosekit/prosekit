import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { definePlaceholder } from 'prosekit/extensions/placeholder'

import { defineEmojiEnterRule } from './emoji'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    defineEmojiEnterRule(),
    definePlaceholder({ placeholder: 'Try typing :apple: then press Enter' }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
