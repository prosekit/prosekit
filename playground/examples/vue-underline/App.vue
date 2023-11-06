<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/extensions/placeholder/style.css'

import { watchPostEffect, ref } from 'vue'
import { ProseKit } from 'prosekit/vue'
import { defineExtension } from './extension'
import Toolbar from './Toolbar.vue'
import { createEditor } from 'prosekit/core'

const defaultHTML = `
  <p><u>Underline</u></p>
  <p><span style="text-decoration-line: underline;">Underline</span></p>
  <p><span>Normal text</span></p>
`

const editor = createEditor({ extension: defineExtension(), defaultHTML })
const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect(() => editor.mount(editorRef.value))
</script>

<template>
  <ProseKit :editor="editor">
    <Toolbar />
    <div ref="editorRef" class="EDITOR_CONTENT"></div>
  </ProseKit>
</template>
