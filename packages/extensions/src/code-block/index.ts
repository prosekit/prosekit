import {
  defineCommands,
  defineInputRule,
  defineNodeSpec,
  getNodeType,
  union,
} from '@prosekit/core'
import { textblockTypeInputRule } from '@prosekit/pm/inputrules'
import type { HLJSApi } from 'highlight.js'
import type { Parser } from 'prosemirror-highlight'

import { defineCodeBlockHighlight } from './code-block-highlight'
import { defineCodeBlockHighlightDeprecated } from './code-block-highlight-deprecated'
import type { CodeBlockAttrs } from './code-block-types'

export type { CodeBlockAttrs }

/**
 * @public
 *
 * An alias for the `Parser` type from the `prosemirror-highlight` package.
 */
export type HighlightParser = Parser

export function defineCodeBlockSpec() {
  return defineNodeSpec({
    name: 'codeBlock',
    content: 'text*',
    group: 'block',
    code: true,
    defining: true,
    marks: '',
    attrs: { language: { default: '' } },
    parseDOM: [
      {
        tag: 'pre',
        preserveWhitespace: 'full',
        getAttrs: (node): CodeBlockAttrs => ({
          language: (node as HTMLElement).getAttribute('data-language') || '',
        }),
      },
    ],
    toDOM(node) {
      const attrs = node.attrs as CodeBlockAttrs
      return [
        'pre',
        // TODO: remove class 'hljs'
        { 'data-language': attrs.language, class: 'hljs' },
        ['code', 0],
      ]
    },
  })
}

export function defineCodeBlockInputRule() {
  return defineInputRule(({ schema }) => {
    const nodeType = getNodeType(schema, 'codeBlock')
    const getAttrs = (match: RegExpMatchArray): CodeBlockAttrs => {
      return { language: match[1] || '' }
    }
    return textblockTypeInputRule(/^```(\S*)\s$/, nodeType, getAttrs)
  })
}

export function defineCodeBlockCommands() {
  return defineCommands({
    setCodeBlockLanguage: (language: string) => (state, dispatch) => {
      const pos = state.selection.$from.before()
      const codeBlock = state.doc.nodeAt(pos)
      if (!codeBlock || codeBlock.type.name !== 'codeBlock') {
        return false
      }
      const { tr } = state
      tr.setNodeMarkup(pos, undefined, { language })
      dispatch?.(tr)
      return true
    },
  })
}

/**
 * @public
 */
export function defineCodeBlock(options?: {
  /**
   * @deprecated Use `highlight` instead.
   */
  hljs?: HLJSApi

  /**
   * A parser for the `prosemirror-highlight` package to use for syntax highlighting.
   */
  parser?: HighlightParser
}) {
  const extensions = [
    defineCodeBlockSpec(),
    defineCodeBlockInputRule(),
    defineCodeBlockCommands(),
  ]

  const parser = options?.parser
  if (parser) {
    extensions.push(defineCodeBlockHighlight({ parser }))
  }

  const hljs = options?.hljs
  if (hljs) {
    extensions.push(defineCodeBlockHighlightDeprecated({ hljs }))
  }

  return union(extensions)
}
