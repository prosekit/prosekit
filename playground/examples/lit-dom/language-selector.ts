import { Themes } from '@prosekit/themes'
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
    { class: Themes.LANGUAGE_SELECT },
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
    { class: Themes.LANGUAGE_WRAPPER, contenteditable: 'false' },
    select,
  )
}
