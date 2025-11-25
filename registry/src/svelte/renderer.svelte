<script lang="ts">
import { onMount } from 'svelte'

import { loaders } from './loaders.gen'

const props: {
  story: string
  props?: Record<string, unknown>
} = $props()

let loader = loaders[props.story as keyof typeof loaders]
let mounted = $state(false)

onMount(() => {
  mounted = true
})
</script>

{#if mounted}
  {#await loader() then { default: LazyComponent }}
    <LazyComponent {...(props.props as Record<string, never>)} />
  {/await}
{:else}
  <div></div>
{/if}
