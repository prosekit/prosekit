<script lang="ts">
import 'prosekit/basic/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'
import { onDestroy, onMount } from 'svelte'
import { defineExtension } from './extension'
import Toolbar from './toolbar.svelte'

const editor = createEditor({ extension: defineExtension() })

let place: HTMLDivElement
onMount(() => editor.mount(place))
onDestroy(() => editor.mount(null))
</script>

<ProseKit {editor}>
  <div class="EDITOR_VIEWPORT">
    <div class="EDITOR_DOCUMENT">
      <Toolbar />
      <div bind:this={place} class="EDITOR_CONTENT"></div>
    </div>
  </div>
</ProseKit>
