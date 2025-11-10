<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import type { NodeJSON } from 'prosekit/core'
import { ref } from 'vue'

import EditorComponent from './editor-component.vue'

const defaultContent = ref<NodeJSON | undefined>()
const records = ref<string[]>([])
const hasUnsavedChange = ref(false)
const key = ref(1)

let editor: any = null

function handleGetEditor(editorInstance: any) {
  editor = editorInstance
}

function handleDocChange() {
  hasUnsavedChange.value = true
}

function handleSave() {
  const record = JSON.stringify(editor.getDocJSON())
  records.value = [...records.value, record]
  hasUnsavedChange.value = false
}

function handleLoad(record: string) {
  defaultContent.value = JSON.parse(record) as NodeJSON
  hasUnsavedChange.value = false
  key.value = key.value + 1
}
</script>

<template>
  <div class="CSS_EDITOR_VIEWPORT">
    <button
      :disabled="!hasUnsavedChange"
      class="m-1 border border-solid bg-white px-2 py-1 text-sm text-black disabled:cursor-not-allowed disabled:text-gray-500"
      @click="handleSave"
    >
      {{ hasUnsavedChange ? 'Save' : 'No changes to save' }}
    </button>
    <ul class="border-b border-t border-solid text-sm">
      <li v-for="(record, index) in records" :key="index" class="m-1 flex gap-2">
        <button
          class="border border-solid bg-white px-2 py-1 text-black"
          @click="() => handleLoad(record)"
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
      :default-content="defaultContent"
      :on-doc-change="handleDocChange"
      :on-get-editor="handleGetEditor"
    />
  </div>
</template>
