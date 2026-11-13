import type { Extension } from 'prosekit/core'
import { defineVueNodeView, type VueNodeViewComponent } from 'prosekit/vue'

import CodeBlockView from './code-block-view.vue'

export function defineCodeBlockView(): Extension {
  return defineVueNodeView({
    name: 'codeBlock',
    contentAs: 'code',
    stopEvent: (event) => event.target instanceof Element && !!event.target.closest('select'),
    component: CodeBlockView as VueNodeViewComponent,
  })
}
