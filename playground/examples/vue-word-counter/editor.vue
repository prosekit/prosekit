<script setup lang="ts">
import 'prosekit/basic/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import { ref, watchPostEffect } from 'vue'
import WordCounter from './word-counter.vue'
import { defineExtension } from './extension'

const editor = createEditor({
  extension: defineExtension(),
  defaultHTML: 'Start typing and observe the word count update below.',
})
const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect(() => editor.mount(editorRef.value))
</script>

<template>
  <ProseKit :editor="editor">
    <div class="EDITOR_VIEWPORT">
      <div class="EDITOR_DOCUMENT">
        <div ref="editorRef" class="EDITOR_CONTENT"></div>
        <WordCounter />
      </div>
    </div>
  </ProseKit>
</template>
