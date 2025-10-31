import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineCodeBlockShiki } from 'prosekit/extensions/code-block'
import {
  defineSvelteNodeView,
  type SvelteNodeViewComponent,
} from 'prosekit/svelte'

import CodeBlockView from './code-block-view.svelte'

export function defineExtension() {
  return union(
    defineBasicExtension(),
    defineCodeBlockShiki(),
    defineSvelteNodeView({
      name: 'codeBlock',
      contentAs: 'code',
      component: CodeBlockView as SvelteNodeViewComponent,
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
