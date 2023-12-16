import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import {
  defineCodeBlock,
  defineCodeBlockHighlight,
} from 'prosekit/extensions/code-block'

import { defineCodeBlockView } from './code-block-view'
import { parser } from './shikiji'

export function defineRootExtension() {
  return union([
    defineBasicExtension(),
    defineCodeBlock(),
    defineCodeBlockHighlight({ parser }),
    defineCodeBlockView(),
  ])
}

export type RootExtension = ReturnType<typeof defineRootExtension>
