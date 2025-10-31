import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineCodeBlockShiki } from 'prosekit/extensions/code-block'
import {
  defineReactNodeView,
  type ReactNodeViewComponent,
} from 'prosekit/react'

import CodeBlockView from './code-block-view'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    defineCodeBlockShiki(),
    defineReactNodeView({
      name: 'codeBlock',
      contentAs: 'code',
      component: CodeBlockView satisfies ReactNodeViewComponent,
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
