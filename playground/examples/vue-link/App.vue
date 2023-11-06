<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/extensions/placeholder/style.css'

import { watchPostEffect, ref } from 'vue'
import { ProseKit } from 'prosekit/vue'
import { defineExtension } from './extension'
import { createEditor } from 'prosekit/core'

const defaultHTML = `
  <p><a href="https://www.example.com">www.example.com</a></p>
`

const editor = createEditor({ extension: defineExtension(), defaultHTML })
const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect(() => editor.mount(editorRef.value))
</script>

<template>
  <ProseKit :editor="editor">
    <div ref="editorRef" class="EDITOR_CONTENT"></div>
  </ProseKit>
</template>
