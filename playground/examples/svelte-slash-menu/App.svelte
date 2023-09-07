<script lang="ts">
import 'prosekit/basic/internal/example.css'
import 'prosekit/basic/style.css'
import 'prosekit/extensions/placeholder/style.css'

import { createEditor } from 'prosekit/core'
import { addExampleExtension } from './extension'
import { onMount } from 'svelte'
import { ProseKit } from 'prosekit/svelte/components/prosekit'
import ToggleItalicButton from './ToggleItalicButton.svelte'
import SlashMenu from './SlashMenu.svelte'

const editor = createEditor({ extension: addExampleExtension() })

let place: HTMLDivElement
onMount(() => editor.mount(place))
</script>

<ProseKit {editor}>
  <div bind:this={place} class="EDITOR_CONTENT"></div>
  <ToggleItalicButton />
  <SlashMenu />
</ProseKit>
