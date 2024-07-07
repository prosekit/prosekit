<script lang="ts">
import { Themes } from '@prosekit/themes'
import 'prosekit/basic/style.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, jsonFromNode, type NodeJSON } from 'prosekit/core'
import { ProseKit, useDocChange } from 'prosekit/svelte'
import { onDestroy, onMount } from 'svelte'
import Toolbar from './toolbar.svelte'

const extension = defineBasicExtension()
const editor = createEditor({ extension })

let place: HTMLDivElement
onMount(() => editor.mount(place))
onDestroy(() => editor.mount(null))
</script>

<ProseKit {editor}>
  <div class={Themes.EDITOR_VIEWPORT}>
    <div class={Themes.EDITOR_SCROLLING}>
      <Toolbar />
      <div bind:this={place} class={Themes.EDITOR_CONTENT}></div>
    </div>
  </div>
</ProseKit>
