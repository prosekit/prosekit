<script lang="ts">
import { definePlaceholder } from 'prosekit/extensions/placeholder'
import { useExtension } from 'prosekit/svelte'
import { derived, writable } from 'svelte/store'

const props = $props<{
  placeholder: string
}>()

// Create a store from the reactive placeholder value
const placeholderStore = writable<string>(props.placeholder)

// Update store when placeholder changes
$effect(() => {
  placeholderStore.set(props.placeholder)
})

// Create extension derived from the placeholder store
const extension = derived(placeholderStore, ($placeholder) => {
  return definePlaceholder({ placeholder: $placeholder })
})

useExtension(extension)
</script>
