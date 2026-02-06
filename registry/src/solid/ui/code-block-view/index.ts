import type { Extension } from 'prosekit/core'
import { defineSolidNodeView, type SolidNodeViewComponent } from 'prosekit/solid'

import CodeBlockView from './code-block-view'

export function defineCodeBlockView(): Extension {
  return defineSolidNodeView({
    name: 'codeBlock',
    contentAs: 'code',
    component: CodeBlockView satisfies SolidNodeViewComponent,
  })
}
