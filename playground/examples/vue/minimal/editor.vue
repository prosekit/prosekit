<script setup lang="ts">
import 'prosekit/basic/style.css'

import { Themes } from '@prosekit/themes'
import { createEditor, jsonFromNode, type NodeJSON } from 'prosekit/core'
import { ProseKit, useDocChange } from 'prosekit/vue'
import { ref, watchPostEffect } from 'vue'

import { defineExtension } from './extension'

const props = defineProps<{
  defaultDoc?: NodeJSON
}>()

const emit = defineEmits<{
  docUpdate: [doc: NodeJSON]
}>()

const extension = defineExtension()
const editor = createEditor({ extension, defaultDoc: props.defaultDoc })

useDocChange(
  (doc) => {
    emit('docUpdate', jsonFromNode(doc))
  },
  { editor },
)

const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect((onCleanup) => {
  editor.mount(editorRef.value)
  onCleanup(() => editor.unmount())
})
</script>

<template>
  <ProseKit :editor="editor">
    <div :class="Themes.EDITOR_VIEWPORT">
      <div :class="Themes.EDITOR_SCROLLING">
        <div ref="editorRef" :class="Themes.EDITOR_CONTENT" />
      </div>
    </div>
  </ProseKit>
</template>
