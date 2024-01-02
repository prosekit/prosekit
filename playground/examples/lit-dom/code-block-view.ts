import { defineNodeView } from 'prosekit/core'

import { createElement } from './create-element'
import { createLanguageSelector } from './language-selector'

export function defineCodeBlockView() {
  return defineNodeView({
    name: 'codeBlock',
    constructor: (node, view, getPos) => {
      const language = node.attrs.language as string

      const setLanguage = (language: string) => {
        const pos = getPos()!
        const tr = view.state.tr.setNodeAttribute(pos, 'language', language)
        view.dispatch(tr)
      }

      const type = node.type

      const code = createElement('code', {})

      const dom = createElement(
        'div',
        {
          'data-node-view-root': 'true',
        },
        createLanguageSelector({ language, setLanguage }),
        createElement('pre', {}, code),
      )

      return {
        dom: dom,
        contentDOM: code,
        update: (node) => {
          if (node.type !== type) {
            return false
          }
          code.textContent = node.textContent
          return true
        },
        ignoreMutation: () => {
          return true
        },
      }
    },
  })
}
