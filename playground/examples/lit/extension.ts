import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'

import { defineCodeBlockView } from './code-block-view'
import { defineShikijiCodeBlock } from './shikiji'

export function defineRootExtension() {
  return union([
    defineBasicExtension(),
    defineShikijiCodeBlock(),
    defineCodeBlockView(),
  ])
}

export type RootExtension = ReturnType<typeof defineRootExtension>
