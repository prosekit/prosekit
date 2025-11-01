import { AutocompleteItem } from 'prosekit/solid/autocomplete'
import {
  Show,
  type JSX,
} from 'solid-js'

export default function SlashMenuItem(props: {
  label: string
  kbd?: string
  onSelect: () => void
}): JSX.Element {
  return (
    <AutocompleteItem onSelect={props.onSelect} class="CSS_AUTOCOMPLETE_MENU_ITEM">
      <span>{props.label}</span>
      <Show when={props.kbd}>
        <kbd class="CSS_AUTOCOMPLETE_MENU_KEYBOARD">{props.kbd}</kbd>
      </Show>
    </AutocompleteItem>
  )
}
