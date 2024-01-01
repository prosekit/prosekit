import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import {
  defineCodeBlock,
  defineCodeBlockShikiji,
} from 'prosekit/extensions/code-block'

import { defineCodeBlockView } from './code-block-view'

export function defineRootExtension() {
  return union([
    defineBasicExtension(),
    defineCodeBlock(),
    defineCodeBlockShikiji(),
    defineCodeBlockView(),
  ])
}

export type RootExtension = ReturnType<typeof defineRootExtension>
