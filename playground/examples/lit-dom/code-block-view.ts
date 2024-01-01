import { defineNodeView } from 'prosekit/core'
import { bundledLanguagesInfo } from 'shikiji'

import { createElement } from './create-element'
import { getId } from './get-id'

const languages: Array<[id: string, name: string]> = bundledLanguagesInfo.map(
  (info) => [info.id, info.name],
)

export function defineCodeBlockView() {
  return defineNodeView({
    name: 'codeBlock',
    constructor: (node, view, getPos) => {
      const type = node.type

      const listId = `code-block-${getId()}`

      const input = createElement('input', {
        class: 'LANGUAGE_BUTTON',
        type: 'text',
        list: listId,
        placeholder: 'Language...',
      })
      input.addEventListener('change', () => {
        const language = input.value

        const pos = getPos()
        if (pos == null) {
          return
        }

        const tr = view.state.tr.setNodeAttribute(pos, 'language', language)
        view.dispatch(tr)
      })

      const code = createElement('code', {})

      const dom = createElement(
        'div',
        {},
        createElement(
          'div',
          { class: 'LANGUAGE_WRAPPER' },
          input,
          createElement(
            'datalist',
            { id: listId },
            ...languages.map(([languageId, languageName]) => {
              return createElement(
                'option',
                { value: languageId },
                languageName,
              )
            }),
          ),
        ),
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
