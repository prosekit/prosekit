import {
  defineCommands,
  defineInputRule,
  defineNodeSpec,
  union,
  getNodeType,
} from '@prosekit/core'
import { textblockTypeInputRule } from '@prosekit/pm/inputrules'
import type { HLJSApi } from 'highlight.js'

import { defineCodeBlockHighlight } from './code-block-highlight'
import type { CodeBlockAttrs } from './code-block-types'

export type { CodeBlockAttrs }

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
    const inputRule = textblockTypeInputRule(/^```(\S*)\s$/, nodeType, getAttrs)
    return [inputRule]
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

/** @public */
export function defineCodeBlock(options?: { hljs?: HLJSApi }) {
  return union([
    defineCodeBlockSpec(),
    defineCodeBlockInputRule(),
    defineCodeBlockHighlight({ hljs: options?.hljs }),
    defineCodeBlockCommands(),
  ])
}
