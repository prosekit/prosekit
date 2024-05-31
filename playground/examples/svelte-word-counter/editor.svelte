<script lang="ts">
import { Themes } from '@prosekit/themes'
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
onDestroy(() => editor.mount(null))
</script>

<ProseKit {editor}>
  <div class={Themes.EDITOR_VIEWPORT}>
    <div class={Themes.EDITOR_SCROLLING}>
      <div bind:this={place} class={Themes.EDITOR_CONTENT}></div>
      <WordCounter />
    </div>
  </div>
</ProseKit>
