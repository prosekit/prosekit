<script setup lang="ts">
import 'prosekit/basic/style.css'

import { defineBasicExtension } from 'prosekit/basic'
import {
  createEditor,
  defineDocChangeHandler,
  jsonFromNode,
} from 'prosekit/core'
import { ProseKit, useExtension } from 'prosekit/vue'
import { computed, ref, watchPostEffect } from 'vue'

const key = ref(1)
const defaultDoc = ref<string | undefined>()
const records = ref<string[]>([])
const hasUnsavedChange = ref(false)

const editor = computed(() => {
  const extension = defineBasicExtension()
  return createEditor({
    extension,
    defaultDoc: defaultDoc.value && JSON.parse(defaultDoc.value),
  })
})
const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect(() => editor.mount(editorRef.value))

const onDocChange = () => {
  hasUnsavedChange.value = true
}
const docChangeExtension = defineDocChangeHandler(onDocChange)
useExtension(docChangeExtension, { editor })

const onSave = () => {
  const doc = JSON.stringify(jsonFromNode(editor.value.view.state.doc))
  records.value.push(doc)
  hasUnsavedChange.value = false
}

const onLoad = (record: string) => {
  defaultDoc.value = record
  key.value += 1
  hasUnsavedChange.value = false
}
</script>

<template>
  <ProseKit :editor="editor">
    <div>
      <button
        @click="onSave"
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
            @click="onLoad(record)"
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
