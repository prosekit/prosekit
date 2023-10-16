<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/extensions/placeholder/style.css'

import { onMount } from 'svelte'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte/components/prosekit'
import { defineBasicExtension } from 'prosekit/basic'

const extension = defineBasicExtension()
const editor = createEditor({ extension })

let place: HTMLDivElement
onMount(() => editor.mount(place))
</script>

<ProseKit {editor}>
  <div bind:this={place} class="EDITOR_CONTENT"></div>
</ProseKit>
