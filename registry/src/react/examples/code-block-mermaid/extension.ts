import { defineBaseKeymap, union } from 'prosekit/core'
import { defineCode } from 'prosekit/extensions/code'
import { defineCodeBlock, defineCodeBlockPreviewDecorations, defineCodeBlockShiki } from 'prosekit/extensions/code-block'
import { defineDoc } from 'prosekit/extensions/doc'
import { defineHeading } from 'prosekit/extensions/heading'
import { defineParagraph } from 'prosekit/extensions/paragraph'
import { defineText } from 'prosekit/extensions/text'
import { defineReactNodeView, type ReactNodeViewComponent } from 'prosekit/react'

import MermaidCodeBlockView from './code-block-view'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc(),
    defineText(),
    defineText(),
    defineCode(),
    defineCodeBlock(),
    defineCodeBlockShiki({ themes: ['tokyo-night'], langs: ['mermaid'] }),
    defineCodeBlockPreviewDecorations(),
    defineReactNodeView({
      name: 'codeBlock',
      contentAs: 'code',
      component: MermaidCodeBlockView satisfies ReactNodeViewComponent,
    }),
    defineHeading(),
    defineParagraph(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
