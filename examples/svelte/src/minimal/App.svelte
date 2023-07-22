<script lang="ts">
  import { createEditor } from 'prosekit/core'
  import { addExampleExtension } from './extension'
  import { onMount } from 'svelte'
  import { ProseKit } from 'prosekit/svelte/components/prosekit'

  const editor = createEditor({ extension: addExampleExtension() })

  let place: HTMLDivElement

  onMount(() => {
    editor.mount(place)
  })
</script>

<main>
  <ProseKit {editor}>
    <div bind:this={place} class="example-editor"></div>
  </ProseKit>
</main>
