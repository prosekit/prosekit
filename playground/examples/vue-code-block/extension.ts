import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'

import { defineShikijiCodeBlock } from './shikiji'

export function defineExtension() {
  return union([defineBasicExtension(), defineShikijiCodeBlock()])
}

export type EditorExtension = ReturnType<typeof defineExtension>
