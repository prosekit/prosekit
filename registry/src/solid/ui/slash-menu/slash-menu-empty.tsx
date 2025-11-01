import { AutocompleteEmpty } from 'prosekit/solid/autocomplete'
import type { JSX } from 'solid-js'

export default function SlashMenuEmpty(): JSX.Element {
  return (
    <AutocompleteEmpty class="CSS_AUTOCOMPLETE_MENU_ITEM">
      <span>No results</span>
    </AutocompleteEmpty>
  )
}
