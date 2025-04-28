<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'
import { writable } from 'svelte/store'
import { defineExtension } from './extension'
import Toolbar from './toolbar.svelte'

const extension = defineExtension()
const editor = createEditor({ extension })

const mount = (element: HTMLElement) => {
  editor.mount(element)
  return { destroy: () => editor.unmount() }
}

const submitions = writable<string[]>([])

const pushSubmition = (hotkey: string) => {
  const docString = JSON.stringify(editor.getDocJSON())
  const submition = `${new Date().toISOString()}\t${hotkey}\n${docString}`
  submitions.update((submitions) => [...submitions, submition])
}
</script>

<ProseKit {editor}>
  <div class="CSS_EDITOR_VIEWPORT">
    <Toolbar onSubmit={pushSubmition} />
    <div class="CSS_EDITOR_SCROLLING">
      <div use:mount class="CSS_EDITOR_CONTENT"></div>
    </div>
  </div>
  <fieldset class="CSS_KEYMAP_FIELDSET">
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
