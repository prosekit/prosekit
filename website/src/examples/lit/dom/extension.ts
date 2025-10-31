import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineCodeBlockShiki } from 'prosekit/extensions/code-block'

import { defineCodeBlockView } from './code-block-view'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    defineCodeBlockShiki(),
    defineCodeBlockView(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
