import {
  defineNodeSpec,
  type Extension,
} from '@prosekit/core'

import type { CodeBlockAttrs } from './code-block-types'

/**
 * @internal
 */
export type CodeBlockSpecExtension = Extension<{
  Nodes: {
    codeBlock: CodeBlockAttrs
  }
}>

/**
 * Defines the `codeBlock` node spec.
 *
 * @public
 */
export function defineCodeBlockSpec(): CodeBlockSpecExtension {
  return defineNodeSpec({
    name: 'codeBlock',
    content: 'text*',
    group: 'block',
    code: true,
    defining: true,
    marks: '',
    attrs: { language: { default: '', validate: 'string' } },
    parseDOM: [
      {
        tag: 'pre',
        preserveWhitespace: 'full',
        getAttrs: (node): CodeBlockAttrs => ({
          language: node.getAttribute('data-language') || '',
        }),
      },
    ],
    toDOM(node) {
      const attrs = node.attrs as CodeBlockAttrs
      return ['pre', { 'data-language': attrs.language }, ['code', 0]]
    },
  })
}
