<script lang="ts">
import { definePlaceholder } from 'prosekit/extensions/placeholder'
import { useExtension } from 'prosekit/svelte'
import { toStore } from 'svelte/store'

const props: {
  placeholder: string
} = $props()

const extension = $derived(definePlaceholder({ placeholder: props.placeholder }))

useExtension(toStore(() => extension))
</script>
