<script lang="ts">
import { onMount } from 'svelte'

// 
let key = 1

onMount(() => {
  key = 2
})
</script>

{#key key}
  <slot />
{/key}
