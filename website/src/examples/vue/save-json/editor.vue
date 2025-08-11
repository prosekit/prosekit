<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { defineBasicExtension } from 'prosekit/basic'
import {
  createEditor,
  type NodeJSON,
} from 'prosekit/core'
import {
  computed,
  ref,
} from 'vue'

import EditorComponent from './editor-component.vue'

const defaultContent = ref<NodeJSON | undefined>()
const records = ref<string[]>([])
const hasUnsavedChange = ref(false)
const key = ref(1)

// Create a new editor instance whenever `defaultContent` changes
const editor = computed(() => {
  const extension = defineBasicExtension()
  return createEditor({ extension, defaultContent: defaultContent.value })
})

// Enable the save button
const handleDocChange = () => (hasUnsavedChange.value = true)

// Save the current document as a JSON string
function handleSave() {
  const record = JSON.stringify(editor.value.getDocJSON())
  records.value.push(record)
  hasUnsavedChange.value = false
}

// Load a document from a JSON string
function handleLoad(record: string) {
  defaultContent.value = JSON.parse(record)
  hasUnsavedChange.value = false
  key.value++
}
</script>

<template>
  <div class="CSS_EDITOR_VIEWPORT">
    <button
      :disabled="!hasUnsavedChange"
      class="text-sm text-black m-1 px-2 py-1 border border-solid bg-white disabled:text-gray-500 disabled:cursor-not-allowed"
      @click="handleSave"
    >
      {{ hasUnsavedChange ? 'Save' : 'No changes to save' }}
    </button>
    <ul class="text-sm border-b border-t border-solid">
      <li
        v-for="(record, index) in records"
        :key="index"
        class="m-1 flex gap-2"
      >
        <button
          class="text-black px-2 py-1 border border-solid bg-white"
          @click="handleLoad(record)"
        >
          Load
        </button>
        <span class="p-2 flex-1 overflow-x-scroll">
          <pre>{{ record }}</pre>
        </span>
      </li>
    </ul>
    <EditorComponent
      :key="key"
      :editor="editor"
      @doc-change="handleDocChange"
    />
  </div>
</template>
