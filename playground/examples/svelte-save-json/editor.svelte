<script lang="ts">
import 'prosekit/basic/style.css'

import EditorComponent from './editor-component.svelte'

import { Themes } from '@prosekit/themes'
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, jsonFromNode, type NodeJSON } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'

let defaultDoc: NodeJSON | undefined
let hasUnsavedChange = false
let records: string[] = []
let key = 1

// Create a new editor instance whenever `defaultDoc` changes
$: editor = createEditor({ extension: defineBasicExtension(), defaultDoc })

// Enable the save button
function handleDocChange() {
  hasUnsavedChange = true
}

// Save the current document as a JSON string
function handleSave() {
  const record = JSON.stringify(jsonFromNode(editor.view.state.doc))
  records = [...records, record]
  hasUnsavedChange = false
}

// Load a document from a JSON string
function handleLoad(record: string) {
  defaultDoc = JSON.parse(record)
  key += 1
  hasUnsavedChange = false
}
</script>

<ProseKit {editor}>
  <div class={Themes.EDITOR_VIEWPORT}>
    <button
      on:click={handleSave}
      disabled={!hasUnsavedChange}
      class="m-1 border border-solid bg-white px-2 py-1 text-sm text-black disabled:cursor-not-allowed disabled:text-gray-500"
    >
      {hasUnsavedChange ? 'Save' : 'No changes to save'}
    </button>
    <ul class="border-b border-t border-solid text-sm">
      {#each records as record}
        <li class="m-1 flex gap-2">
          <button
            class="border border-solid bg-white px-2 py-1 text-black"
            on:click={() => handleLoad(record)}
          >
            Load
          </button>
          <span class="flex-1 overflow-x-scroll p-2">
            <pre>{record}</pre>
          </span>
        </li>
      {/each}
    </ul>
    {#key key}
      <EditorComponent {editor} onDocChange={handleDocChange} />
    {/key}
  </div>
</ProseKit>
