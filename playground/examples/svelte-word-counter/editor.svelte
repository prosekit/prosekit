<script lang="ts">
import 'prosekit/basic/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'
import { onDestroy, onMount } from 'svelte'
import { defineExtension } from './extension'
import WordCounter from './word-counter.svelte'

const editor = createEditor({
  extension: defineExtension(),
  defaultHTML: 'Start typing and observe the word count update below.',
})

let place: HTMLDivElement
onMount(() => editor.mount(place))
onDestroy(() => editor.unmount())
</script>

<ProseKit {editor}>
  <div class="EDITOR_VIEWPORT">
    <div class="EDITOR_DOCUMENT">
      <div bind:this={place} class="EDITOR_CONTENT"></div>
      <WordCounter />
    </div>
  </div>
</ProseKit>
