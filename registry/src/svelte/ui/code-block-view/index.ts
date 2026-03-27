import type { Extension } from 'prosekit/core'
import { defineSvelteNodeView, type SvelteNodeViewComponent } from 'prosekit/svelte'

import CodeBlockView from './code-block-view.svelte'

export function defineCodeBlockView(): Extension {
  return defineSvelteNodeView({
    name: 'codeBlock',
    contentAs: 'code',
    component: CodeBlockView as SvelteNodeViewComponent,
  })
}
