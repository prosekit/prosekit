<script lang="ts">
import { onMount } from 'svelte'

let mounted = false

onMount(() => (mounted = true))
</script>

{#if mounted}
  <slot />
{/if}
