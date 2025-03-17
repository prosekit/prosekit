import { Themes } from '@prosekit/themes'
import { AutocompleteItem } from 'prosekit/solid/autocomplete'

export default function SlashMenuItem(props: {
  label: string
  kbd?: string
  onSelect: () => void
}) {
  return (
    <AutocompleteItem onSelect={props.onSelect} class={Themes.AUTOCOMPLETE_MENU_ITEM}>
      <span>{props.label}</span>
      {props.kbd && <kbd class={Themes.AUTOCOMPLETE_MENU_KEYBOARD}>{props.kbd}</kbd>}
    </AutocompleteItem>
  )
}
