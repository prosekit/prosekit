import { Themes } from '@prosekit/themes'
import { AutocompleteItem } from 'prosekit/react/autocomplete'

export default function SlashMenuItem(props: {
  label: string
  kbd?: string
  onSelect: () => void
}) {
  return (
    <AutocompleteItem onSelect={props.onSelect} className={Themes.AUTOCOMPLETE_MENU_ITEM}>
      <span>{props.label}</span>
      {props.kbd && <kbd className={Themes.AUTOCOMPLETE_MENU_KEYBOARD}>{props.kbd}</kbd>}
    </AutocompleteItem>
  )
}
