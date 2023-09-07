<script lang="ts">
import 'prosekit/basic/internal/preflight.css'
import 'prosekit/basic/style.css'
import 'prosekit/extensions/placeholder/style.css'

import { onMount } from 'svelte'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte/components/prosekit'
import { addBasicExtension } from 'prosekit/basic'

const extension = addBasicExtension()
const editor = createEditor({ extension })

let place: HTMLDivElement
onMount(() => editor.mount(place))
</script>

<ProseKit {editor}>
  <div bind:this={place} class="EDITOR_CONTENT"></div>
</ProseKit>
