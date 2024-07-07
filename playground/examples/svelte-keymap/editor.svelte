<script lang="ts">
import { Themes } from '@prosekit/themes'
import 'prosekit/basic/style.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, jsonFromNode } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'
import { onDestroy, onMount } from 'svelte'
import { writable } from 'svelte/store'
import Toolbar from './toolbar.svelte'

const extension = defineBasicExtension()
const editor = createEditor({ extension })

let place: HTMLDivElement
onMount(() => editor.mount(place))
onDestroy(() => editor.mount(null))

const submitions = writable<string[]>([])

const pushSubmition = (hotkey: string) => {
  const doc = editor.view.state.doc
  const docString = JSON.stringify(jsonFromNode(doc))
  const submition = `${new Date().toISOString()}\t${hotkey}\n${docString}`
  submitions.update((submitions) => [...submitions, submition])
}
</script>

<ProseKit {editor}>
  <div class={Themes.EDITOR_VIEWPORT}>
    <Toolbar onSubmit={pushSubmition} />
    <div class={Themes.EDITOR_SCROLLING}>
      <div bind:this={place} class={Themes.EDITOR_CONTENT}></div>
    </div>
  </div>
  <fieldset class={Themes.KEYMAP_FIELDSET}>
    <legend>Submit Records</legend>
    <ol>
      {#each $submitions as submition, index (index)}
        <li>
          <pre>{submition}</pre>
        </li>
      {/each}
      {#if $submitions.length === 0}
        <div>No submitions yet</div>
      {/if}
    </ol>
  </fieldset>
</ProseKit>
