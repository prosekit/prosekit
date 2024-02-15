import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import {
  defineCodeBlock,
  defineCodeBlockShiki,
} from 'prosekit/extensions/code-block'
import {
  defineReactNodeView,
  type ReactNodeViewComponent,
} from 'prosekit/react'

import CodeBlockView from './code-block-view'

export function defineExtension() {
  return union([
    defineBasicExtension(),
    defineCodeBlock(),
    defineCodeBlockShiki(),
    defineReactNodeView({
      name: 'codeBlock',
      contentAs: 'code',
      component: CodeBlockView satisfies ReactNodeViewComponent,
    }),
  ])
}

export type EditorExtension = ReturnType<typeof defineExtension>
