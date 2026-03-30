import { defineNodeSpec, type Extension } from '@prosekit/core'

import type { CodeBlockAttrs } from './code-block-types.ts'

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
        getAttrs: (node): CodeBlockAttrs => {
          const language = extractLanguageFromElement(node)
            || extractLanguageFromElement(node.querySelector('code'))
          return { language }
        },
      },
    ],
    toDOM(node) {
      const { language } = node.attrs as CodeBlockAttrs
      return [
        'pre',
        { 'data-language': language || undefined },
        // `class: language-${language}` is used by remark-rehype to highlight the code block
        ['code', { class: language ? `language-${language}` : undefined }, 0],
      ]
    },
  })
}

function extractLanguageFromElement(element: HTMLElement | null | undefined): string {
  if (!element) {
    return ''
  }

  const attr = element.getAttribute('data-language')
  if (attr) {
    return attr
  }

  const className = element.className
  const match = className.match(/language-(\w+)/)
  if (match) {
    return match[1]
  }

  return ''
}
