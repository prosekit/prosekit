import type { Extension } from 'prosekit/core'
import { definePreactNodeView, type PreactNodeViewComponent } from 'prosekit/preact'

import CodeBlockView from './code-block-view.tsx'

export function defineCodeBlockView(): Extension {
  return definePreactNodeView({
    name: 'codeBlock',
    contentAs: 'code',
    component: CodeBlockView satisfies PreactNodeViewComponent,
  })
}
