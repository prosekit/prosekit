<script setup lang="ts">
import { Themes } from '@prosekit/themes'
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
watchPostEffect((onCleanup) => {
  editor.mount(editorRef.value)
  onCleanup(() => editor.unmount())
})
</script>

<template>
  <ProseKit :editor="editor">
    <div :class="Themes.EDITOR_VIEWPORT">
      <div :class="Themes.EDITOR_SCROLLING">
        <div ref="editorRef" :class="Themes.EDITOR_CONTENT"></div>
        <WordCounter />
      </div>
    </div>
  </ProseKit>
</template>
