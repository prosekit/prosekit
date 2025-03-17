import { Themes } from '@prosekit/themes'
import { AutocompleteEmpty } from 'prosekit/solid/autocomplete'

export default function SlashMenuEmpty() {
  return (
    <AutocompleteEmpty class={Themes.AUTOCOMPLETE_MENU_ITEM}>
      <span>No results</span>
    </AutocompleteEmpty>
  )
}
