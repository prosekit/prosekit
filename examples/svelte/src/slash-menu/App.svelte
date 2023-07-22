<script lang="ts">
  import { createEditor } from 'prosekit/core'
  import { addExampleExtension } from './extension'
  import { onMount } from 'svelte'
  import { ProseKit } from 'prosekit/svelte/components/prosekit'
  import ToggleItalicButton from './ToggleItalicButton.svelte'
  import SlashMenu from './SlashMenu.svelte'

  const editor = createEditor({ extension: addExampleExtension() })

  let place: HTMLDivElement

  onMount(() => {
    editor.mount(place)
  })
</script>

<ProseKit {editor}>
  <div bind:this={place} class="example-editor"></div>
  <ToggleItalicButton />
  <SlashMenu />
</ProseKit>
