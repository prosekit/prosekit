import { Themes } from '@prosekit/themes'
import { AutocompleteItem } from 'prosekit/preact/autocomplete'

export default function SlashMenuItem(props: { onSelect: () => void; label: string; kbd?: string }) {
  return (
    <AutocompleteItem onSelect={props.onSelect} className={Themes.AUTOCOMPLETE_MENU_ITEM}>
      <span>{props.label}</span>
      {props.kbd && <kbd className={Themes.AUTOCOMPLETE_MENU_KEYBOARD}>{props.kbd}</kbd>}
    </AutocompleteItem>
  )
}
