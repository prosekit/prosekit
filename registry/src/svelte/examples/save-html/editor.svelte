<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, jsonFromHTML } from 'prosekit/core'
import { ProseKit, useDocChange } from 'prosekit/svelte'

// A list of saved documents, stored as HTML strings
let records = $state<string[]>([])
// Whether there are unsaved changes
let hasUnsavedChange = $state(false)
// A key to force a re-render of the editor
let key = $state(1)

const extension = defineBasicExtension()
const editor = createEditor({ extension })

function handleDocChange() {
  hasUnsavedChange = true
}
useDocChange(handleDocChange, { editor })

function handleSave() {
  const record = editor.getDocHTML()
  records = [...records, record]
  hasUnsavedChange = false
}

function handleLoad(record: string) {
  editor.setContent(jsonFromHTML(record, { schema: editor.schema }))
  hasUnsavedChange = false
  key += 1
}
</script>

<div class="CSS_EDITOR_VIEWPORT">
  <button
    disabled={!hasUnsavedChange}
    class="m-1 border border-solid bg-white px-2 py-1 text-sm text-black disabled:cursor-not-allowed disabled:text-gray-500"
    onclick={handleSave}
  >
    {hasUnsavedChange ? 'Save' : 'No changes to save'}
  </button>
  <ul class="border-b border-t border-solid text-sm">
    {#each records as record, index (index)}
      <li class="m-1 flex gap-2">
        <button
          class="border border-solid bg-white px-2 py-1 text-black"
          onclick={() => handleLoad(record)}
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
    <ProseKit {editor}>
      <div class="CSS_EDITOR_SCROLLING">
        <div {@attach editor.mount} class="CSS_EDITOR_CONTENT"></div>
      </div>
    </ProseKit>
  {/key}
</div>
