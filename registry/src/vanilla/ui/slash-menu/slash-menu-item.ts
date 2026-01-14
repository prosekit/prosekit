import 'prosekit/web/autocomplete'

import type {
  AutocompleteItemElement,
  AutocompleteItemEvents,
} from 'prosekit/web/autocomplete'

export function renderSlashMenuItem(options: {
  label: string
  kbd?: string
  onSelect: (event: AutocompleteItemEvents['select']) => void
}) {
  const item = document.createElement('prosekit-autocomplete-item') as AutocompleteItemElement
  item.className = 'CSS_AUTOCOMPLETE_MENU_ITEM'
  item.addEventListener('select', (event) => options.onSelect(event as AutocompleteItemEvents['select']))

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
