import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineReactNodeView } from 'prosekit/react'

import CodeBlockView from './code-block-view'
import { defineShikijiCodeBlock } from './shikiji'

export function defineExtension() {
  return union([
    defineBasicExtension(),
    defineShikijiCodeBlock(),
    defineReactNodeView({
      name: 'codeBlock',
      component: CodeBlockView,
    }),
  ])
}

export type EditorExtension = ReturnType<typeof defineExtension>
