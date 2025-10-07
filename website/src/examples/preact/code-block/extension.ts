import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import {
  defineCodeBlock,
  defineCodeBlockShiki,
} from 'prosekit/extensions/code-block'
import {
  definePreactNodeView,
  type PreactNodeViewComponent,
} from 'prosekit/preact'

import CodeBlockView from './code-block-view'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    defineCodeBlock(),
    defineCodeBlockShiki(),
    definePreactNodeView({
      name: 'codeBlock',
      contentAs: 'code',
      component: CodeBlockView satisfies PreactNodeViewComponent,
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
