<script lang="ts">
import 'prosekit/basic/style.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, jsonFromNode, type NodeJSON } from 'prosekit/core'
import { ProseKit, useDocChange } from 'prosekit/svelte'

let defaultDoc: NodeJSON | undefined
let hasUnsavedChange = false
let records: string[] = []
let key = 1

const extension = defineBasicExtension()
const editor = createEditor({ extension, defaultDoc })

useDocChange(() => (hasUnsavedChange = true), { editor })

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

const mount = (element: HTMLElement) => {
  editor.mount(element)
  return { destroy: () => editor.unmount() }
}
</script>

<ProseKit {editor}>
  <div
    class="box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700 flex flex-col bg-white dark:bg-neutral-900"
  >
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
    <div class="relative w-full flex-1 box-border overflow-y-scroll">
      <div
        use:mount
        class="ProseMirror box-border min-h-full px-[max(40px,_calc(50%-330px))] py-[24px] outline-none outline-0 [&_span[data-mention='user']]:text-blue-500 [&_span[data-mention='tag']]:text-violet-500 [&_pre]:text-white [&_pre]:bg-zinc-800"
      ></div>
    </div>
  </div>
</ProseKit>
