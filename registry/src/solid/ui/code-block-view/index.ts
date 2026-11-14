import type { Extension } from 'prosekit/core'
import { defineSolidNodeView, type SolidNodeViewComponent } from 'prosekit/solid'

import CodeBlockView from './code-block-view.tsx'

export function defineCodeBlockView(): Extension {
  return defineSolidNodeView({
    name: 'codeBlock',
    contentAs: 'code',
    stopEvent: (event) => event.target instanceof Element && !!event.target.closest('select'),
    component: CodeBlockView satisfies SolidNodeViewComponent,
  })
}
