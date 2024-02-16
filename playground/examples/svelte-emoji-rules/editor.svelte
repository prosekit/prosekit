<script lang="ts">
import 'prosekit/basic/style.css'

import { createEditor, jsonFromNode, type NodeJSON } from 'prosekit/core'
import { ProseKit, useDocChange } from 'prosekit/svelte'
import { onDestroy, onMount } from 'svelte'
import { defineRootExtension } from './extension'

export let defaultDoc: NodeJSON | undefined = undefined
export let onDocUpdate: ((doc: NodeJSON) => void) | undefined = undefined

const extension = defineRootExtension()
const editor = createEditor({ extension, defaultDoc })

useDocChange((doc) => onDocUpdate?.(jsonFromNode(doc)), { editor })

let place: HTMLDivElement
onMount(() => editor.mount(place))
onDestroy(() => editor.mount(null))
</script>

<ProseKit {editor}>
  <div class="EDITOR_VIEWPORT">
    <div bind:this={place} class="EDITOR_CONTENT"></div>
  </div>
</ProseKit>
