<script lang="ts">
import 'prosekit/basic/style.css'

import { onMount } from 'svelte'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte/components/prosekit'
import { addBasicExtension } from 'prosekit/basic'

const extension = addBasicExtension()
const editor = createEditor({ extension })

let place: HTMLDivElement
onMount(() => editor.mount(place))
</script>

<main>
  <ProseKit {editor}>
    <div bind:this={place} class="example-editor"></div>
  </ProseKit>
</main>
