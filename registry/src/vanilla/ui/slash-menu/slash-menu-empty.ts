import 'prosekit/web/autocomplete'

import type { AutocompleteEmptyElement } from 'prosekit/web/autocomplete'

export function renderSlashMenuEmpty() {
  const empty = document.createElement('prosekit-autocomplete-empty') as AutocompleteEmptyElement
  empty.className = 'CSS_AUTOCOMPLETE_MENU_ITEM'

  const span = document.createElement('span')
  span.textContent = 'No results'
  empty.append(span)

  return empty
}
