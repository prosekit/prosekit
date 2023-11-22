import hljs from 'highlight.js/lib/common'
import { defineBasicExtension } from 'prosekit/basic'
import { union } from 'prosekit/core'
import { defineCodeBlock } from 'prosekit/extensions/code-block'
import { defineReactNodeView } from 'prosekit/react'

import CodeBlockView from './code-block-view'

export function defineExtension() {
  return union([
    defineBasicExtension(),
    defineCodeBlock({ hljs }),
    defineReactNodeView({
      name: 'codeBlock',
      component: CodeBlockView,
    }),
  ])
}

export type EditorExtension = ReturnType<typeof defineExtension>
