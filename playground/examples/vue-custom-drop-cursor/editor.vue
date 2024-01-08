<script setup lang="ts">
import 'prosekit/basic/style.css'

import { createEditor, type NodeJSON } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import { ref, watchPostEffect } from 'vue'
import { defineExtension } from './extension'

const defaultDoc: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'image',
      attrs: {
        src: 'https://placehold.co/150x150/8bd450/ffffff/png',
        width: 150,
        height: 150,
      },
    },
    {
      type: 'image',
      attrs: {
        src: 'https://placehold.co/200x80/965fd4/ffffff/png',
        width: 200,
        height: 80,
      },
    },
  ],
}

const editor = createEditor({ extension: defineExtension(), defaultDoc })
const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect(() => editor.mount(editorRef.value))
</script>

<template>
  <ProseKit :editor="editor">
    <div class="EDITOR_VIEWPORT">
      <div class="EDITOR_DOCUMENT">
        <div ref="editorRef" class="EDITOR_CONTENT"></div>
      </div>
    </div>
  </ProseKit>
</template>
