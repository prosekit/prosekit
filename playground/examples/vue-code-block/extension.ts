import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineVueNodeView } from 'prosekit/vue'

import CodeBlockView from './code-block-view.vue'
import { defineShikijiCodeBlock } from './shikiji'

export function defineExtension() {
  return union([
    defineBasicExtension(),
    defineShikijiCodeBlock(),
    defineVueNodeView({
      name: 'codeBlock',
      component: CodeBlockView,
    }),
  ])
}

export type EditorExtension = ReturnType<typeof defineExtension>
