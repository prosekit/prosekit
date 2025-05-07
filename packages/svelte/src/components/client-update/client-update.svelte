<script lang="ts">
import { onMount } from 'svelte'

// Forces a re-render when the component mounts. This resolves issues with
// web-components after server-side rendering.
let key = 1

onMount(() => {
  key = 2
})
</script>

{#key key}
  <slot />
{/key}
