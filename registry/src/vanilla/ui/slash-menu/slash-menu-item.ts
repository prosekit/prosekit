import 'prosekit/web/autocomplete'

import type { AutocompleteItemElement } from 'prosekit/web/autocomplete'

export function renderSlashMenuItem(options: {
  label: string
  kbd?: string
  onSelect: () => void
}) {
  const item = document.createElement('prosekit-autocomplete-item') as AutocompleteItemElement
  item.className = 'CSS_AUTOCOMPLETE_MENU_ITEM'
  item.addEventListener('select', () => options.onSelect())

  const span = document.createElement('span')
  span.textContent = options.label
  item.append(span)

  if (options.kbd) {
    const kbd = document.createElement('kbd')
    kbd.className = 'CSS_AUTOCOMPLETE_MENU_KEYBOARD'
    kbd.textContent = options.kbd
    item.append(kbd)
  }

  return item
}
