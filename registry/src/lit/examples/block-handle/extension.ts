import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'

import { defineCodeBlockView } from '../../ui/code-block-view'

export function defineExtension() {
  return union(defineBasicExtension(), defineCodeBlockView())
}

export type EditorExtension = ReturnType<typeof defineExtension>
