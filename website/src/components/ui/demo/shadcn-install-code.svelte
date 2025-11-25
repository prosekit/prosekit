<script lang="ts">
import type { Snippet } from 'svelte'
import { useFramework } from '../use-framework.svelte'

interface Props {
  'frameworks': string[]
  'slot-lit'?: Snippet
  'slot-preact'?: Snippet
  'slot-react'?: Snippet
  'slot-solid'?: Snippet
  'slot-svelte'?: Snippet
  'slot-vanilla'?: Snippet
  'slot-vue'?: Snippet
}

const props: Props = $props()
const { frameworks } = props
const [getFramework] = useFramework(frameworks)
const framework = $derived(getFramework())
</script>

<div
  class={[
    'not-content',
    'flex flex-col',
  ]}
>
  <div>
    <div class="flex items-center justify-between gap-2 mb-2">
      <span>Install this example with <a href="https://ui.shadcn.com/docs/cli" target="_blank"><code>shadcn</code></a>:
      </span>
    </div>

    <div class="overflow-y-hidden">
      {#if framework === 'lit'}
        {@render props['slot-lit']?.()}
      {/if}
      {#if framework === 'preact'}
        {@render props['slot-preact']?.()}
      {/if}
      {#if framework === 'react'}
        {@render props['slot-react']?.()}
      {/if}
      {#if framework === 'solid'}
        {@render props['slot-solid']?.()}
      {/if}
      {#if framework === 'svelte'}
        {@render props['slot-svelte']?.()}
      {/if}
      {#if framework === 'vanilla'}
        {@render props['slot-vanilla']?.()}
      {/if}
      {#if framework === 'vue'}
        {@render props['slot-vue']?.()}
      {/if}
    </div>
  </div>
</div>
