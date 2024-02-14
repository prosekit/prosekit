<script setup lang="ts">
import 'prosekit/basic/style.css'

import { defineBasicExtension } from 'prosekit/basic'
import {
  createEditor,
  htmlFromNode,
  jsonFromHTML,
  type NodeJSON,
} from 'prosekit/core'
import { ProseKit, useDocChange } from 'prosekit/vue'
import { computed, ref, watchPostEffect } from 'vue'

const key = ref(1)
const defaultDoc = ref<NodeJSON | undefined>()
const records = ref<string[]>([])
const hasUnsavedChange = ref(false)

const editor = computed(() => {
  const extension = defineBasicExtension()
  return createEditor({ extension, defaultDoc: defaultDoc.value })
})
const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect(() => editor.value.mount(editorRef.value))

const handleDocChange = () => (hasUnsavedChange.value = true)
useDocChange(handleDocChange, { editor })

// Save the current document as a HTML string
const handleSave = () => {
  const doc = htmlFromNode(editor.value.view.state.doc)
  records.value.push(doc)
  hasUnsavedChange.value = false
}

// Load a document from a HTML string
const handleLoad = (record: string) => {
  defaultDoc.value = jsonFromHTML(record, editor.value.schema)
  key.value += 1
  hasUnsavedChange.value = false
}
</script>

<template>
  <ProseKit :editor="editor">
    <div>
      <button
        @click="handleSave"
        :disabled="!hasUnsavedChange"
        class="my-2 border border-solid bg-white p-2 text-black disabled:cursor-not-allowed disabled:text-gray-500'"
      >
        {{ hasUnsavedChange ? 'Save' : 'No Changes' }}
      </button>
      <ul>
        <li
          v-for="(record, index) in records"
          :key="index"
          class="my-2 flex gap-2"
        >
          <button
            class="border border-solid bg-white p-2 text-black"
            :class="{ 'disabled:text-gray-500': !hasUnsavedChange }"
            @click="handleLoad(record)"
          >
            Load
          </button>
          <span class="flex-1 overflow-x-scroll p-2">
            <pre>{{ record }}</pre>
          </span>
        </li>
      </ul>
    </div>

    <div class="EDITOR_VIEWPORT">
      <div ref="editorRef" class="EDITOR_CONTENT"></div>
    </div>
  </ProseKit>
</template>
