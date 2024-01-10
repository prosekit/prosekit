<script setup lang="ts">
import 'prosekit/basic/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import { ref, watchPostEffect } from 'vue'
import { defineExtension } from './extension'
import InlineMenu from './inline-menu.vue'

const defaultHTML = `
  <p><a href="https://www.example.com">www.example.com</a></p>
`

const editor = createEditor({ extension: defineExtension(), defaultHTML })
const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect(() => editor.mount(editorRef.value))
</script>

<template>
  <ProseKit :editor="editor">
    <div class="EDITOR_VIEWPORT">
      <div ref="editorRef" class="EDITOR_CONTENT"></div>
      <InlineMenu />
    </div>
  </ProseKit>
</template>
