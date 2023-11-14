<script lang="ts">
import 'prosekit/core/style.css'
import 'prosekit/extensions/list/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'
import { onMount, onDestroy } from 'svelte'
import { defineExtension } from './extension'
import Toolbar from './Toolbar.svelte'

const editor = createEditor({ extension: defineExtension() })

let place: HTMLDivElement
onMount(() => editor.mount(place))
onDestroy(() => editor.unmount())
</script>

<ProseKit {editor}>
  <Toolbar />
  <div bind:this={place} class="EDITOR_CONTENT"></div>
</ProseKit>
