import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import {
  defineCodeBlock,
  defineCodeBlockShiki,
} from 'prosekit/extensions/code-block'
import { defineVueNodeView, type VueNodeViewComponent } from 'prosekit/vue'

import CodeBlockView from './code-block-view.vue'

export function defineExtension() {
  return union([
    defineBasicExtension(),
    defineCodeBlock(),
    defineCodeBlockShiki(),
    defineVueNodeView({
      name: 'codeBlock',
      contentAs: 'code',
      component: CodeBlockView as VueNodeViewComponent,
    }),
  ])
}

export type EditorExtension = ReturnType<typeof defineExtension>
