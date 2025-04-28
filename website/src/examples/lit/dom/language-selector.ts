import { shikiBundledLanguagesInfo } from 'prosekit/extensions/code-block'

import { createElement } from './create-element'

export function createLanguageSelector({
  language,
  setLanguage,
}: {
  language?: string
  setLanguage: (language: string) => void
}) {
  const select = createElement(
    'select',
    { class: 'CSS_LANGUAGE_SELECT' },
    createElement('option', { value: '' }, 'Plain Text'),
    ...shikiBundledLanguagesInfo.map((info) => {
      return createElement('option', { value: info.id }, info.name)
    }),
  )

  select.value = language || ''
  select.addEventListener('change', (event) => {
    setLanguage((event.target as HTMLSelectElement).value)
  })

  return createElement(
    'div',
    { class: 'CSS_LANGUAGE_WRAPPER', contenteditable: 'false' },
    select,
  )
}
