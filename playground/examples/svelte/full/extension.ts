import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import {
  defineCodeBlock,
  defineCodeBlockShiki,
} from 'prosekit/extensions/code-block'
import { defineMention } from 'prosekit/extensions/mention'
import { definePlaceholder } from 'prosekit/extensions/placeholder'
import {
  defineSvelteNodeView,
  type SvelteNodeViewComponent,
} from 'prosekit/svelte'

import CodeBlockView from './code-block-view.svelte'

export function defineExtension() {
  return union([
    defineBasicExtension(),
    definePlaceholder({ placeholder: 'Press / for commands...' }),
    defineMention(),
    defineCodeBlock(),
    defineCodeBlockShiki(),
    defineSvelteNodeView({
      name: 'codeBlock',
      contentAs: 'code',
      component: CodeBlockView as unknown as SvelteNodeViewComponent,
    }),
  ])
}

export type EditorExtension = ReturnType<typeof defineExtension>
