import { bundledLanguagesInfo } from 'shikiji'

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
    { class: 'LANGUAGE_SELECT' },
    createElement('option', { value: '' }, 'Plain Text'),
    ...bundledLanguagesInfo.map((info) => {
      return createElement('option', { value: info.id }, info.name)
    }),
  )

  select.value = language || ''
  select.addEventListener('change', (event) => {
    setLanguage((event.target as HTMLSelectElement).value)
  })

  return createElement('div', { class: 'LANGUAGE_WRAPPER' }, select)
}
