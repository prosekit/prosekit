import {
  addInputRule,
  addNodeSpec,
  defineExtension,
  getNodeType,
} from '@prosekit/core'
import { textblockTypeInputRule } from '@prosekit/pm/inputrules'
import type { HLJSApi } from 'highlight.js'

import { addCodeBlockHighlight } from './code-block-highlight'
import type { CodeBlockAttrs } from './code-block-types'

export { addCodeBlockHovering } from './code-block-hovering'

export type { CodeBlockAttrs }

export function addCodeBlockSpec() {
  return addNodeSpec({
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

export function addCodeBlockInputRule() {
  return addInputRule(({ schema }) => {
    const nodeType = getNodeType(schema, 'codeBlock')
    const getAttrs = (match: RegExpMatchArray): CodeBlockAttrs => {
      return { language: match[1] || '' }
    }
    const inputRule = textblockTypeInputRule(/^```(\S*)\s$/, nodeType, getAttrs)
    return [inputRule]
  })
}

/** @public */
export function addCodeBlock(options?: { hljs?: HLJSApi }) {
  return defineExtension([
    addCodeBlockSpec(),
    addCodeBlockInputRule(),
    addCodeBlockHighlight({ hljs: options?.hljs }),
  ])
}
