import { definePlugin } from '@prosekit/core'
import { type Parser, createHighlightPlugin } from 'prosemirror-highlight'

export function defineCodeBlockHighlight({ parser }: { parser: Parser }) {
  return definePlugin(
    createHighlightPlugin({ parser, nodeTypes: ['codeBlock'] }),
  )
}
