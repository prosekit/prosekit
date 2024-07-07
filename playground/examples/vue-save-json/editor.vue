<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import 'prosekit/basic/style.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, jsonFromNode, type NodeJSON } from 'prosekit/core'
import { computed, ref } from 'vue'
import EditorComponent from './editor-component.vue'

const defaultDoc = ref<NodeJSON | undefined>()
const records = ref<string[]>([])
const hasUnsavedChange = ref(false)
const key = ref(1)

// Create a new editor instance whenever `defaultDoc` changes
const editor = computed(() => {
  const extension = defineBasicExtension()
  return createEditor({ extension, defaultDoc: defaultDoc.value })
})

// Enable the save button
const handleDocChange = () => (hasUnsavedChange.value = true)

// Save the current document as a JSON string
const handleSave = () => {
  const record = JSON.stringify(jsonFromNode(editor.value.view.state.doc))
  records.value.push(record)
  hasUnsavedChange.value = false
}

// Load a document from a JSON string
const handleLoad = (record: string) => {
  defaultDoc.value = JSON.parse(record)
  hasUnsavedChange.value = false
  key.value++
}
</script>

<template>
  <div :class="Themes.EDITOR_VIEWPORT">
    <button
      @click="handleSave"
      :disabled="!hasUnsavedChange"
      class="m-1 border border-solid bg-white px-2 py-1 text-sm text-black disabled:cursor-not-allowed disabled:text-gray-500"
    >
      {{ hasUnsavedChange ? 'Save' : 'No changes to save' }}
    </button>
    <ul class="border-b border-t border-solid text-sm">
      <li
        v-for="(record, index) in records"
        :key="index"
        class="m-1 flex gap-2"
      >
        <button
          class="border border-solid bg-white px-2 py-1 text-black"
          @click="handleLoad(record)"
        >
          Load
        </button>
        <span class="flex-1 overflow-x-scroll p-2">
          <pre>{{ record }}</pre>
        </span>
      </li>
    </ul>
    <EditorComponent
      :key="key"
      :editor="editor"
      :onDocChange="handleDocChange"
    />
  </div>
</template>
