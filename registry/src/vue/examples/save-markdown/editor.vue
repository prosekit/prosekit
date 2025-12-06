<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { defineBasicExtension } from 'prosekit/basic'
import {
  createEditor,
  jsonFromHTML,
} from 'prosekit/core'
import {
  ProseKit,
  useDocChange,
} from 'prosekit/vue'
import { ref } from 'vue'

import {
  htmlFromMarkdown,
  markdownFromHTML,
} from './markdown'

// A list of saved documents, stored as Markdown strings
const records = ref<string[]>([])
// Whether there are unsaved changes
const hasUnsavedChange = ref(false)
// A key to force a re-render of the editor
const key = ref(1)

const extension = defineBasicExtension()
const editor = createEditor({ extension })

function handleDocChange() {
  hasUnsavedChange.value = true
}
useDocChange(handleDocChange, { editor })

function handleSave() {
  const html = editor.getDocHTML()
  const record = markdownFromHTML(html)
  records.value = [...records.value, record]
  hasUnsavedChange.value = false
}

function handleLoad(record: string) {
  const html = htmlFromMarkdown(record)
  editor.setContent(jsonFromHTML(html, { schema: editor.schema }))
  hasUnsavedChange.value = false
  key.value += 1
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
    <ProseKit :key="key" :editor="editor">
      <div class="CSS_EDITOR_SCROLLING">
        <div :ref="(el) => editor.mount(el as HTMLElement | null)" class="CSS_EDITOR_CONTENT"></div>
      </div>
    </ProseKit>
  </div>
</template>
