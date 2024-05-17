<script lang="ts">
import 'prosekit/basic/style.css'

import { defineExtension } from './extension'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'
import { onDestroy, onMount } from 'svelte'
import Toolbar from './toolbar.svelte'

const extension = defineExtension()
const editor = createEditor({
  extension,
  defaultHTML:
    '<h1 style="text-align:center;">Center subject</h1>' +
    '<p style="text-align:left;"">First paragraph</p>' +
    '<p style="text-align:center;">Second paragraph</p>' +
    '<p style="text-align:right;">Third paragraph</p>',
})

let place: HTMLDivElement
onMount(() => editor.mount(place))
onDestroy(() => editor.mount(null))
</script>

<ProseKit {editor}>
  <div class="EDITOR_VIEWPORT">
    <Toolbar />
    <div bind:this={place} class="EDITOR_CONTENT"></div>
  </div>
</ProseKit>
