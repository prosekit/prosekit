<script lang="ts">
import { AutocompleteItem } from 'prosekit/svelte/autocomplete'

export let onSelect: () => void
export let label: string
export let kbd: string | undefined = undefined
</script>

<AutocompleteItem {onSelect} class="CSS_AUTOCOMPLETE_MENU_ITEM">
  <span>{label}</span>
  {#if kbd}
    <kbd class="CSS_AUTOCOMPLETE_MENU_KEYBOARD">{kbd}</kbd>
  {/if}
</AutocompleteItem>
