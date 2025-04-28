<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import type { Editor } from 'prosekit/core'
import {
  ProseKit,
  useDocChange,
} from 'prosekit/vue'
import {
  ref,
  watchPostEffect,
} from 'vue'

const props = defineProps<{
  editor: Editor
}>()

const emit = defineEmits<{
  docChange: []
}>()

useDocChange(
  () => {
    emit('docChange')
  },
  { editor: props.editor },
)

const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect((onCleanup) => {
  const editor = props.editor
  editor.mount(editorRef.value)
  onCleanup(() => editor.unmount())
})
</script>

<template>
  <ProseKit :editor="editor">
    <div class="CSS_EDITOR_SCROLLING">
      <div ref="editorRef" class="CSS_EDITOR_CONTENT" />
    </div>
  </ProseKit>
</template>
