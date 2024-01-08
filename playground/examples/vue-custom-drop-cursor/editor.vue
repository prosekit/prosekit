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
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Try to drag and drop the images below to see the custom drop cursor.',
        },
      ],
    },
    {
      type: 'image',
      attrs: {
        src: 'https://placehold.co/120x60/f59e0b/FFF?text=Amber',
      },
    },
    {
      type: 'image',
      attrs: {
        src: 'https://placehold.co/120x60/84cc16/FFF?text=Lime',
      },
    },
    {
      type: 'image',
      attrs: {
        src: 'https://placehold.co/120x60/06b6d4/FFF?text=Cyan',
      },
    },
    {
      type: 'image',
      attrs: {
        src: 'https://placehold.co/120x60/f43f5e/FFF?text=Rose',
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
