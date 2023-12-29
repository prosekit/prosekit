import { defineNodeSpec } from '@prosekit/core'

import type { CodeBlockAttrs } from './code-block-types'

/**
 * Defines the `codeBlock` node spec.
 *
 * @public
 */
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
      return ['pre', { 'data-language': attrs.language }, ['code', 0]]
    },
  })
}
