<script lang="ts">
import { AutocompleteItem } from 'prosekit/svelte/autocomplete'

interface Props {
  label: string
  kbd?: string
  onSelect: () => void
}

const props: Props = $props()
</script>

<AutocompleteItem class="CSS_AUTOCOMPLETE_MENU_ITEM" onSelect={props.onSelect}>
  <span>{props.label}</span>
  {#if props.kbd}
    <kbd class="CSS_AUTOCOMPLETE_MENU_KEYBOARD">{props.kbd}</kbd>
  {/if}
</AutocompleteItem>
