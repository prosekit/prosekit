<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/extensions/placeholder/style.css'

import { createEditor } from 'prosekit/core'
import { defineExtension } from './extension'
import { onMount } from 'svelte'
import { ProseKit } from 'prosekit/svelte'
import SlashMenu from './SlashMenu.svelte'

const editor = createEditor({ extension: defineExtension() })

let place: HTMLDivElement
onMount(() => editor.mount(place))
</script>

<ProseKit {editor}>
  <div bind:this={place} class="EDITOR_CONTENT"></div>
  <SlashMenu />
</ProseKit>
