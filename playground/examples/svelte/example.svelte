<script lang="ts">
import { onMount } from 'svelte'
import { loaders } from './loaders.gen'

export let story: string = ''

let loader: (typeof loaders)[keyof typeof loaders] | undefined

onMount(() => {
  loader = loaders[story as keyof typeof loaders]
})
</script>

{#if loader}
  {#await loader() then { default: LazyComponent }}
    <LazyComponent />
  {/await}
{:else}
  <div></div>
{/if}
