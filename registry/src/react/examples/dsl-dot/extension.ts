import { defineBaseKeymap, union } from 'prosekit/core'
import { defineCodeBlock } from 'prosekit/extensions/code-block'
import { defineDoc } from 'prosekit/extensions/doc'
import { defineHeading } from 'prosekit/extensions/heading'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { defineText } from 'prosekit/extensions/text'
import { defineReactNodeView, type ReactNodeViewComponent } from 'prosekit/react'

import { defineCodeBlockPreviewDecorations } from '../../utils/code-block-preview-decorations'
import DotCodeBlockView from './code-block-view'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineCodeBlock(),
    defineCodeBlockPreviewDecorations(),
    defineReactNodeView({
      name: 'codeBlock',
      contentAs: 'code',
      component: DotCodeBlockView satisfies ReactNodeViewComponent,
    }),
    defineDoc(),
    defineText(),
    defineHeading(),
    defineParagraph(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
