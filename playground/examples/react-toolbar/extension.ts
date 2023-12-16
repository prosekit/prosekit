import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import {
  defineCodeBlock,
  defineCodeBlockHighlight,
} from 'prosekit/extensions/code-block'
import { defineReactNodeView } from 'prosekit/react'

import CodeBlockView from './code-block-view'
import { parser } from './shikiji'

export function defineExtension() {
  return union([
    defineBasicExtension(),
    defineCodeBlock(),
    defineCodeBlockHighlight({ parser }),
    defineReactNodeView({
      name: 'codeBlock',
      component: CodeBlockView,
    }),
  ])
}

export type EditorExtension = ReturnType<typeof defineExtension>
