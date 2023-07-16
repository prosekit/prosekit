<script setup lang="ts">
import { ref, watchPostEffect } from 'vue'
import { ProseKit } from 'prosekit/vue'
import { addExampleExtension } from './extension'
import { createEditor } from 'prosekit/core'

const editor = createEditor({ extension: addExampleExtension() })
const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect(() => editor.mount(editorRef.value))
</script>

<template>
  <ProseKit :editor="editor">
    <div ref="editorRef" class="example-editor"></div>
  </ProseKit>
</template>
