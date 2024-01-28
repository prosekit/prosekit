<script lang="ts">
import 'prosekit/basic/style.css'

import { onMount, onDestroy } from 'svelte'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'
import { defineBasicExtension } from 'prosekit/basic'

const extension = defineBasicExtension()
const editor = createEditor({ extension })

let place: HTMLDivElement
onMount(() => editor.mount(place))
onDestroy(() => editor.mount(null))
</script>

<ProseKit {editor}>
  <div class="EDITOR_VIEWPORT">
    <div bind:this={place} class="EDITOR_CONTENT"></div>
  </div>
</ProseKit>
