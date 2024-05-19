<script lang="ts">
import { Themes } from '@prosekit/themes'
import 'prosekit/basic/style.css'

import { createEditor } from 'prosekit/core'
import { defineExtension } from './extension'
import { onMount, onDestroy } from 'svelte'
import { ProseKit } from 'prosekit/svelte'
import SlashMenu from './slash-menu.svelte'

const editor = createEditor({ extension: defineExtension() })

let place: HTMLDivElement
onMount(() => editor.mount(place))
onDestroy(() => editor.mount(null))
</script>

<ProseKit {editor}>
  <div class={Themes.EDITOR_VIEWPORT}>
    <div class={Themes.EDITOR_DOCUMENT}>
      <div bind:this={place} class={Themes.EDITOR_CONTENT}></div>
      <SlashMenu />
    </div>
  </div>
</ProseKit>
