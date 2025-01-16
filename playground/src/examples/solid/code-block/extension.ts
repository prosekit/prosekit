import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import {
  defineCodeBlock,
  defineCodeBlockShiki,
} from 'prosekit/extensions/code-block'
import {
  defineSolidNodeView,
  type SolidNodeViewComponent,
} from 'prosekit/solid'

import CodeBlockView from './code-block-view'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    defineCodeBlock(),
    defineCodeBlockShiki(),
    defineSolidNodeView({
      name: 'codeBlock',
      contentAs: 'code',
      component: CodeBlockView satisfies SolidNodeViewComponent,
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
