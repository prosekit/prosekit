<script lang="ts">
import type { Snippet } from 'svelte'
import { useFramework } from '../use-framework.svelte'
import DropdownMenu from './dropdown-menu.svelte'
import FrameworkSelect from './framework-select.svelte'
import ShowCodeSwitch from './toggle-code-button.svelte'

interface Props {
  'showCode'?: boolean
  'frameworks': string[]
  'demo'?: Snippet
  'story': string

  'slot-story-lit'?: Snippet
  'slot-story-preact'?: Snippet
  'slot-story-react'?: Snippet
  'slot-story-solid'?: Snippet
  'slot-story-svelte'?: Snippet
  'slot-story-vanilla'?: Snippet
  'slot-story-vue'?: Snippet

  'slot-code-lit'?: Snippet
  'slot-code-preact'?: Snippet
  'slot-code-react'?: Snippet
  'slot-code-solid'?: Snippet
  'slot-code-svelte'?: Snippet
  'slot-code-vanilla'?: Snippet
  'slot-code-vue'?: Snippet
}

const props: Props = $props()

const { frameworks, story } = props
const frameworkRef = useFramework(frameworks)
const framework = $derived(frameworkRef.current)

let showCode = $state(props.showCode ?? true)
</script>

<div
  class={[
    'not-content',
    'flex flex-col border border-border rounded-lg my-4 bg-background overflow-hidden divide-y',
  ]}
>
  <div>
    <div class="flex items-center justify-between pt-4 px-4 pb-1 gap-2">
      <FrameworkSelect
        {frameworks}
        {framework}
        onFrameworkChange={f => frameworkRef.current = f}
      />
      <span class="flex-1"></span>
      <ShowCodeSwitch
        {showCode}
        onShowCodeChange={(v) => (showCode = v)}
      />
      <DropdownMenu
        {framework}
        {story}
      />
    </div>

    <div class="min-h-50 h-100 max-h-dvh overflow-y-hidden">
      {#if framework === 'lit'}
        {@render props['slot-story-lit']?.()}
      {/if}
      {#if framework === 'preact'}
        {@render props['slot-story-preact']?.()}
      {/if}
      {#if framework === 'react'}
        {@render props['slot-story-react']?.()}
      {/if}
      {#if framework === 'solid'}
        {@render props['slot-story-solid']?.()}
      {/if}
      {#if framework === 'svelte'}
        {@render props['slot-story-svelte']?.()}
      {/if}
      {#if framework === 'vanilla'}
        {@render props['slot-story-vanilla']?.()}
      {/if}
      {#if framework === 'vue'}
        {@render props['slot-story-vue']?.()}
      {/if}
    </div>
  </div>

  <div class={['border-border', showCode ? 'block' : 'hidden']}>
    <!-- Because of https://github.com/withastro/astro/issues/13445, we need to
    render all slots and use CSS to hide the ones that are not needed -->
    <div class={framework === 'lit' ? 'block' : 'hidden'}>
      {@render props['slot-code-lit']?.()}
    </div>
    <div class={framework === 'preact' ? 'block' : 'hidden'}>
      {@render props['slot-code-preact']?.()}
    </div>
    <div class={framework === 'react' ? 'block' : 'hidden'}>
      {@render props['slot-code-react']?.()}
    </div>
    <div class={framework === 'solid' ? 'block' : 'hidden'}>
      {@render props['slot-code-solid']?.()}
    </div>
    <div class={framework === 'svelte' ? 'block' : 'hidden'}>
      {@render props['slot-code-svelte']?.()}
    </div>
    <div class={framework === 'vanilla' ? 'block' : 'hidden'}>
      {@render props['slot-code-vanilla']?.()}
    </div>
    <div class={framework === 'vue' ? 'block' : 'hidden'}>
      {@render props['slot-code-vue']?.()}
    </div>
  </div>
</div>
