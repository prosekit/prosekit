import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import {
  defineCodeBlock,
  defineCodeBlockShikiji,
} from 'prosekit/extensions/code-block'
import { defineMention } from 'prosekit/extensions/mention'
import { definePlaceholder } from 'prosekit/extensions/placeholder'
import { defineVueNodeView, type VueNodeViewComponent } from 'prosekit/vue'

import CodeBlockView from './code-block-view.vue'

export function defineExtension() {
  return union([
    defineBasicExtension(),
    definePlaceholder({ placeholder: 'Press / for commands...' }),
    defineMention(),
    defineCodeBlock(),
    defineCodeBlockShikiji(),
    defineVueNodeView({
      name: 'codeBlock',
      contentAs: 'code',
      component: CodeBlockView as VueNodeViewComponent,
    }),
  ])
}

export type EditorExtension = ReturnType<typeof defineExtension>
