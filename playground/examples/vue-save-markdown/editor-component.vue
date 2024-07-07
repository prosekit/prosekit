<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import 'prosekit/basic/style.css'
import type { Editor } from 'prosekit/core'

import { ProseKit, useDocChange } from 'prosekit/vue'
import { ref, watchPostEffect } from 'vue'

const props = defineProps<{
  editor: Editor
  onDocChange: () => void
}>()

useDocChange(
  () => {
    props.onDocChange()
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
    <div :class="Themes.EDITOR_SCROLLING">
      <div ref="editorRef" :class="Themes.EDITOR_CONTENT"></div>
    </div>
  </ProseKit>
</template>
