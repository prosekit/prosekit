import { Themes } from '@prosekit/themes'
import { AutocompleteEmpty } from 'prosekit/preact/autocomplete'

export default function SlashMenuEmpty() {
  return (
    <AutocompleteEmpty className={Themes.AUTOCOMPLETE_MENU_ITEM}>
      <span>No results</span>
    </AutocompleteEmpty>
  )
}
